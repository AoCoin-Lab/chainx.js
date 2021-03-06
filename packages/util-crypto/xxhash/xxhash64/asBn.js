'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = xxhash64AsBn;

var _bn = _interopRequireDefault(require('bn.js'));

var _asRaw = _interopRequireDefault(require('./asRaw'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name xxhash64AsBn
 * @summary Creates a xxhash BN from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.
 * @example
 * <BR>
 *
 * ```javascript
 * import { xxhash64AsNumber } from '@chainx/util-crypto';
 *
 * xxhash64AsBn('abcd', 0xabcd)); // => new BN(0xe29f70f8b8c96df7)
 * ```
 */
function xxhash64AsBn(data, seed) {
  return new _bn.default((0, _asRaw.default)(data, seed), 16);
}
