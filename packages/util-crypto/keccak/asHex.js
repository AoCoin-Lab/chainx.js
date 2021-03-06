'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = keccakAsHex;

var _util = require('@chainx/util');

var _asU8a = _interopRequireDefault(require('./asU8a'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name keccakAsHex
 * @summary Creates a keccak hex string from the input.
 * @description
 * From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { keccakAsHex } from '@chainx/util-crypto';
 *
 * keccakAsHex('123'); // => 0x...
 * ```
 */
function keccakAsHex(value) {
  return (0, _util.u8aToHex)((0, _asU8a.default)(value));
}
