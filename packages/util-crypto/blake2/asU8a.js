'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = blake2AsU8a;

var _blakejs = _interopRequireDefault(require('blakejs'));

var _util = require('@chainx/util');

var _wasmCrypto = require('@chainx/wasm-crypto');

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name blake2AsU8a
 * @summary Creates a blake2b u8a from the input.
 * @description
 * From a `Uint8Array` input, create the blake2b and return the result as a u8a with the specified `bitLength`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { blake2AsU8a } from '@chainx/util-crypto';
 *
 * blake2AsU8a('abc'); // => [0xba, 0x80, 0xa53, 0xf98, 0x1c, 0x4d, 0x0d]
 * ```
 */
function blake2AsU8a(data) {
  let bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
  let key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const byteLength = Math.ceil(bitLength / 8);
  return (0, _wasmCrypto.isReady)()
    ? (0, _wasmCrypto.blake2b)((0, _util.u8aToU8a)(data), (0, _util.u8aToU8a)(key), byteLength)
    : _blakejs.default.blake2b(data, key, byteLength);
}
