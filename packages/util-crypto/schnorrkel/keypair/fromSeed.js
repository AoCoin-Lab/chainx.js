'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = schnorrkelKeypairFromSeed;

require('../../polyfill');

var _wasmCrypto = require('@chainx/wasm-crypto');

var _fromU8a = _interopRequireDefault(require('./fromU8a'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name schnorrkelKeypairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
function schnorrkelKeypairFromSeed(seed) {
  return (0, _fromU8a.default)((0, _wasmCrypto.sr25519KeypairFromSeed)(seed));
}
