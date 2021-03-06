'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'xxhash64AsBn', {
  enumerable: true,
  get: function get() {
    return _asBn.default;
  },
});
Object.defineProperty(exports, 'xxhash64AsHex', {
  enumerable: true,
  get: function get() {
    return _asHex.default;
  },
});
Object.defineProperty(exports, 'xxhash64AsRaw', {
  enumerable: true,
  get: function get() {
    return _asRaw.default;
  },
});

var _asBn = _interopRequireDefault(require('./asBn'));

var _asHex = _interopRequireDefault(require('./asHex'));

var _asRaw = _interopRequireDefault(require('./asRaw'));
