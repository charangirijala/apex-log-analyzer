var DataLayerEvents = (function () {
    'use strict';

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class DataLayerEvents {
        constructor() {
            this.resetEvents();
            this._subscribers = [];
        }
        resetEvents() {
            this._events = new Proxy([], {
                set: (target, property, value) => {
                    const oldValue = target[property];
                    const success = Reflect.set(target, property, value);
                    if (property !== 'length' && oldValue !== value) {
                        this.emitEvents();
                    }
                    return success;
                },
            });
        }
        subscribe(subscriber) {
            !this._subscribers.includes(subscriber) && this._subscribers.push(subscriber);
        }
        unsubscribe(subscriber) {
            this._subscribers = this._subscribers.filter((sub) => sub !== subscriber);
        }
        push(event) {
            this._events.push(event);
        }
        emitEvents() {
            if (this._subscribers.length) {
                const events = [...this._events];
                this.resetEvents();
                this._subscribers.forEach((subscriber) => {
                    try {
                        typeof subscriber.next === 'function' && subscriber.next(events);
                    }
                    catch (error) {
                        typeof subscriber.error === 'function' && subscriber.error(error);
                    }
                });
            }
        }
        size() {
            return this._events.length;
        }
    }

    return DataLayerEvents;

})();
