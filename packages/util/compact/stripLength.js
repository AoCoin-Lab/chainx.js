'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = compactStripLength;

var _defaults = require('./defaults');

var _fromU8a = _interopRequireDefault(require('./fromU8a'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name compactStripLength
 * @description Removes the length prefix, returning both the total length (including the value + compact encoding) and the decoded value with the correct length
 * @example
 * <BR>
 *
 * ```javascript
 * import { compactStripLength } from '@chainx/util';
 *
 * console.log(compactStripLength(new Uint8Array([2 << 2, 0xde, 0xad]))); // [2, Uint8Array[0xde, 0xad]]
 * ```
 */
function compactStripLength(input) {
  let bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults.DEFAULT_BITLENGTH;
  const [offset, length] = (0, _fromU8a.default)(input, bitLength);
  const total = offset + length.toNumber();
  return [total, input.subarray(offset, total)];
}
