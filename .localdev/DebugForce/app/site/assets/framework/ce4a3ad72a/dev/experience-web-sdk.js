var ExperienceTagManager = (function (exports) {
    'use strict';

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const DATA_PROVIDER_TYPE_PAGE = 'page';
    const DATA_PROVIDER_TYPE_USER = 'user';
    const DATA_PROVIDER_TYPE_CATALOG = 'catalog';
    const DATA_PROVIDER_TYPE_SITE = 'site';
    const DATA_PROVIDER_TYPE_PERSONALIZATION = 'personalization';
    const DATA_PROVIDER_TYPE_SEARCH_RESULT = 'searchResult';
    const CONTEXTUAL_DATA_PROVIDER_TYPES = ['page', 'site', 'user'];
    const EVENT_SET_CONSENT = 'set-consent';
    const EVENT_SET_GUEST_GUID = 'set-guest-uuid';
    const EVENT_SET_COOKIE_DOMAIN = 'set-cookie-domain';
    const EVENT_ANCHOR_CLICK = 'anchor-click';
    const EVENT_BUTTON_CLICK = 'button-click';
    const DLO_USER_ENGAGEMENT = 'userEngagement';
    const SOURCE_CHANNEL_WEB = 'Web';
    const GUEST_UUID = 'guestUUID';
    const USER_CONSENT = 'consent';
    const PERSONALIZATION_CONTENT_ID_ATTRIBUTE_SELECTOR = '[data-personalization-content-id]';
    const PERSONALIZATION_CONTENT_ID_DATA_ATTRIBUTE = 'personalizationContentId';
    const COMPONENT_ID_ATTRIBUTE_SELECTOR = '[data-component-id]';
    const COMPONENT_ID_DATA_ATTRIBUTE = 'componentId';
    const INPUT_TYPE_SUBMIT = 'submit';
    const INPUT_TYPE_RESET = 'reset';
    const INPUT_TYPE_BUTTON = 'button';
    const IDENTITY_COOKIE_PREFIX = '_sfid';
    const IDENTITY_COOKIE_EXPIRY = 400;
    const USER_OPTS_IN_TO_TRACKING = '1';
    const USER_OPTS_OUT_OF_TRACKING = '0';
    const ALL_REGISTERED_DISPATCHERS = 'All';
    //performance
    const PERF_BASE_PROCESSING_START = 'processing-base-start';
    const PERF_ALL_PROCESSING_END = 'processing-all-end';
    const PERF_DISPATCHER_START = 'processing-dispatcher-start';
    const PERF_DISPATCHER_END = 'processing-dispatcher-end';
    const PERF_BASE_PROCESSING_END = 'processing-base-end';
    const PERF_MEASURE_DURATION_TOTAL = 'processing-total-duration';
    const PERF_MEASURE_DURATION_BASE = 'processing-base-duration';
    const PERF_MEASURE_DURATION_DISPATCHER = 'processing-dispatcher-duration';

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var uaParser = {exports: {}};

    (function (module, exports) {
    	/////////////////////////////////////////////////////////////////////////////////
    	/* UAParser.js v1.0.38
    	   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
    	   MIT License *//*
    	   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
    	   Supports browser & node.js environment. 
    	   Demo   : https://faisalman.github.io/ua-parser-js
    	   Source : https://github.com/faisalman/ua-parser-js */
    	/////////////////////////////////////////////////////////////////////////////////

    	(function (window, undefined$1) {

    	    //////////////
    	    // Constants
    	    /////////////


    	    var LIBVERSION  = '1.0.38',
    	        EMPTY       = '',
    	        UNKNOWN     = '?',
    	        FUNC_TYPE   = 'function',
    	        UNDEF_TYPE  = 'undefined',
    	        OBJ_TYPE    = 'object',
    	        STR_TYPE    = 'string',
    	        MAJOR       = 'major',
    	        MODEL       = 'model',
    	        NAME        = 'name',
    	        TYPE        = 'type',
    	        VENDOR      = 'vendor',
    	        VERSION     = 'version',
    	        ARCHITECTURE= 'architecture',
    	        CONSOLE     = 'console',
    	        MOBILE      = 'mobile',
    	        TABLET      = 'tablet',
    	        SMARTTV     = 'smarttv',
    	        WEARABLE    = 'wearable',
    	        EMBEDDED    = 'embedded',
    	        UA_MAX_LENGTH = 500;

    	    var AMAZON  = 'Amazon',
    	        APPLE   = 'Apple',
    	        ASUS    = 'ASUS',
    	        BLACKBERRY = 'BlackBerry',
    	        BROWSER = 'Browser',
    	        CHROME  = 'Chrome',
    	        EDGE    = 'Edge',
    	        FIREFOX = 'Firefox',
    	        GOOGLE  = 'Google',
    	        HUAWEI  = 'Huawei',
    	        LG      = 'LG',
    	        MICROSOFT = 'Microsoft',
    	        MOTOROLA  = 'Motorola',
    	        OPERA   = 'Opera',
    	        SAMSUNG = 'Samsung',
    	        SHARP   = 'Sharp',
    	        SONY    = 'Sony',
    	        XIAOMI  = 'Xiaomi',
    	        ZEBRA   = 'Zebra',
    	        FACEBOOK    = 'Facebook',
    	        CHROMIUM_OS = 'Chromium OS',
    	        MAC_OS  = 'Mac OS';

    	    ///////////
    	    // Helper
    	    //////////

    	    var extend = function (regexes, extensions) {
    	            var mergedRegexes = {};
    	            for (var i in regexes) {
    	                if (extensions[i] && extensions[i].length % 2 === 0) {
    	                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
    	                } else {
    	                    mergedRegexes[i] = regexes[i];
    	                }
    	            }
    	            return mergedRegexes;
    	        },
    	        enumerize = function (arr) {
    	            var enums = {};
    	            for (var i=0; i<arr.length; i++) {
    	                enums[arr[i].toUpperCase()] = arr[i];
    	            }
    	            return enums;
    	        },
    	        has = function (str1, str2) {
    	            return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
    	        },
    	        lowerize = function (str) {
    	            return str.toLowerCase();
    	        },
    	        majorize = function (version) {
    	            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined$1;
    	        },
    	        trim = function (str, len) {
    	            if (typeof(str) === STR_TYPE) {
    	                str = str.replace(/^\s\s*/, EMPTY);
    	                return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
    	            }
    	    };

    	    ///////////////
    	    // Map helper
    	    //////////////

    	    var rgxMapper = function (ua, arrays) {

    	            var i = 0, j, k, p, q, matches, match;

    	            // loop through all regexes maps
    	            while (i < arrays.length && !matches) {

    	                var regex = arrays[i],       // even sequence (0,2,4,..)
    	                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
    	                j = k = 0;

    	                // try matching uastring with regexes
    	                while (j < regex.length && !matches) {

    	                    if (!regex[j]) { break; }
    	                    matches = regex[j++].exec(ua);

    	                    if (!!matches) {
    	                        for (p = 0; p < props.length; p++) {
    	                            match = matches[++k];
    	                            q = props[p];
    	                            // check if given property is actually array
    	                            if (typeof q === OBJ_TYPE && q.length > 0) {
    	                                if (q.length === 2) {
    	                                    if (typeof q[1] == FUNC_TYPE) {
    	                                        // assign modified match
    	                                        this[q[0]] = q[1].call(this, match);
    	                                    } else {
    	                                        // assign given value, ignore regex match
    	                                        this[q[0]] = q[1];
    	                                    }
    	                                } else if (q.length === 3) {
    	                                    // check whether function or regex
    	                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
    	                                        // call function (usually string mapper)
    	                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
    	                                    } else {
    	                                        // sanitize match using given regex
    	                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
    	                                    }
    	                                } else if (q.length === 4) {
    	                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
    	                                }
    	                            } else {
    	                                this[q] = match ? match : undefined$1;
    	                            }
    	                        }
    	                    }
    	                }
    	                i += 2;
    	            }
    	        },

    	        strMapper = function (str, map) {

    	            for (var i in map) {
    	                // check if current value is array
    	                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
    	                    for (var j = 0; j < map[i].length; j++) {
    	                        if (has(map[i][j], str)) {
    	                            return (i === UNKNOWN) ? undefined$1 : i;
    	                        }
    	                    }
    	                } else if (has(map[i], str)) {
    	                    return (i === UNKNOWN) ? undefined$1 : i;
    	                }
    	            }
    	            return str;
    	    };

    	    ///////////////
    	    // String map
    	    //////////////

    	    // Safari < 3.0
    	    var oldSafariMap = {
    	            '1.0'   : '/8',
    	            '1.2'   : '/1',
    	            '1.3'   : '/3',
    	            '2.0'   : '/412',
    	            '2.0.2' : '/416',
    	            '2.0.3' : '/417',
    	            '2.0.4' : '/419',
    	            '?'     : '/'
    	        },
    	        windowsVersionMap = {
    	            'ME'        : '4.90',
    	            'NT 3.11'   : 'NT3.51',
    	            'NT 4.0'    : 'NT4.0',
    	            '2000'      : 'NT 5.0',
    	            'XP'        : ['NT 5.1', 'NT 5.2'],
    	            'Vista'     : 'NT 6.0',
    	            '7'         : 'NT 6.1',
    	            '8'         : 'NT 6.2',
    	            '8.1'       : 'NT 6.3',
    	            '10'        : ['NT 6.4', 'NT 10.0'],
    	            'RT'        : 'ARM'
    	    };

    	    //////////////
    	    // Regex map
    	    /////////////

    	    var regexes = {

    	        browser : [[

    	            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
    	            ], [VERSION, [NAME, 'Chrome']], [
    	            /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
    	            ], [VERSION, [NAME, 'Edge']], [

    	            // Presto based
    	            /(opera mini)\/([-\w\.]+)/i,                                        // Opera Mini
    	            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,                 // Opera Mobi/Tablet
    	            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i                           // Opera
    	            ], [NAME, VERSION], [
    	            /opios[\/ ]+([\w\.]+)/i                                             // Opera mini on iphone >= 8.0
    	            ], [VERSION, [NAME, OPERA+' Mini']], [
    	            /\bop(?:rg)?x\/([\w\.]+)/i                                          // Opera GX
    	            ], [VERSION, [NAME, OPERA+' GX']], [
    	            /\bopr\/([\w\.]+)/i                                                 // Opera Webkit
    	            ], [VERSION, [NAME, OPERA]], [

    	            // Mixed
    	            /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i            // Baidu
    	            ], [VERSION, [NAME, 'Baidu']], [
    	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
    	            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,      // Lunascape/Maxthon/Netfront/Jasmine/Blazer
    	            // Trident based
    	            /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,             // Avant/IEMobile/SlimBrowser
    	            /(?:ms|\()(ie) ([\w\.]+)/i,                                         // Internet Explorer

    	            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
    	            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
    	                                                                                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
    	            /(heytap|ovi)browser\/([\d\.]+)/i,                                  // Heytap/Ovi
    	            /(weibo)__([\d\.]+)/i                                               // Weibo
    	            ], [NAME, VERSION], [
    	            /\bddg\/([\w\.]+)/i                                                 // DuckDuckGo
    	            ], [VERSION, [NAME, 'DuckDuckGo']], [
    	            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i                 // UCBrowser
    	            ], [VERSION, [NAME, 'UC'+BROWSER]], [
    	            /microm.+\bqbcore\/([\w\.]+)/i,                                     // WeChat Desktop for Windows Built-in Browser
    	            /\bqbcore\/([\w\.]+).+microm/i,
    	            /micromessenger\/([\w\.]+)/i                                        // WeChat
    	            ], [VERSION, [NAME, 'WeChat']], [
    	            /konqueror\/([\w\.]+)/i                                             // Konqueror
    	            ], [VERSION, [NAME, 'Konqueror']], [
    	            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i                       // IE11
    	            ], [VERSION, [NAME, 'IE']], [
    	            /ya(?:search)?browser\/([\w\.]+)/i                                  // Yandex
    	            ], [VERSION, [NAME, 'Yandex']], [
    	            /slbrowser\/([\w\.]+)/i                                             // Smart Lenovo Browser
    	            ], [VERSION, [NAME, 'Smart Lenovo '+BROWSER]], [
    	            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
    	            ], [[NAME, /(.+)/, '$1 Secure '+BROWSER], VERSION], [
    	            /\bfocus\/([\w\.]+)/i                                               // Firefox Focus
    	            ], [VERSION, [NAME, FIREFOX+' Focus']], [
    	            /\bopt\/([\w\.]+)/i                                                 // Opera Touch
    	            ], [VERSION, [NAME, OPERA+' Touch']], [
    	            /coc_coc\w+\/([\w\.]+)/i                                            // Coc Coc Browser
    	            ], [VERSION, [NAME, 'Coc Coc']], [
    	            /dolfin\/([\w\.]+)/i                                                // Dolphin
    	            ], [VERSION, [NAME, 'Dolphin']], [
    	            /coast\/([\w\.]+)/i                                                 // Opera Coast
    	            ], [VERSION, [NAME, OPERA+' Coast']], [
    	            /miuibrowser\/([\w\.]+)/i                                           // MIUI Browser
    	            ], [VERSION, [NAME, 'MIUI '+BROWSER]], [
    	            /fxios\/([-\w\.]+)/i                                                // Firefox for iOS
    	            ], [VERSION, [NAME, FIREFOX]], [
    	            /\bqihu|(qi?ho?o?|360)browser/i                                     // 360
    	            ], [[NAME, '360 ' + BROWSER]], [
    	            /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
    	            ], [[NAME, /(.+)/, '$1 ' + BROWSER], VERSION], [                    // Oculus/Sailfish/HuaweiBrowser/VivoBrowser
    	            /samsungbrowser\/([\w\.]+)/i                                        // Samsung Internet
    	            ], [VERSION, [NAME, SAMSUNG + ' Internet']], [
    	            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
    	            ], [[NAME, /_/g, ' '], VERSION], [
    	            /metasr[\/ ]?([\d\.]+)/i                                            // Sogou Explorer
    	            ], [VERSION, [NAME, 'Sogou Explorer']], [
    	            /(sogou)mo\w+\/([\d\.]+)/i                                          // Sogou Mobile
    	            ], [[NAME, 'Sogou Mobile'], VERSION], [
    	            /(electron)\/([\w\.]+) safari/i,                                    // Electron-based App
    	            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,                   // Tesla
    	            /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i                        // QQBrowser/2345 Browser
    	            ], [NAME, VERSION], [
    	            /(lbbrowser)/i,                                                     // LieBao Browser
    	            /\[(linkedin)app\]/i                                                // LinkedIn App for iOS & Android
    	            ], [NAME], [

    	            // WebView
    	            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i       // Facebook App for iOS & Android
    	            ], [[NAME, FACEBOOK], VERSION], [
    	            /(Klarna)\/([\w\.]+)/i,                                             // Klarna Shopping Browser for iOS & Android
    	            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,                             // Kakao App
    	            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,                                  // Naver InApp
    	            /safari (line)\/([\w\.]+)/i,                                        // Line App for iOS
    	            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
    	            /(alipay)client\/([\w\.]+)/i,                                       // Alipay
    	            /(twitter)(?:and| f.+e\/([\w\.]+))/i,                               // Twitter
    	            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i                     // Chromium/Instagram/Snapchat
    	            ], [NAME, VERSION], [
    	            /\bgsa\/([\w\.]+) .*safari\//i                                      // Google Search Appliance on iOS
    	            ], [VERSION, [NAME, 'GSA']], [
    	            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i                        // TikTok
    	            ], [VERSION, [NAME, 'TikTok']], [

    	            /headlesschrome(?:\/([\w\.]+)| )/i                                  // Chrome Headless
    	            ], [VERSION, [NAME, CHROME+' Headless']], [

    	            / wv\).+(chrome)\/([\w\.]+)/i                                       // Chrome WebView
    	            ], [[NAME, CHROME+' WebView'], VERSION], [

    	            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i           // Android Browser
    	            ], [VERSION, [NAME, 'Android '+BROWSER]], [

    	            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i       // Chrome/OmniWeb/Arora/Tizen/Nokia
    	            ], [NAME, VERSION], [

    	            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i                      // Mobile Safari
    	            ], [VERSION, [NAME, 'Mobile Safari']], [
    	            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i                // Safari & Safari Mobile
    	            ], [VERSION, NAME], [
    	            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i                      // Safari < 3.0
    	            ], [NAME, [VERSION, strMapper, oldSafariMap]], [

    	            /(webkit|khtml)\/([\w\.]+)/i
    	            ], [NAME, VERSION], [

    	            // Gecko based
    	            /(navigator|netscape\d?)\/([-\w\.]+)/i                              // Netscape
    	            ], [[NAME, 'Netscape'], VERSION], [
    	            /mobile vr; rv:([\w\.]+)\).+firefox/i                               // Firefox Reality
    	            ], [VERSION, [NAME, FIREFOX+' Reality']], [
    	            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
    	            /(swiftfox)/i,                                                      // Swiftfox
    	            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
    	                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
    	            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
    	                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
    	            /(firefox)\/([\w\.]+)/i,                                            // Other Firefox-based
    	            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,                         // Mozilla

    	            // Other
    	            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
    	                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
    	            /(links) \(([\w\.]+)/i,                                             // Links
    	            /panasonic;(viera)/i                                                // Panasonic Viera
    	            ], [NAME, VERSION], [
    	            
    	            /(cobalt)\/([\w\.]+)/i                                              // Cobalt
    	            ], [NAME, [VERSION, /master.|lts./, ""]]
    	        ],

    	        cpu : [[

    	            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
    	            ], [[ARCHITECTURE, 'amd64']], [

    	            /(ia32(?=;))/i                                                      // IA32 (quicktime)
    	            ], [[ARCHITECTURE, lowerize]], [

    	            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
    	            ], [[ARCHITECTURE, 'ia32']], [

    	            /\b(aarch64|arm(v?8e?l?|_?64))\b/i                                 // ARM64
    	            ], [[ARCHITECTURE, 'arm64']], [

    	            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
    	            ], [[ARCHITECTURE, 'armhf']], [

    	            // PocketPC mistakenly identified as PowerPC
    	            /windows (ce|mobile); ppc;/i
    	            ], [[ARCHITECTURE, 'arm']], [

    	            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i                            // PowerPC
    	            ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [

    	            /(sun4\w)[;\)]/i                                                    // SPARC
    	            ], [[ARCHITECTURE, 'sparc']], [

    	            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
    	                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
    	            ], [[ARCHITECTURE, lowerize]]
    	        ],

    	        device : [[

    	            //////////////////////////
    	            // MOBILES & TABLETS
    	            /////////////////////////

    	            // Samsung
    	            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
    	            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [
    	            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
    	            /samsung[- ]([-\w]+)/i,
    	            /sec-(sgh\w+)/i
    	            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [

    	            // Apple
    	            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i                          // iPod/iPhone
    	            ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [
    	            /\((ipad);[-\w\),; ]+apple/i,                                       // iPad
    	            /applecoremedia\/[\w\.]+ \((ipad)/i,
    	            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
    	            ], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [
    	            /(macintosh);/i
    	            ], [MODEL, [VENDOR, APPLE]], [

    	            // Sharp
    	            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
    	            ], [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]], [

    	            // Huawei
    	            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
    	            ], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [
    	            /(?:huawei|honor)([-\w ]+)[;\)]/i,
    	            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
    	            ], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [

    	            // Xiaomi
    	            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,                  // Xiaomi POCO
    	            /\b; (\w+) build\/hm\1/i,                                           // Xiaomi Hongmi 'numeric' models
    	            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,                             // Xiaomi Hongmi
    	            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,                   // Xiaomi Redmi
    	            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,        // Xiaomi Redmi 'numeric' models
    	            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
    	            ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [
    	            /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,                     // Redmi Pad
    	            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i                        // Mi Pad tablets
    	            ],[[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [

    	            // OPPO
    	            /; (\w+) bui.+ oppo/i,
    	            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
    	            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [
    	            /\b(opd2\d{3}a?) bui/i
    	            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, TABLET]], [

    	            // Vivo
    	            /vivo (\w+)(?: bui|\))/i,
    	            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
    	            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

    	            // Realme
    	            /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
    	            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

    	            // Motorola
    	            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
    	            /\bmot(?:orola)?[- ](\w*)/i,
    	            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
    	            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [
    	            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
    	            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [

    	            // LG
    	            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
    	            ], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [
    	            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
    	            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
    	            /\blg-?([\d\w]+) bui/i
    	            ], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [

    	            // Lenovo
    	            /(ideatab[-\w ]+)/i,
    	            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
    	            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

    	            // Nokia
    	            /(?:maemo|nokia).*(n900|lumia \d+)/i,
    	            /nokia[-_ ]?([-\w\.]*)/i
    	            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

    	            // Google
    	            /(pixel c)\b/i                                                      // Google Pixel C
    	            ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [
    	            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i                         // Google Pixel
    	            ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [

    	            // Sony
    	            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
    	            ], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [
    	            /sony tablet [ps]/i,
    	            /\b(?:sony)?sgp\w+(?: bui|\))/i
    	            ], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [

    	            // OnePlus
    	            / (kb2005|in20[12]5|be20[12][59])\b/i,
    	            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
    	            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

    	            // Amazon
    	            /(alexa)webm/i,
    	            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,                             // Kindle Fire without Silk / Echo Show
    	            /(kf[a-z]+)( bui|\)).+silk\//i                                      // Kindle Fire HD
    	            ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [
    	            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i                     // Fire Phone
    	            ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [

    	            // BlackBerry
    	            /(playbook);[-\w\),; ]+(rim)/i                                      // BlackBerry PlayBook
    	            ], [MODEL, VENDOR, [TYPE, TABLET]], [
    	            /\b((?:bb[a-f]|st[hv])100-\d)/i,
    	            /\(bb10; (\w+)/i                                                    // BlackBerry 10
    	            ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [

    	            // Asus
    	            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
    	            ], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [
    	            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
    	            ], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [

    	            // HTC
    	            /(nexus 9)/i                                                        // HTC Nexus 9
    	            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
    	            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,                         // HTC

    	            // ZTE
    	            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
    	            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i         // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
    	            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

    	            // Acer
    	            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
    	            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

    	            // Meizu
    	            /droid.+; (m[1-5] note) bui/i,
    	            /\bmz-([-\w]{2,})/i
    	            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
    	                
    	            // Ulefone
    	            /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
    	            ], [MODEL, [VENDOR, 'Ulefone'], [TYPE, MOBILE]], [

    	            // MIXED
    	            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
    	                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
    	            /(hp) ([\w ]+\w)/i,                                                 // HP iPAQ
    	            /(asus)-?(\w+)/i,                                                   // Asus
    	            /(microsoft); (lumia[\w ]+)/i,                                      // Microsoft Lumia
    	            /(lenovo)[-_ ]?([-\w]+)/i,                                          // Lenovo
    	            /(jolla)/i,                                                         // Jolla
    	            /(oppo) ?([\w ]+) bui/i                                             // OPPO
    	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

    	            /(kobo)\s(ereader|touch)/i,                                         // Kobo
    	            /(archos) (gamepad2?)/i,                                            // Archos
    	            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
    	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
    	            /(nook)[\w ]+build\/(\w+)/i,                                        // Nook
    	            /(dell) (strea[kpr\d ]*[\dko])/i,                                   // Dell Streak
    	            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,                                  // Le Pan Tablets
    	            /(trinity)[- ]*(t\d{3}) bui/i,                                      // Trinity Tablets
    	            /(gigaset)[- ]+(q\w{1,9}) bui/i,                                    // Gigaset Tablets
    	            /(vodafone) ([\w ]+)(?:\)| bui)/i                                   // Vodafone
    	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

    	            /(surface duo)/i                                                    // Surface Duo
    	            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [
    	            /droid [\d\.]+; (fp\du?)(?: b|\))/i                                 // Fairphone
    	            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
    	            /(u304aa)/i                                                         // AT&T
    	            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
    	            /\bsie-(\w*)/i                                                      // Siemens
    	            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
    	            /\b(rct\w+) b/i                                                     // RCA Tablets
    	            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
    	            /\b(venue[\d ]{2,7}) b/i                                            // Dell Venue Tablets
    	            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
    	            /\b(q(?:mv|ta)\w+) b/i                                              // Verizon Tablet
    	            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
    	            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i                       // Barnes & Noble Tablet
    	            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
    	            /\b(tm\d{3}\w+) b/i
    	            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
    	            /\b(k88) b/i                                                        // ZTE K Series Tablet
    	            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
    	            /\b(nx\d{3}j) b/i                                                   // ZTE Nubia
    	            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
    	            /\b(gen\d{3}) b.+49h/i                                              // Swiss GEN Mobile
    	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
    	            /\b(zur\d{3}) b/i                                                   // Swiss ZUR Tablet
    	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
    	            /\b((zeki)?tb.*\b) b/i                                              // Zeki Tablets
    	            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
    	            /\b([yr]\d{2}) b/i,
    	            /\b(dragon[- ]+touch |dt)(\w{5}) b/i                                // Dragon Touch Tablet
    	            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
    	            /\b(ns-?\w{0,9}) b/i                                                // Insignia Tablets
    	            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
    	            /\b((nxa|next)-?\w{0,9}) b/i                                        // NextBook Tablets
    	            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
    	            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i                  // Voice Xtreme Phones
    	            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
    	            /\b(lvtel\-)?(v1[12]) b/i                                           // LvTel Phones
    	            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
    	            /\b(ph-1) /i                                                        // Essential PH-1
    	            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
    	            /\b(v(100md|700na|7011|917g).*\b) b/i                               // Envizen Tablets
    	            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
    	            /\b(trio[-\w\. ]+) b/i                                              // MachSpeed Tablets
    	            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
    	            /\btu_(1491) b/i                                                    // Rotor Tablets
    	            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
    	            /(shield[\w ]+) b/i                                                 // Nvidia Shield Tablets
    	            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
    	            /(sprint) (\w+)/i                                                   // Sprint Phones
    	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
    	            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
    	            ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [
    	            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i             // Zebra
    	            ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [
    	            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
    	            ], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [

    	            ///////////////////
    	            // SMARTTVS
    	            ///////////////////

    	            /smart-tv.+(samsung)/i                                              // Samsung
    	            ], [VENDOR, [TYPE, SMARTTV]], [
    	            /hbbtv.+maple;(\d+)/i
    	            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [
    	            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i        // LG SmartTV
    	            ], [[VENDOR, LG], [TYPE, SMARTTV]], [
    	            /(apple) ?tv/i                                                      // Apple TV
    	            ], [VENDOR, [MODEL, APPLE+' TV'], [TYPE, SMARTTV]], [
    	            /crkey/i                                                            // Google Chromecast
    	            ], [[MODEL, CHROME+'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [
    	            /droid.+aft(\w+)( bui|\))/i                                         // Fire TV
    	            ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [
    	            /\(dtv[\);].+(aquos)/i,
    	            /(aquos-tv[\w ]+)\)/i                                               // Sharp
    	            ], [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],[
    	            /(bravia[\w ]+)( bui|\))/i                                              // Sony
    	            ], [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]], [
    	            /(mitv-\w{5}) bui/i                                                 // Xiaomi
    	            ], [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]], [
    	            /Hbbtv.*(technisat) (.*);/i                                         // TechniSAT
    	            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
    	            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,                          // Roku
    	            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i         // HbbTV devices
    	            ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [
    	            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i                   // SmartTV from Unidentified Vendors
    	            ], [[TYPE, SMARTTV]], [

    	            ///////////////////
    	            // CONSOLES
    	            ///////////////////

    	            /(ouya)/i,                                                          // Ouya
    	            /(nintendo) ([wids3utch]+)/i                                        // Nintendo
    	            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
    	            /droid.+; (shield) bui/i                                            // Nvidia
    	            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
    	            /(playstation [345portablevi]+)/i                                   // Playstation
    	            ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [
    	            /\b(xbox(?: one)?(?!; xbox))[\); ]/i                                // Microsoft Xbox
    	            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [

    	            ///////////////////
    	            // WEARABLES
    	            ///////////////////

    	            /((pebble))app/i                                                    // Pebble
    	            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
    	            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i                              // Apple Watch
    	            ], [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]], [
    	            /droid.+; (glass) \d/i                                              // Google Glass
    	            ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [
    	            /droid.+; (wt63?0{2,3})\)/i
    	            ], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [
    	            /(quest( \d| pro)?)/i                                               // Oculus Quest
    	            ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [

    	            ///////////////////
    	            // EMBEDDED
    	            ///////////////////

    	            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i                              // Tesla
    	            ], [VENDOR, [TYPE, EMBEDDED]], [
    	            /(aeobc)\b/i                                                        // Echo Dot
    	            ], [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]], [

    	            ////////////////////
    	            // MIXED (GENERIC)
    	            ///////////////////

    	            /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i    // Android Phones from Unidentified Vendors
    	            ], [MODEL, [TYPE, MOBILE]], [
    	            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i       // Android Tablets from Unidentified Vendors
    	            ], [MODEL, [TYPE, TABLET]], [
    	            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i                      // Unidentifiable Tablet
    	            ], [[TYPE, TABLET]], [
    	            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i    // Unidentifiable Mobile
    	            ], [[TYPE, MOBILE]], [
    	            /(android[-\w\. ]{0,9});.+buil/i                                    // Generic Android Device
    	            ], [MODEL, [VENDOR, 'Generic']]
    	        ],

    	        engine : [[

    	            /windows.+ edge\/([\w\.]+)/i                                       // EdgeHTML
    	            ], [VERSION, [NAME, EDGE+'HTML']], [

    	            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
    	            ], [VERSION, [NAME, 'Blink']], [

    	            /(presto)\/([\w\.]+)/i,                                             // Presto
    	            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
    	            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
    	            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,                           // KHTML/Tasman/Links
    	            /(icab)[\/ ]([23]\.[\d\.]+)/i,                                      // iCab
    	            /\b(libweb)/i
    	            ], [NAME, VERSION], [

    	            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
    	            ], [VERSION, NAME]
    	        ],

    	        os : [[

    	            // Windows
    	            /microsoft (windows) (vista|xp)/i                                   // Windows (iTunes)
    	            ], [NAME, VERSION], [
    	            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i             // Windows Phone
    	            ], [NAME, [VERSION, strMapper, windowsVersionMap]], [
    	            /windows nt 6\.2; (arm)/i,                                        // Windows RT
    	            /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
    	            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
    	            ], [[VERSION, strMapper, windowsVersionMap], [NAME, 'Windows']], [

    	            // iOS/macOS
    	            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,              // iOS
    	            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
    	            /cfnetwork\/.+darwin/i
    	            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
    	            /(mac os x) ?([\w\. ]*)/i,
    	            /(macintosh|mac_powerpc\b)(?!.+haiku)/i                             // Mac OS
    	            ], [[NAME, MAC_OS], [VERSION, /_/g, '.']], [

    	            // Mobile OSes
    	            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i                    // Android-x86/HarmonyOS
    	            ], [VERSION, NAME], [                                               // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
    	            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
    	            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
    	            /(tizen|kaios)[\/ ]([\w\.]+)/i,                                     // Tizen/KaiOS
    	            /\((series40);/i                                                    // Series 40
    	            ], [NAME, VERSION], [
    	            /\(bb(10);/i                                                        // BlackBerry 10
    	            ], [VERSION, [NAME, BLACKBERRY]], [
    	            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i         // Symbian
    	            ], [VERSION, [NAME, 'Symbian']], [
    	            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
    	            ], [VERSION, [NAME, FIREFOX+' OS']], [
    	            /web0s;.+rt(tv)/i,
    	            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
    	            ], [VERSION, [NAME, 'webOS']], [
    	            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i                              // watchOS
    	            ], [VERSION, [NAME, 'watchOS']], [

    	            // Google Chromecast
    	            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
    	            ], [VERSION, [NAME, CHROME+'cast']], [
    	            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i                                  // Chromium OS
    	            ], [[NAME, CHROMIUM_OS], VERSION],[

    	            // Smart TVs
    	            /panasonic;(viera)/i,                                               // Panasonic Viera
    	            /(netrange)mmh/i,                                                   // Netrange
    	            /(nettv)\/(\d+\.[\w\.]+)/i,                                         // NetTV

    	            // Console
    	            /(nintendo|playstation) ([wids345portablevuch]+)/i,                 // Nintendo/Playstation
    	            /(xbox); +xbox ([^\);]+)/i,                                         // Microsoft Xbox (360, One, X, S, Series X, Series S)

    	            // Other
    	            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,                            // Joli/Palm
    	            /(mint)[\/\(\) ]?(\w*)/i,                                           // Mint
    	            /(mageia|vectorlinux)[; ]/i,                                        // Mageia/VectorLinux
    	            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
    	                                                                                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
    	            /(hurd|linux) ?([\w\.]*)/i,                                         // Hurd/Linux
    	            /(gnu) ?([\w\.]*)/i,                                                // GNU
    	            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
    	            /(haiku) (\w+)/i                                                    // Haiku
    	            ], [NAME, VERSION], [
    	            /(sunos) ?([\w\.\d]*)/i                                             // Solaris
    	            ], [[NAME, 'Solaris'], VERSION], [
    	            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,                              // Solaris
    	            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,                                  // AIX
    	            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
    	            /(unix) ?([\w\.]*)/i                                                // UNIX
    	            ], [NAME, VERSION]
    	        ]
    	    };

    	    /////////////////
    	    // Constructor
    	    ////////////////

    	    var UAParser = function (ua, extensions) {

    	        if (typeof ua === OBJ_TYPE) {
    	            extensions = ua;
    	            ua = undefined$1;
    	        }

    	        if (!(this instanceof UAParser)) {
    	            return new UAParser(ua, extensions).getResult();
    	        }

    	        var _navigator = (typeof window !== UNDEF_TYPE && window.navigator) ? window.navigator : undefined$1;
    	        var _ua = ua || ((_navigator && _navigator.userAgent) ? _navigator.userAgent : EMPTY);
    	        var _uach = (_navigator && _navigator.userAgentData) ? _navigator.userAgentData : undefined$1;
    	        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
    	        var _isSelfNav = _navigator && _navigator.userAgent == _ua;

    	        this.getBrowser = function () {
    	            var _browser = {};
    	            _browser[NAME] = undefined$1;
    	            _browser[VERSION] = undefined$1;
    	            rgxMapper.call(_browser, _ua, _rgxmap.browser);
    	            _browser[MAJOR] = majorize(_browser[VERSION]);
    	            // Brave-specific detection
    	            if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
    	                _browser[NAME] = 'Brave';
    	            }
    	            return _browser;
    	        };
    	        this.getCPU = function () {
    	            var _cpu = {};
    	            _cpu[ARCHITECTURE] = undefined$1;
    	            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
    	            return _cpu;
    	        };
    	        this.getDevice = function () {
    	            var _device = {};
    	            _device[VENDOR] = undefined$1;
    	            _device[MODEL] = undefined$1;
    	            _device[TYPE] = undefined$1;
    	            rgxMapper.call(_device, _ua, _rgxmap.device);
    	            if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
    	                _device[TYPE] = MOBILE;
    	            }
    	            // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
    	            if (_isSelfNav && _device[MODEL] == 'Macintosh' && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
    	                _device[MODEL] = 'iPad';
    	                _device[TYPE] = TABLET;
    	            }
    	            return _device;
    	        };
    	        this.getEngine = function () {
    	            var _engine = {};
    	            _engine[NAME] = undefined$1;
    	            _engine[VERSION] = undefined$1;
    	            rgxMapper.call(_engine, _ua, _rgxmap.engine);
    	            return _engine;
    	        };
    	        this.getOS = function () {
    	            var _os = {};
    	            _os[NAME] = undefined$1;
    	            _os[VERSION] = undefined$1;
    	            rgxMapper.call(_os, _ua, _rgxmap.os);
    	            if (_isSelfNav && !_os[NAME] && _uach && _uach.platform && _uach.platform != 'Unknown') {
    	                _os[NAME] = _uach.platform  
    	                                    .replace(/chrome os/i, CHROMIUM_OS)
    	                                    .replace(/macos/i, MAC_OS);           // backward compatibility
    	            }
    	            return _os;
    	        };
    	        this.getResult = function () {
    	            return {
    	                ua      : this.getUA(),
    	                browser : this.getBrowser(),
    	                engine  : this.getEngine(),
    	                os      : this.getOS(),
    	                device  : this.getDevice(),
    	                cpu     : this.getCPU()
    	            };
    	        };
    	        this.getUA = function () {
    	            return _ua;
    	        };
    	        this.setUA = function (ua) {
    	            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? trim(ua, UA_MAX_LENGTH) : ua;
    	            return this;
    	        };
    	        this.setUA(_ua);
    	        return this;
    	    };

    	    UAParser.VERSION = LIBVERSION;
    	    UAParser.BROWSER =  enumerize([NAME, VERSION, MAJOR]);
    	    UAParser.CPU = enumerize([ARCHITECTURE]);
    	    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    	    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

    	    ///////////
    	    // Export
    	    //////////

    	    // check js environment
    	    {
    	        // nodejs env
    	        if (module.exports) {
    	            exports = module.exports = UAParser;
    	        }
    	        exports.UAParser = UAParser;
    	    }

    	    // jQuery/Zepto specific (optional)
    	    // Note:
    	    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    	    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    	    //   and we should catch that.
    	    var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
    	    if ($ && !$.ua) {
    	        var parser = new UAParser();
    	        $.ua = parser.getResult();
    	        $.ua.get = function () {
    	            return parser.getUA();
    	        };
    	        $.ua.set = function (ua) {
    	            parser.setUA(ua);
    	            var result = parser.getResult();
    	            for (var prop in result) {
    	                $.ua[prop] = result[prop];
    	            }
    	        };
    	    }

    	})(typeof window === 'object' ? window : commonjsGlobal); 
    } (uaParser, uaParser.exports));

    var uaParserExports = uaParser.exports;
    var UAParser = /*@__PURE__*/getDefaultExportFromCjs(uaParserExports);

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * Logger class for webSDK
     */
    class WebSDKLogger {
        /**
         * Enabled debug logs
         * @param value boolean
         */
        static enableDebug(value) {
            this._debug = value;
        }
        /**
         * Console logs the input value
         * @param value log
         */
        static log(value) {
            if (this._debug) {
                console.log(`ExpTagManager: ${value}`);
            }
        }
        /**
         * Console warns the input value
         * @param value log
         */
        static warn(value) {
            if (this._debug) {
                console.warn(`ExpTagManager: ${value}`);
            }
        }
        /**
         * Console error the input value
         * @param value log
         */
        static error(value) {
            if (this._debug) {
                console.error(`ExpTagManager: ${value}`);
            }
        }
    }
    WebSDKLogger._debug = false;

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class CommonUtils {
        /**
         * Gets data layer content as javascript object
         * @param scriptTag
         * @returns
         */
        static getJsonFromDataLayer(scriptTag) {
            let jsonData;
            if (scriptTag != null) {
                try {
                    // Remove all white spaces before parsing the JSON string
                    jsonData = JSON.parse(scriptTag.textContent.replace(/\s/g, ''));
                }
                catch (e) {
                    WebSDKLogger.log('Failed to parse data layer JSON');
                }
            }
            return jsonData;
        }
        /**
         * Gets query string based on a data provider type
         * @param dataProviderType
         * @returns query string
         */
        static getQueryStringForDataProviderType(dataProviderType) {
            return `script[type='application/json'][data-provider-type='${dataProviderType}']`;
        }
        /**
         * Get all catalog objects from data layer
         * @param catalogObjectType
         * @param catalogObjectId
         * @returns CatalogObject array
         */
        static getCatalogObjectDataFromDataLayer(catalogObjectId, catalogObjectType) {
            return Array.from(document.querySelectorAll(this.getQueryStringForDataProviderType(DATA_PROVIDER_TYPE_CATALOG)))
                .flatMap((catalogObjectTag) => {
                return this.getJsonFromDataLayer(catalogObjectTag);
            })
                .filter((catalogObjectData) => {
                return catalogObjectData.type == catalogObjectType && catalogObjectData.id == catalogObjectId;
            });
        }
        /**
         * Converts bytes to string
         * @param bytes Uint8Array
         * @returns string
         */
        static bytesToBase64(bytes) {
            const binString = String.fromCodePoint(...bytes);
            return btoa(binString);
        }
        /**
         * Checks if a string is well formed or not
         * @param str string
         * @returns boolean
         */
        static isWellFormed(str) {
            try {
                encodeURIComponent(str);
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * WebSDKStore is a static class to store values in the form of key-value pair
     */
    class WebSDKStore {
        /**
         * Deletes experience web sdk store values
         */
        static deleteValues() {
            this.values = {};
        }
        /**
         * Gets experience web sdk store values
         * @returns store values
         */
        static getValues() {
            return this.values;
        }
        /**
         * Gets experience web sdk store value for a fieldName
         * @returns field value
         */
        static getFieldValue(fieldName) {
            return this.values[fieldName];
        }
        /**
         * Updates experience web sdk store value for a fieldName
         */
        static updateFieldValue(fieldName, fieldValue) {
            if (fieldName) {
                if (typeof fieldValue !== 'undefined' && fieldValue !== null && fieldValue !== '') {
                    this.values[fieldName] = fieldValue;
                }
                else {
                    // delete the field from store
                    delete this.values[fieldName];
                }
            }
        }
    }
    WebSDKStore.values = {};

    /*! js-cookie v3.0.5 | MIT */
    /* eslint-disable no-var */
    function assign (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target
    }
    /* eslint-enable no-var */

    /* eslint-disable no-var */
    var defaultConverter = {
      read: function (value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      },
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        )
      }
    };
    /* eslint-enable no-var */

    /* eslint-disable no-var */

    function init (converter, defaultAttributes) {
      function set (name, value, attributes) {
        if (typeof document === 'undefined') {
          return
        }

        attributes = assign({}, defaultAttributes, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }

        name = encodeURIComponent(name)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);

        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue
          }

          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie =
          name + '=' + converter.write(value, name) + stringifiedAttributes)
      }

      function get (name) {
        if (typeof document === 'undefined' || (arguments.length && !name)) {
          return
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var value = parts.slice(1).join('=');

          try {
            var found = decodeURIComponent(parts[0]);
            jar[found] = converter.read(value, found);

            if (name === found) {
              break
            }
          } catch (e) {}
        }

        return name ? jar[name] : jar
      }

      return Object.create(
        {
          set,
          get,
          remove: function (name, attributes) {
            set(
              name,
              '',
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function (attributes) {
            return init(this.converter, assign({}, this.attributes, attributes))
          },
          withConverter: function (converter) {
            return init(assign({}, this.converter, converter), this.attributes)
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      )
    }

    var api = init(defaultConverter, { path: '/' });

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class CookieManager {
        /**
         * Sets the cookie domain
         * @param domain void
         */
        static setDomain(domain) {
            this.cookieDomain = domain;
        }
        /**
         * Returns the cookie domain
         * @returns string
         */
        static getDomain() {
            return this.cookieDomain;
        }
        /**
         * Sets a cookie
         * @param name cookie name
         * @param value cookie value
         * @param attributes cookie attributes
         */
        static setCookie(name, value, attributes) {
            api.set(name, value, attributes);
        }
        /**
         * Returns cookie value
         * @param name cookie name
         * @returns cookie value
         */
        static getCookie(name) {
            return api.get(name);
        }
        /**
         * Removes the provided cookie
         * @param name cookie name
         * @param attributes cookie attributes
         */
        static removeCookie(name, attributes) {
            api.remove(name, attributes);
        }
    }
    // property to store cookie domain
    CookieManager.cookieDomain = window.location.hostname;

    function sha1(r){var o,e,t,f,n,a=[],c=[e=1732584193,t=4023233417,~e,~t,3285377520],u=[],d=unescape(encodeURI(r))+"",g=d.length;for(u[r=--g/4+2|15]=8*g;~g;)u[g>>2]|=d.charCodeAt(g)<<8*~g--;for(o=g=0;o<r;o+=16){for(e=c;g<80;e=[e[4]+(a[g]=g<16?~~u[o+g]:2*d|d<0)+1518500249+[t&f|~t&n,d=341275144+(t^f^n),882459459+(t&f|t&n|f&n),d+1535694389][g++/5>>2]+((d=e[0])<<5|d>>>27),d,t<<30|t>>>2,f,n])d=a[g-3]^a[g-8]^a[g-14]^a[g-16],t=e[1],f=e[2],n=e[3];for(g=5;g;)c[--g]+=e[g];}for(d="";g<40;)d+=(c[g>>3]>>4*(7-g++)&15).toString(16);return d}

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class IdentityCookie {
        /**
         * Generates sha1 hash based on cookie domain
         * @returns hash
         */
        static generateCookieDomainHash() {
            return sha1(CookieManager.getDomain() + '/').slice(0, 4); // 4 hexits = 16 bits
        }
        /**
         * Returns the cookie domain hash
         * @returns hash
         */
        static getCookieDomainHash() {
            if (!this.cookieDomainHash) {
                this.cookieDomainHash = sha1(`${this.generateCookieDomainHash()}`).slice(0, 4);
            }
            return this.cookieDomainHash;
        }
        /**
         * Returns cookie name for identity cookie
         * @returns cookie name
         */
        static getIdentityCookieName() {
            return `${IDENTITY_COOKIE_PREFIX}_${this.getCookieDomainHash()}`;
        }
        /**
         * Reads identity cookie and returns anonymousId
         * @returns string
         */
        static getIdentityCookieValue() {
            try {
                const identityCookieValue = JSON.parse(CookieManager.getCookie(this.getIdentityCookieName()));
                return identityCookieValue === null || identityCookieValue === void 0 ? void 0 : identityCookieValue.anonymousId;
            }
            catch (e) {
                return undefined;
            }
        }
        /**
         * Sets the identity cookie
         */
        static setIdentityCookie() {
            const identityCookieValue = {
                anonymousId: crypto.randomUUID(),
            };
            CookieManager.setCookie(this.getIdentityCookieName(), JSON.stringify(identityCookieValue), {
                expires: IDENTITY_COOKIE_EXPIRY,
                domain: CookieManager.getDomain(),
                sameSite: 'lax',
                secure: true,
            });
        }
        /**
         * Removes the identity cookie
         */
        static removeIdentityCookie() {
            CookieManager.removeCookie(this.getIdentityCookieName(), {
                domain: CookieManager.getDomain(),
            });
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class EventHandlerUtils {
        /**
         * Parses user agent string and returns device, browser and os info
         * @returns UserAgent
         */
        static parseUserAgent() {
            const parser = new UAParser();
            const { browser, device, os } = parser.getResult();
            const { name: browserName, version: browserVersion } = browser;
            const { vendor: deviceVendor, model: deviceModel } = device;
            const { name: osName, version: osVersion } = os;
            return {
                browserName,
                browserVersion,
                deviceVendor,
                deviceModel,
                osName,
                osVersion,
            };
        }
        /**
         * Returns screen height and width
         * @returns ScreenInfo
         */
        static getScreenResolution() {
            return {
                screenWidth: window.screen.width,
                screenHeight: window.screen.height,
            };
        }
        /**
         * Adds user data to event if available
         * @param event interaction event
         * @param userData User
         */
        static addUserDataToInteractionEvent(event, userData) {
            if (userData) {
                event.user = userData;
            }
        }
        /**
         * Adds source data to event if available
         * @param event interaction event
         * @param sourceData Page
         */
        static addSourceDataToInteractionEvent(event, sourceData) {
            // Initialize with empty object
            if (!sourceData) {
                sourceData = {};
            }
            // Add default values if not present in the data layer
            if (!(sourceData === null || sourceData === void 0 ? void 0 : sourceData.locale)) {
                sourceData.locale = navigator.language;
            }
            if (!(sourceData === null || sourceData === void 0 ? void 0 : sourceData.title)) {
                sourceData.title = document.title;
            }
            if (!(sourceData === null || sourceData === void 0 ? void 0 : sourceData.channel)) {
                sourceData.channel = SOURCE_CHANNEL_WEB;
            }
            if (!(sourceData === null || sourceData === void 0 ? void 0 : sourceData.url)) {
                sourceData.url = window.location.href;
            }
            if (!(sourceData === null || sourceData === void 0 ? void 0 : sourceData.urlReferrer)) {
                sourceData.urlReferrer = document.referrer;
            }
            event.source = sourceData;
        }
        /**
         * Gets the data attribute value from the closest element having the data attribute
         * @param element
         * @returns data attribute value
         */
        static getDataAttributeFromClosestElement(element, dataAttributeSelector, dataAttribute) {
            var _a;
            //Find the closest element which has the data attribute
            let dataAttributeValue;
            if (element && 'closest' in element) {
                const elementWithDataAttribute = element.closest(dataAttributeSelector);
                dataAttributeValue = (_a = elementWithDataAttribute === null || elementWithDataAttribute === void 0 ? void 0 : elementWithDataAttribute.dataset) === null || _a === void 0 ? void 0 : _a[`${dataAttribute}`];
            }
            return { [`${dataAttribute}`]: dataAttributeValue };
        }
        /**
         * Gets data from data layer based on data provider type
         * @param type DataProviderType
         * @returns object or undefined
         */
        static getDataFromDataLayerByDataProviderType(type) {
            const dataLayerNodes = document.querySelectorAll(CommonUtils.getQueryStringForDataProviderType(type));
            let dataLayerData = {};
            dataLayerNodes.forEach((dataLayerNode) => {
                const data = CommonUtils.getJsonFromDataLayer(dataLayerNode);
                dataLayerData = { ...dataLayerData, ...data };
            });
            return dataLayerData;
        }
        /**
         * Checks if consent is denied
         * @returns boolean value
         */
        static isConsentOptedIn() {
            const consentValue = WebSDKStore.getFieldValue(USER_CONSENT);
            if (typeof consentValue === 'undefined') {
                return false;
            }
            return consentValue;
        }
        /**
         * Maps boolean consent value to string and returns the consent object
         * @returns UserConsent
         */
        static getUserConsent() {
            const consentValue = WebSDKStore.getFieldValue(USER_CONSENT);
            if (typeof consentValue === 'undefined') {
                return undefined;
            }
            else {
                return {
                    dataUsePurpose: consentValue ? USER_OPTS_IN_TO_TRACKING : USER_OPTS_OUT_OF_TRACKING,
                };
            }
        }
        /**
         * Sets consent
         * @param experienceInteractionData
         */
        static setConsent(experienceInteractionData) {
            const consentValue = experienceInteractionData.value;
            WebSDKStore.updateFieldValue(USER_CONSENT, consentValue);
            if (consentValue) {
                // If user has opted in for data collection, drop the identity cookie
                this.addIdentityCookieIfNotPresent();
            }
            else {
                // If user has opted out from data collection, remove the identity cookie
                IdentityCookie.removeIdentityCookie();
            }
        }
        /**
         * Add identity cookie if not present
         */
        static addIdentityCookieIfNotPresent() {
            // Check if cookie already exists
            const anonymousId = IdentityCookie.getIdentityCookieValue();
            if (!anonymousId) {
                // Update cookie
                IdentityCookie.setIdentityCookie();
            }
        }
        /**
         * Sets anonymous id
         * @param experienceInteractionData
         */
        static setAnonymousIdFromGuestUUID(experienceInteractionData) {
            const guestUuid = experienceInteractionData.guestUuid;
            WebSDKStore.updateFieldValue(GUEST_UUID, guestUuid);
        }
        /**
         * Finds closest non contextual data layer content
         * @param target event target
         * @returns data layer object
         */
        static closestNonContextualDataLayerContent(target) {
            let closestDataLayer = {};
            if (target instanceof HTMLElement) {
                while ((target === null || target === void 0 ? void 0 : target.parentElement) !== document.documentElement) {
                    const parent = target.parentElement;
                    // Select the data layer script element if it exists
                    const dataLayerScriptElement = document.querySelector("script[type='application/json][data-provider-type]");
                    // Contextual data layers are default added to each event sent to data cloud.
                    // We are looking for data providers that are non-contextual.
                    if (dataLayerScriptElement &&
                        !CONTEXTUAL_DATA_PROVIDER_TYPES.includes(dataLayerScriptElement.dataset.dataProviderType)) {
                        // Found the closest data layer
                        closestDataLayer = JSON.parse(dataLayerScriptElement.textContent);
                        break;
                    }
                    target = parent;
                }
            }
            return closestDataLayer;
        }
        /**
         * Finds the data layer traversing recursively till the root
         * @param target
         * @returns data layer content based on provider type or null
         */
        static getDataFromDataLayerRecursively(target, providerType) {
            let dataLayerData;
            if (target) {
                let element = target;
                while (element && element !== document.documentElement) {
                    const dataLayerElement = element.querySelector(`:scope > experience-data-layer-object`);
                    if (dataLayerElement) {
                        const dataLayerContentOfProviderType = dataLayerElement.querySelector(`[data-provider-type="${providerType}"]`);
                        if (dataLayerContentOfProviderType) {
                            dataLayerData = JSON.parse(dataLayerContentOfProviderType.textContent.replace(/\s/g, ''));
                        }
                    }
                    element = element.parentElement;
                }
            }
            return dataLayerData;
        }
        /**
         * Retrieves data layer content of a provider type by traversing till root
         * This method is used for only personalization and searchResult provider types
         * @param target
         * @param type
         * @returns dataLayer data
         */
        static getDataFromDataByTraversingHierarchically(target, type) {
            let dataLayerData;
            if (target instanceof HTMLElement) {
                dataLayerData = this.getDataFromDataLayerRecursively(target, type);
            }
            return dataLayerData;
        }
        /**
         * Reset WebSDKStore. Only used for unit testing.
         */
        static resetWebSDKStore() {
            WebSDKStore.deleteValues();
        }
    }

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * Perf Logger class for EC Tag Manager
     */
    class ECTagManagerPerfLogger {
        /**
         * Enable perf logging
         * @param value boolean
         */
        static enablePerfLogging(value) {
            this._perfLoggingEnabled = value;
            if (value === false) {
                this.clearMarks([
                    PERF_BASE_PROCESSING_START,
                    PERF_BASE_PROCESSING_END,
                    PERF_ALL_PROCESSING_END,
                    `${PERF_DISPATCHER_START}_O11Y`,
                    `${PERF_DISPATCHER_START}_DataCloud`,
                    `${PERF_DISPATCHER_END}_O11Y`,
                    `${PERF_DISPATCHER_END}_DataCloud`,
                ]);
                this.clearMeasures([
                    PERF_MEASURE_DURATION_BASE,
                    PERF_MEASURE_DURATION_TOTAL,
                    `${PERF_MEASURE_DURATION_DISPATCHER}_O11Y`,
                    `${PERF_MEASURE_DURATION_DISPATCHER}_DataCloud`,
                ]);
            }
        }
        /**
         * Disable perf logging
         * @param value boolean
         */
        static mark(name, config) {
            if (this._perfLoggingEnabled) {
                performance.mark(name, config);
            }
        }
        /**
         * Clear a marker
         * @param name string
         */
        static clearMarks(marks) {
            if (this._perfLoggingEnabled) {
                for (const markName of marks) {
                    performance.clearMarks(markName);
                }
            }
        }
        /**
         * Clear a measure
         * @param name string
         */
        static clearMeasures(measures) {
            if (this._perfLoggingEnabled) {
                for (const measureName of measures) {
                    performance.clearMeasures(measureName);
                }
            }
        }
        /**
         * Calculates duration between perf markers
         * @param markers marker array
         */
        static calculateDuration(markers, logLine) {
            if (this._perfLoggingEnabled) {
                const [durationMarker, ...rest] = markers;
                const evtProcessingMeasure = performance.measure(durationMarker, ...rest);
                console.log(`${logLine}: ${evtProcessingMeasure.duration} millisecond`);
            }
        }
    }
    ECTagManagerPerfLogger._perfLoggingEnabled = false;

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class CustomEventHandler {
        /**
         * Pass the event to dispatcher for further processing
         * @param eventData
         * @returns
         */
        static sendEventToDispatcher(event) {
            var _a, _b;
            const { target, detail } = event;
            const interactions = Array.isArray(detail) ? detail : [detail];
            const interactionEvent = {
                interactions,
                component: EventHandlerUtils.getDataAttributeFromClosestElement(target, COMPONENT_ID_ATTRIBUTE_SELECTOR, COMPONENT_ID_DATA_ATTRIBUTE),
                site: EventHandlerUtils.getDataFromDataLayerByDataProviderType(DATA_PROVIDER_TYPE_SITE),
                userAgent: EventHandlerUtils.parseUserAgent(),
                screenInfo: EventHandlerUtils.getScreenResolution(),
                personalization: EventHandlerUtils.getDataFromDataByTraversingHierarchically(target, DATA_PROVIDER_TYPE_PERSONALIZATION),
                searchResult: EventHandlerUtils.getDataFromDataByTraversingHierarchically(target, DATA_PROVIDER_TYPE_SEARCH_RESULT),
                catalogObjects: EventHandlerUtils.getDataAttributeFromClosestElement(target, PERSONALIZATION_CONTENT_ID_ATTRIBUTE_SELECTOR, PERSONALIZATION_CONTENT_ID_DATA_ATTRIBUTE),
                deviceIdentifier: {
                    // read guest id from cookie, to be used in dispatchers
                    deviceId: IdentityCookie.getIdentityCookieValue(),
                },
                // only for internal telemetry use
                guestUUID: WebSDKStore.getFieldValue(GUEST_UUID),
            };
            EventHandlerUtils.addUserDataToInteractionEvent(interactionEvent, EventHandlerUtils.getDataFromDataLayerByDataProviderType(DATA_PROVIDER_TYPE_USER));
            EventHandlerUtils.addSourceDataToInteractionEvent(interactionEvent, EventHandlerUtils.getDataFromDataLayerByDataProviderType(DATA_PROVIDER_TYPE_PAGE));
            // If there are multiple interactions, they should all be having the same metadata dispatcher name
            // Picking the dispatcher name from the first interaction's metadata
            const interactionMetadata = (_a = interactions[0]) === null || _a === void 0 ? void 0 : _a.metadata;
            const dispatcherNamesFromMetadata = (interactionMetadata === null || interactionMetadata === void 0 ? void 0 : interactionMetadata.dispatcherNames) || [ALL_REGISTERED_DISPATCHERS];
            ECTagManagerPerfLogger.mark(PERF_BASE_PROCESSING_END, {
                detail: `base sdk processing ended at ${performance.now()}`,
            });
            ECTagManagerPerfLogger.calculateDuration([PERF_MEASURE_DURATION_BASE, PERF_BASE_PROCESSING_START, PERF_BASE_PROCESSING_END], 'Total base SDK processing time is');
            (_b = window.ECEngmtEvtDispatchers) === null || _b === void 0 ? void 0 : _b.forEach(({ dispatcher, dispatcherName }) => {
                // If dispatcherNamesFromMetadata array has 'All' in it, then send the event to all dispatchers
                if (dispatcherNamesFromMetadata.includes(ALL_REGISTERED_DISPATCHERS)) {
                    ECTagManagerPerfLogger.mark(`${PERF_DISPATCHER_START}_${dispatcherName}`, {
                        detail: `dispatcher ${dispatcherName} processing started at ${performance.now()}`,
                    });
                    WebSDKLogger.log(`Payload for Dispatcher ${dispatcherName} is ${JSON.stringify(interactionEvent)}`);
                    dispatcher.send(interactionEvent, EventHandlerUtils.getUserConsent());
                    ECTagManagerPerfLogger.mark(`${PERF_DISPATCHER_END}_${dispatcherName}`, {
                        detail: `dispatcher ${dispatcherName} processing ended at ${performance.now()}`,
                    });
                    ECTagManagerPerfLogger.calculateDuration([
                        `${PERF_MEASURE_DURATION_DISPATCHER}_${dispatcherName}`,
                        `${PERF_DISPATCHER_START}_${dispatcherName}`,
                        `${PERF_DISPATCHER_END}_${dispatcherName}`,
                    ], `Total processing time for ${dispatcherName}`);
                }
                else if (dispatcherNamesFromMetadata.includes(dispatcherName)) {
                    ECTagManagerPerfLogger.mark(`${PERF_DISPATCHER_START}_${dispatcherName}`, {
                        detail: `dispatcher ${dispatcherName} processing started at ${performance.now()}`,
                    });
                    WebSDKLogger.log(`Payload for Dispatcher ${dispatcherName} is ${JSON.stringify(interactionEvent)}`);
                    dispatcher.send(interactionEvent, EventHandlerUtils.getUserConsent());
                    ECTagManagerPerfLogger.mark(`${PERF_DISPATCHER_END}_${dispatcherName}`, {
                        detail: `dispatcher ${dispatcherName} processing ended at ${performance.now()}`,
                    });
                    ECTagManagerPerfLogger.calculateDuration([
                        `${PERF_MEASURE_DURATION_DISPATCHER}_${dispatcherName}`,
                        `${PERF_DISPATCHER_START}_${dispatcherName}`,
                        `${PERF_DISPATCHER_END}_${dispatcherName}`,
                    ], `Total processing time for ${dispatcherName}`);
                }
                else {
                    WebSDKLogger.log(`Interaction event is not to be sent for this dispatcher ${dispatcherName}`);
                }
            });
        }
        /**
         * Checks if all interaction events has name property or not
         * @param event CustomEvent<ExperienceInteractionDetails>
         * @returns boolean
         */
        static isValidCustomEvent(event) {
            var _a;
            let result = false;
            if (Array.isArray(event === null || event === void 0 ? void 0 : event.detail)) {
                result = event === null || event === void 0 ? void 0 : event.detail.some((eventDetail) => {
                    return eventDetail === null || eventDetail === void 0 ? void 0 : eventDetail.name;
                });
            }
            else {
                result = !!((_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.name);
            }
            return result;
        }
        /**
         * Event handler for experience_interaction events
         * @param event
         * @returns
         */
        static handleEvent(event) {
            if (this.isValidCustomEvent(event)) {
                try {
                    const { detail: interactionDetails } = event;
                    if (!Array.isArray(interactionDetails)) {
                        const { name: interactionName } = interactionDetails;
                        if (interactionName === EVENT_SET_CONSENT) {
                            EventHandlerUtils.setConsent(interactionDetails);
                            return;
                        }
                        else if (interactionName === EVENT_SET_GUEST_GUID) {
                            EventHandlerUtils.setAnonymousIdFromGuestUUID(interactionDetails);
                            return;
                        }
                        else if (interactionName === EVENT_SET_COOKIE_DOMAIN) {
                            CookieManager.setDomain(interactionDetails.domain);
                            return;
                        }
                    }
                    if (EventHandlerUtils.isConsentOptedIn()) {
                        // Add identity cookie if not present as user has given consent for data collection
                        EventHandlerUtils.addIdentityCookieIfNotPresent();
                    }
                    ECTagManagerPerfLogger.mark(PERF_BASE_PROCESSING_START, {
                        detail: `base sdk processing started at ${performance.now()}`,
                    });
                    this.sendEventToDispatcher(event);
                    ECTagManagerPerfLogger.mark(PERF_ALL_PROCESSING_END, {
                        detail: `all processing ended at ${performance.now()}`,
                    });
                    ECTagManagerPerfLogger.calculateDuration([PERF_MEASURE_DURATION_TOTAL, PERF_BASE_PROCESSING_START, PERF_ALL_PROCESSING_END], 'Total execution time is');
                }
                catch (e) {
                    WebSDKLogger.error(e.message);
                }
            }
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class DOMEventHandler {
        /**
         * Returns target element
         * @param event Event
         * @returns HTMLElement
         */
        static getTarget(event) {
            let target = event
                .composedPath()
                .find((el) => {
                var _a, _b, _c;
                return el instanceof HTMLElement &&
                    (((_a = el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'button' ||
                        ((_b = el.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'a' ||
                        ((_c = el.tagName) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === 'input');
            });
            if (!target) {
                target = event.composedPath()[0];
            }
            return target;
        }
        /**
         * Checks if the target element is a button or anchor
         * @param event Event
         * @returns true or false
         */
        static isTargetAButtonOrAnchor(event) {
            let status = false;
            const target = this.getTarget(event);
            if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
                status = true;
            }
            else if (target instanceof HTMLInputElement) {
                const inputType = target.getAttribute('type');
                if (inputType === INPUT_TYPE_SUBMIT || inputType === INPUT_TYPE_RESET || inputType === INPUT_TYPE_BUTTON) {
                    status = true;
                }
            }
            return status;
        }
        static isEngagementIgnoreDataAttributeSet(event) {
            const target = this.getTarget(event);
            return typeof target.dataset.sfdcEngagementIgnore !== 'undefined';
        }
        /**
         * Handles all DOM click events from button or anchor elements
         * @param event
         * @returns
         */
        static handleEvent(event) {
            var _a, _b, _c;
            if (((_b = (_a = window.expTagMgrConfig) === null || _a === void 0 ? void 0 : _a.dataCloud) === null || _b === void 0 ? void 0 : _b.ignoreDefaultEvents) ||
                this.isEngagementIgnoreDataAttributeSet(event) ||
                !this.isTargetAButtonOrAnchor(event)) {
                return;
            }
            if (EventHandlerUtils.isConsentOptedIn()) {
                // Add identity cookie if not present as user has given consent for data collection
                EventHandlerUtils.addIdentityCookieIfNotPresent();
            }
            // Fetching event's target using composedPath to handle shadow DOM scenario
            // event.target for components in shadow DOM will not return actual target component
            const target = this.getTarget(event);
            let interactionDetails;
            try {
                if (target instanceof HTMLAnchorElement) {
                    interactionDetails = {
                        name: EVENT_ANCHOR_CLICK,
                        linkHref: target.getAttribute('href'),
                        attributes: {
                            linkId: target.getAttribute('id'),
                            linkRel: target.getAttribute('rel'),
                            linkTarget: target.getAttribute('target'),
                            linkReferrerPolicy: target.getAttribute('referrerPolicy'),
                            linkLabel: target.textContent,
                        },
                    };
                }
                else if (target instanceof HTMLButtonElement) {
                    interactionDetails = {
                        name: EVENT_BUTTON_CLICK,
                        attributes: {
                            buttonId: target.getAttribute('id'),
                            buttonLabel: target.textContent,
                            buttonType: target.getAttribute('type'),
                        },
                    };
                }
                else {
                    // HTML Input Element
                    interactionDetails = {
                        name: `input-type-${target.getAttribute('type')}-click`,
                        attributes: {
                            buttonId: target.getAttribute('id'),
                            buttonLabel: target.getAttribute('value'),
                            buttonType: target.getAttribute('type'),
                        },
                    };
                }
                // Find closest first data layer content
                const { name, attributes, ...rest } = interactionDetails;
                const interactionEvent = {
                    interactions: [
                        {
                            name,
                            ...rest,
                            ...attributes,
                            eventType: DLO_USER_ENGAGEMENT,
                        },
                    ],
                    component: EventHandlerUtils.getDataAttributeFromClosestElement(event.target, COMPONENT_ID_ATTRIBUTE_SELECTOR, COMPONENT_ID_DATA_ATTRIBUTE),
                    site: EventHandlerUtils.getDataFromDataLayerByDataProviderType(DATA_PROVIDER_TYPE_SITE),
                    userDefined: EventHandlerUtils.closestNonContextualDataLayerContent(event.target),
                    userAgent: EventHandlerUtils.parseUserAgent(),
                    screenInfo: EventHandlerUtils.getScreenResolution(),
                    deviceIdentifier: {
                        // read guest id from cookie, to be used in dispatchers
                        deviceId: IdentityCookie.getIdentityCookieValue(),
                    },
                    // only for internal telemetry use
                    guestUUID: WebSDKStore.getFieldValue(GUEST_UUID),
                };
                EventHandlerUtils.addUserDataToInteractionEvent(interactionEvent, EventHandlerUtils.getDataFromDataLayerByDataProviderType(DATA_PROVIDER_TYPE_USER));
                EventHandlerUtils.addSourceDataToInteractionEvent(interactionEvent, EventHandlerUtils.getDataFromDataLayerByDataProviderType(DATA_PROVIDER_TYPE_PAGE));
                (_c = window.ECEngmtEvtDispatchers) === null || _c === void 0 ? void 0 : _c.forEach(({ dispatcher }) => {
                    dispatcher.send(interactionEvent, EventHandlerUtils.getUserConsent());
                });
            }
            catch (e) {
                WebSDKLogger.error(e.message);
            }
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    var _a, _b, _c, _d, _e;
    /**
     * Enables/disables debug statements
     * @param value boolean to enable/disable debug statements
     */
    const enableDebugStatements = (value = true) => {
        WebSDKLogger.enableDebug(value);
    };
    /**
     * Enables/disables perf timings
     * @param value boolean to enable/disable perf logging
     */
    const enablePerfLogging = (value = true) => {
        ECTagManagerPerfLogger.enablePerfLogging(value);
    };
    /**
     * Returns the device id used for web tracking
     * @returns deviceId or guestId
     */
    const getAnonymousId = () => {
        return IdentityCookie.getIdentityCookieValue();
    };
    /**
     * Triggers an event handler based on type of event
     * @param events
     */
    const experienceInteractionEventHandler = (events) => {
        events.forEach((event) => {
            if (event instanceof Event) {
                if (event instanceof CustomEvent) {
                    CustomEventHandler.handleEvent(event);
                }
                else {
                    DOMEventHandler.handleEvent(event);
                }
            }
            else {
                WebSDKLogger.log(`EC_WEB_SDK: Not an event`);
            }
        });
    };
    /**
     * Subscriber for DataLayer events
     */
    class DataLayerEventsSubscriber {
        next(events) {
            experienceInteractionEventHandler(events);
        }
        error(error) {
            WebSDKLogger.error(`Received error from dataLayer events queue ${error.message}`);
        }
    }
    // dataLayerEvents is a queue which listens to experience_interaction events and
    // click events(buttons and anchor tags) and inform its subscribers when an
    // event arrives. It also stores all the events until a subscriber is registered.
    // Subscribe to dataLayerEvents.
    (_a = window.dataLayerEvents) === null || _a === void 0 ? void 0 : _a.subscribe(new DataLayerEventsSubscriber());
    // Emit all the events already stored in dataLayerEvents queue.
    // As webSDK script is loaded async, it would not receive all the events which were raised before
    // the script is loaded. Hence, instruct dataLayerEvents to emit all of them.
    if (((_b = window.ECEngmtEvtDispatchers) === null || _b === void 0 ? void 0 : _b.length) === ((_c = window.expTagMgrConfig) === null || _c === void 0 ? void 0 : _c.dispatcherCount)) {
        (_d = window.dataLayerEvents) === null || _d === void 0 ? void 0 : _d.emitEvents();
        WebSDKLogger.log(`Emitting data layer events as all the required dispatchers loaded, count = ${(_e = window.expTagMgrConfig) === null || _e === void 0 ? void 0 : _e.dispatcherCount}`);
    }
    else {
        const timer = setInterval(() => {
            var _a, _b, _c, _d, _e, _f;
            if (((_a = window.ECEngmtEvtDispatchers) === null || _a === void 0 ? void 0 : _a.length) === ((_b = window.expTagMgrConfig) === null || _b === void 0 ? void 0 : _b.dispatcherCount)) {
                (_c = window.dataLayerEvents) === null || _c === void 0 ? void 0 : _c.emitEvents();
                WebSDKLogger.log(`Emitting data layer events as all the required dispatchers loaded, count = ${(_d = window.expTagMgrConfig) === null || _d === void 0 ? void 0 : _d.dispatcherCount} after an interval of 100ms`);
                clearInterval(timer);
            }
            else {
                WebSDKLogger.log(`Required no of dispatcher has not loaded, required count = ${(_e = window.expTagMgrConfig) === null || _e === void 0 ? void 0 : _e.dispatcherCount}, current dispatcher count ${(_f = window.ECEngmtEvtDispatchers) === null || _f === void 0 ? void 0 : _f.length}`);
            }
        }, 100);
    }

    exports.enableDebugStatements = enableDebugStatements;
    exports.enablePerfLogging = enablePerfLogging;
    exports.getAnonymousId = getAnonymousId;

    return exports;

})({});
