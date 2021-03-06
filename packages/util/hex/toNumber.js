'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = hexToNumber;

var _toBn = _interopRequireDefault(require('./toBn'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name hexToNumber
 * @summary Creates a Number value from a Buffer object.
 * @description
 * `null` inputs returns an NaN result, `hex` values return the actual value as a `Number`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToNumber } from '@chainx/util';
 *
 * hexToNumber('0x1234'); // => 0x1234
 * ```
 */
function hexToNumber(value) {
  if (!value) {
    return NaN;
  }

  return (0, _toBn.default)(value).toNumber();
}
