'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = naclKeypairFromSeed;

var _tweetnacl = _interopRequireDefault(require('tweetnacl'));

var _wasmCrypto = require('@chainx/wasm-crypto');

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name naclKeypairFromSeed
 * @summary Creates a new public/secret keypair from a seed.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclKeypairFromSeed } from '@chainx/util-crypto';
 *
 * naclKeypairFromSeed(...); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
function naclKeypairFromSeed(seed) {
  if ((0, _wasmCrypto.isReady)()) {
    const full = (0, _wasmCrypto.ed25519KeypairFromSeed)(seed);
    return {
      publicKey: full.slice(32),
      secretKey: full.slice(0, 64),
    };
  }

  return _tweetnacl.default.sign.keyPair.fromSeed(seed);
}
