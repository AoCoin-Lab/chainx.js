'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = randomAsU8a;

var _tweetnacl = _interopRequireDefault(require('tweetnacl'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name randomAsU8a
 * @summary Creates a Uint8Array filled with random bytes.
 * @description
 * Returns a `Uint8Array` with the specified (optional) length filled with random bytes.
 * @example
 * <BR>
 *
 * ```javascript
 * import { randomAsU8a } from '@chainx/util-crypto';
 *
 * randomAsU8a(); // => Uint8Array([...])
 * ```
 */
function randomAsU8a() {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  return _tweetnacl.default.randomBytes(length);
}
