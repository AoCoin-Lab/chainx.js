'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = xxhash64AsHex;

var _util = require('@chainx/util');

var _asRaw = _interopRequireDefault(require('./asRaw'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name xxhash64AsHex
 * @summary Creates a xxhash hex from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { xxhash64AsHex } from '@chainx/util-crypto';
 *
 * xxhash64AsHex('abcd', 0xabcd)); // => 0xe29f70f8b8c96df7
 * ```
 */
function xxhash64AsHex(data, seed) {
  return (0, _util.hexAddPrefix)((0, _asRaw.default)(data, seed));
}
