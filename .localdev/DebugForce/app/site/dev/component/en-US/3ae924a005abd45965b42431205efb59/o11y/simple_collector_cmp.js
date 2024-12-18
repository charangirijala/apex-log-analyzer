(function() { LWR.define('o11y/core_envelope', ['exports', 'o11y/shared'], (function (exports, shared) {

    const version = '252.11.0';
    const coreEnvelopeKey = 'o11y';
    class CoreEnvelopeBuilder {
      constructor() {
        this._envelope = {
          diagnostics: {
            key: coreEnvelopeKey,
            generatedTimestamp: undefined,
            bundleCount: 0,
            bucketHistogramCount: 0,
            upCounterCount: 0,
            valueRecorderCount: 0,
            schemaVersion: version
          },
          bundles: [],
          metrics: {
            bucketHistograms: [],
            upCounters: [],
            valueRecorders: []
          },
          staticAttributes: {}
        };
      }
      withStaticAttributes(staticAttributes) {
        this._envelope.staticAttributes = staticAttributes;
        return this;
      }
      withLogs(schemaName, logs) {
        let msgBundle = this._envelope.bundles.find(bundle => bundle.schemaName === schemaName);
        if (msgBundle) {
          for (const log of logs) {
            msgBundle.messages.push(log);
          }
        } else {
          msgBundle = {
            schemaName: schemaName,
            messages: logs
          };
          this._envelope.bundles.push(msgBundle);
        }
        this._envelope.diagnostics.bundleCount = this._envelope.bundles.length;
        return this;
      }
      static getUpCounters(metrics, reset = true) {
        return shared.metricsUtility.getUpCounters(metrics, reset);
      }
      static getValueRecorders(metrics, reset = true) {
        return shared.metricsUtility.getValueRecorders(metrics, reset);
      }
      static getBucketHistograms(metrics, reset = true) {
        return shared.metricsUtility.getBucketHistograms(metrics, reset);
      }
      withUpCounters(upCounters) {
        for (const upCounter of upCounters) {
          this._envelope.metrics.upCounters.push(upCounter);
        }
        this._envelope.diagnostics.upCounterCount = this._envelope.metrics.upCounters.length;
        return this;
      }
      withValueRecorders(valueRecorders) {
        for (const valueRecorder of valueRecorders) {
          this._envelope.metrics.valueRecorders.push(valueRecorder);
        }
        this._envelope.diagnostics.valueRecorderCount = this._envelope.metrics.valueRecorders.length;
        return this;
      }
      withBucketHistograms(bucketHistograms) {
        for (const bucketHistogram of bucketHistograms) {
          this._envelope.metrics.bucketHistograms.push(bucketHistogram);
        }
        this._envelope.diagnostics.bucketHistogramCount = this._envelope.metrics.bucketHistograms.length;
        return this;
      }
      build() {
        this._envelope.diagnostics.generatedTimestamp = shared.utility.time().tsNow;
        return this._envelope;
      }
      static buildFrom(contents) {
        const builder = new CoreEnvelopeBuilder();
        if (contents.staticAttributes) {
          builder.withStaticAttributes(contents.staticAttributes);
        }
        if (contents.messages) {
          contents.messages.forEach((logs, schema) => {
            builder.withLogs(shared.schemaUtil.getSchemaId(schema), logs);
          });
        }
        if (contents.upCounters) {
          builder.withUpCounters(contents.upCounters);
        }
        if (contents.valueRecorders) {
          builder.withValueRecorders(contents.valueRecorders);
        }
        if (contents.bucketHistograms) {
          builder.withBucketHistograms(contents.bucketHistograms);
        }
        return builder.build();
      }
    }

    exports.CoreEnvelopeBuilder = CoreEnvelopeBuilder;
    exports.coreEnvelopeKey = coreEnvelopeKey;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('o11y/simple_collector', ['exports', 'o11y/core_envelope', 'o11y/shared'], (function (exports, core_envelope, shared) {

    const defaultMaxUniqueSchemas = 10000;
    class SimpleCollector {
      constructor(options) {
        this._messageSize = 0;
        this._isCollecting = false;
        let maxUniqueSchemas = defaultMaxUniqueSchemas;
        if (options) {
          const env = options.environment;
          if (env) {
            this._staticAttributes = {
              appName: env.appName,
              appVersion: env.appVersion,
              appExperience: env.appExperience,
              deviceId: env.deviceId,
              deviceModel: env.deviceModel,
              sdkVersion: env.sdkVersion
            };
          }
          if (shared.utility.requireArgumentIfDefined(options.precollectCallback, 'options.precollectCallback', 'function')) {
            this._precollectCallback = options.precollectCallback;
          }
          const mus = options.maxUniqueSchemas;
          if (mus !== undefined) {
            if (typeof mus !== 'number' || !(mus > 0)) {
              throw new Error('options.maxUniqueSchemas, if defined, must be > 0');
            }
            maxUniqueSchemas = mus;
          }
        }
        this._messageBuffers = new shared.LazyMapToList(maxUniqueSchemas);
      }
      collect(schema, data, logMeta) {
        var _a;
        if (this._isCollecting) {
          return;
        }
        this._isCollecting = true;
        try {
          const msg = {
            timestamp: logMeta.timestamp,
            data,
            age: logMeta.age,
            rootId: logMeta.rootId,
            seq: logMeta.sequence,
            sseq: logMeta.schemaSequence,
            loggerName: logMeta.loggerName,
            pagePayload: logMeta.pagePayload,
            loggerAppName: logMeta.loggerAppName,
            connectionType: logMeta.connectionType,
            appPayload: logMeta.appPayload,
            csId: logMeta.clientSessionId,
            recCsId: logMeta.receiverClientSessionId,
            recRootId: logMeta.receiverRootId
          };
          if (((_a = this._precollectCallback) === null || _a === void 0 ? void 0 : _a.call(this, schema, msg)) === false) {
            return;
          }
          if (!this._messageBuffers.push(schema, msg)) {
            throw new Error(`Buffer is full. Refusing schemaId ${shared.schemaUtil.getSchemaId(schema)}`);
          }
          this._messageSize += shared.utility.estimateObjectSize(msg);
        } finally {
          this._isCollecting = false;
        }
      }
      get estimatedByteSize() {
        return this._messageSize + this.metricsCount * 8;
      }
      get hasData() {
        return this.messagesCount > 0 || this.metricsCount > 0;
      }
      get messagesCount() {
        return this._messageBuffers.totalItemCount;
      }
      get metricsCount() {
        let count = 0;
        if (this._metricsExtractors) {
          count += this._metricsExtractors.getAllUpCounters().length;
          count += this._metricsExtractors.getAllValueRecorders().length;
          count += this._metricsExtractors.getAllBucketHistograms().length;
        }
        return count;
      }
      getRawContentsOfCoreEnvelope() {
        const contents = {
          staticAttributes: this._staticAttributes,
          messages: this._messageBuffers.getAllMessages(true)
        };
        if (this._metricsExtractors) {
          contents.upCounters = core_envelope.CoreEnvelopeBuilder.getUpCounters(this._metricsExtractors.getAllUpCounters(), true);
          contents.valueRecorders = core_envelope.CoreEnvelopeBuilder.getValueRecorders(this._metricsExtractors.getAllValueRecorders(), true);
          contents.bucketHistograms = core_envelope.CoreEnvelopeBuilder.getBucketHistograms(this._metricsExtractors.getAllBucketHistograms(), true);
        }
        this._messageSize = 0;
        return contents;
      }
      receiveMetricsExtractors(metricsExtractors) {
        this._metricsExtractors = metricsExtractors;
      }
    }

    exports.SimpleCollector = SimpleCollector;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
