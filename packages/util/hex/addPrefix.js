'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = hexAddPrefix;

var _hasPrefix = _interopRequireDefault(require('./hasPrefix'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name hexAddPrefix
 * @summary Adds the `0x` prefix to string values.
 * @description
 * Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexAddPrefix } from '@chainx/util';
 *
 * console.log('With prefix', hexAddPrefix('0a0b12')); // => 0x0a0b12
 * ```
 */
function hexAddPrefix(value) {
  if (value && (0, _hasPrefix.default)(value)) {
    return value;
  }

  const prefix = value && value.length % 2 === 1 ? '0' : '';
  return '0x'.concat(prefix).concat(value || '');
}
