'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = isHex;

var _string = _interopRequireDefault(require('./string'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const HEX_REGEX = /^0x[a-fA-F0-9]+$/;
/**
 * @name isHex
 * @summary Tests for a hex string.
 * @description
 * Checks to see if the input value is a `0x` prefixed hex string. Optionally (`bitLength` !== -1) checks to see if the bitLength is correct.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isHex } from '@chainx/util';
 *
 * isHex('0x1234'); // => true
 * isHex('0x1234', 8); // => false
 * ```
 */

function isHex(value) {
  let bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  let ignoreLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const isValidHex = value === '0x' || ((0, _string.default)(value) && HEX_REGEX.test(value.toString()));

  if (isValidHex && bitLength !== -1) {
    return value.length === 2 + Math.ceil(bitLength / 4);
  }

  return isValidHex && (ignoreLength || value.length % 2 === 0);
}
