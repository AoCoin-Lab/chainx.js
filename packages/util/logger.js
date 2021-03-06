'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.format = format;
exports.default = logger;

var _chalk = _interopRequireDefault(require('chalk'));

var _moment = _interopRequireDefault(require('moment'));

var _bn = _interopRequireDefault(require('./is/bn'));

var _buffer = _interopRequireDefault(require('./is/buffer'));

var _function = _interopRequireDefault(require('./is/function'));

var _object = _interopRequireDefault(require('./is/object'));

var _u8a = _interopRequireDefault(require('./is/u8a'));

var _toHex = _interopRequireDefault(require('./u8a/toHex'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const logTo = {
  debug: 'log',
  error: 'error',
  log: 'log',
  warn: 'warn',
};
const chalked = {
  debug: _chalk.default.gray,
  error: _chalk.default.red,
  log: _chalk.default.reset,
  warn: _chalk.default.yellow,
};

function formatObject(value) {
  return Object.keys(value).reduce((result, key) => {
    result[key] = format(value[key]);
    return result;
  }, {});
}

function format(value) {
  if (Array.isArray(value)) {
    return value.map(format);
  }

  if ((0, _bn.default)(value)) {
    return value.toString();
  }

  if ((0, _buffer.default)(value)) {
    return '0x'.concat(value.toString('hex'));
  }

  if ((0, _u8a.default)(value)) {
    return (0, _toHex.default)(value);
  }

  if (value && (0, _object.default)(value) && value.constructor === Object) {
    return formatObject(value);
  }

  return value;
}

function apply(log, type, values) {
  if (values.length === 1 && (0, _function.default)(values[0])) {
    const fnResult = values[0]();
    return apply(log, type, Array.isArray(fnResult) ? fnResult : [fnResult]);
  }

  const chalk = value => chalked[log](value); // @ts-ignore Not sure how to coax TS here...

  console[logTo[log]].apply(
    console,
    [chalk((0, _moment.default)().format('YYYY-MM-DD HH:mm:ss')), chalk(type)].concat(values.map(format))
  );
}

function noop() {} // noop

/**
 * @name Logger
 * @summary Creates a consistent log interface for messages
 * @description
 * Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (controlled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.
 * @example
 * <BR>
 *
 * ```javascript
 * const l from '@chainx/util/logger')('test');
 *
 * l.log('blah'); // <date>     TEST: blah
 * ```
 */

function logger(_type) {
  const type = ''.concat(_type.toUpperCase(), ':').padStart(16);
  let isDebug;

  try {
    const isTest = process.env.NODE_ENV === 'test';
    const debugList = (process.env.DEBUG || '').split(',');
    isDebug = isTest || !!debugList.find(entry => _type.indexOf(entry) === 0);
  } catch (error) {
    isDebug = false;
  }

  return {
    debug: isDebug
      ? function() {
          for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
            values[_key] = arguments[_key];
          }

          return apply('debug', type, values);
        }
      : noop,
    error: function error() {
      for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        values[_key2] = arguments[_key2];
      }

      return apply('error', type, values);
    },
    log: function log() {
      for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        values[_key3] = arguments[_key3];
      }

      return apply('log', type, values);
    },
    noop,
    warn: function warn() {
      for (var _len4 = arguments.length, values = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        values[_key4] = arguments[_key4];
      }

      return apply('warn', type, values);
    },
  };
}
