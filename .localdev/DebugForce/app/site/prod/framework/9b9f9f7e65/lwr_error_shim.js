/**
* Copyright (c) 2021, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: MIT
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
*/
/* LWR Error Shim v0.13.10 */
!function(){"use strict";const o=globalThis;if(!(o.LWR&&o.LWR.define)){const r=new Error("The LWR application failed to bootstrap");if(!o.LWR||!o.LWR.onError)throw r;o.LWR.onError(r)}}();
