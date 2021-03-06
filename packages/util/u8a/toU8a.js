'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = u8aToU8a;

var _buffer = _interopRequireDefault(require('../is/buffer'));

var _hex = _interopRequireDefault(require('../is/hex'));

var _string = _interopRequireDefault(require('../is/string'));

var _toU8a = _interopRequireDefault(require('../buffer/toU8a'));

var _toU8a2 = _interopRequireDefault(require('../hex/toU8a'));

var _toU8a3 = _interopRequireDefault(require('../string/toU8a'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name u8aToU8a
 * @summary Creates a Uint8Array value from a Uint8Array, Buffer, string or hex input.
 * @description
 * `null` ior `undefined` nputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToU8a } from '@chainx/util';
 *
 * u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
 * u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
 * ```
 */
function u8aToU8a(value) {
  if (!value) {
    return new Uint8Array();
  }

  if ((0, _buffer.default)(value)) {
    return (0, _toU8a.default)(value);
  }

  if ((0, _string.default)(value)) {
    return (0, _hex.default)(value) ? (0, _toU8a2.default)(value) : (0, _toU8a3.default)(value);
  }

  if (Array.isArray(value)) {
    return Uint8Array.from(value);
  }

  return value;
}
