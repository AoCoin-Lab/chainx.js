'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = deriveHard;

require('../polyfill');

var _wasmCrypto = require('@chainx/wasm-crypto');

var _fromU8a = _interopRequireDefault(require('./keypair/fromU8a'));

var _toU8a = _interopRequireDefault(require('./keypair/toU8a'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function deriveHard(keypair, chainCode) {
  return (0, _fromU8a.default)((0, _wasmCrypto.sr25519DeriveKeypairHard)((0, _toU8a.default)(keypair), chainCode));
}
