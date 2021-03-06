'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = randomAsHex;

var _util = require('@chainx/util');

var _asU8a = _interopRequireDefault(require('./asU8a'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name randomAsHex
 * @summary Creates a hex string filled with random bytes.
 * @description
 * Returns a hex string with the specified (optional) length filled with random bytes.
 * @example
 * <BR>
 *
 * ```javascript
 * import { randomAsHex } from '@chainx/util-crypto';
 *
 * randomAsHex(); // => 0x...
 * ```
 */
function randomAsHex() {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  return (0, _util.u8aToHex)((0, _asU8a.default)(length));
}
