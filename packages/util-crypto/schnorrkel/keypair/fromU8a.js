'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = schnorrkelKeypairFromU8a;
// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const SEC_LEN = 64;
const PUB_LEN = 32;

function schnorrkelKeypairFromU8a(full) {
  return {
    publicKey: full.slice(SEC_LEN, SEC_LEN + PUB_LEN),
    secretKey: full.slice(0, SEC_LEN),
  };
}
