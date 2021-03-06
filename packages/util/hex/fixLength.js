'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = hexFixLength;

var _addPrefix = _interopRequireDefault(require('./addPrefix'));

var _stripPrefix = _interopRequireDefault(require('./stripPrefix'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name hexFixLength
 * @summary Shifts a hex string to a specific bitLength
 * @description
 * Returns a `0x` prefixed string with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Values with more bits are trimmed to the specified length. Input values with less bits are returned as-is by default. When `withPadding` is set, shorter values are padded with `0`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexFixLength } from '@chainx/util';
 *
 * console.log('fixed', hexFixLength('0x12', 16)); // => 0x12
 * console.log('fixed', hexFixLength('0x12', 16, true)); // => 0x0012
 * console.log('fixed', hexFixLength('0x0012', 8)); // => 0x12
 * ```
 */
function hexFixLength(value) {
  let bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  let withPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const strLength = Math.ceil(bitLength / 4);
  const hexLength = strLength + 2;

  if (bitLength === -1 || value.length === hexLength || (!withPadding && value.length < hexLength)) {
    return (0, _addPrefix.default)((0, _stripPrefix.default)(value));
  }

  if (value.length > hexLength) {
    return (0, _addPrefix.default)((0, _stripPrefix.default)(value).slice(-1 * strLength));
  }

  return (0, _addPrefix.default)(
    ''
      .concat('0'.repeat(strLength))
      .concat((0, _stripPrefix.default)(value))
      .slice(-1 * strLength)
  );
}
