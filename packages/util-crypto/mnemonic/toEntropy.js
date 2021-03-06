'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = toEntropy;

require('../polyfill');

var _bip = require('bip39');

var _util = require('@chainx/util');

var _wasmCrypto = require('@chainx/wasm-crypto');

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function toEntropy(mnemonic) {
  return (0, _wasmCrypto.isReady)()
    ? (0, _wasmCrypto.bip39ToEntropy)(mnemonic)
    : (0, _util.hexToU8a)((0, _util.hexAddPrefix)((0, _bip.mnemonicToEntropy)(mnemonic)));
}
