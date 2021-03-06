'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = keccakAsU8a;

var _jsSha = _interopRequireDefault(require('js-sha3'));

var _util = require('@chainx/util');

var _wasmCrypto = require('@chainx/wasm-crypto');

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name keccakAsU8a
 * @summary Creates a keccak Uint8Array from the input.
 * @description
 * From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { keccakAsU8a } from '@chainx/util-crypto';
 *
 * keccakAsU8a('123'); // => Uint8Array
 * ```
 */
function keccakAsU8a(value) {
  return (0, _wasmCrypto.isReady)()
    ? (0, _wasmCrypto.keccak256)((0, _util.u8aToU8a)(value))
    : new Uint8Array(_jsSha.default.keccak256.update(value).arrayBuffer());
}
