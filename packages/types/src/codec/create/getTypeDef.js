// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { TypeDefInfo } from './types';
import { assert } from '@chainx/util';
import sanitize from './sanitize';
import { typeSplit } from './typeSplit';
// decode an enum of either of the following forms
//  { _enum: ['A', 'B', 'C'] }
//  { _enum: { A: AccountId, B: Balance, C: u32 } }
function _decodeEnum(value, details) {
  value.info = TypeDefInfo.Enum;
  // not as pretty, but remain compatible with oo7 for both struct and Array types
  value.sub = Array.isArray(details)
    ? details.map(name => ({
        info: TypeDefInfo.Plain,
        name,
        type: 'Null',
      }))
    : Object.entries(details).map(([name, type]) =>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getTypeDef(type || 'Null', { name })
      );
  return value;
}
// decode a set of the form
//   { _set: { A: 0b0001, B: 0b0010, C: 0b0100 } }
function _decodeSet(value, details) {
  value.info = TypeDefInfo.Set;
  value.sub = Object.entries(details).map(([name, index]) => ({
    index,
    info: TypeDefInfo.Plain,
    name,
    type: name,
  }));
  return value;
}
// decode a struct, set or enum
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _decodeStruct(value, type, _) {
  const parsed = JSON.parse(type);
  const keys = Object.keys(parsed);
  if (keys.length === 1 && keys[0] === '_enum') {
    return _decodeEnum(value, parsed[keys[0]]);
  } else if (keys.length === 1 && keys[0] === '_set') {
    return _decodeSet(value, parsed[keys[0]]);
  }
  value.sub = keys.map(name =>
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getTypeDef(parsed[name], { name })
  );
  return value;
}
// decode a fixed vector, e.g. [u8;32]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _decodeFixedVec(value, type, _) {
  const [vecType, _vecLen] = type.substr(1, type.length - 2).split(';');
  const vecLen = parseInt(_vecLen.trim(), 10);
  // as a first round, only u8 via u8aFixed, we can add more support
  assert(vecLen <= 256, `${type}: Only support for [Type; <length>], where length <= 256`);
  value.ext = { length: vecLen, type: vecType };
  return value;
}
// decode a tuple
function _decodeTuple(value, _, subType) {
  value.sub = typeSplit(subType).map(inner =>
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getTypeDef(inner)
  );
  return value;
}
function hasWrapper(type, [start, end]) {
  if (type.substr(0, start.length) !== start) {
    return false;
  }
  assert(type.endsWith(end), `Expected '${start}' closing with '${end}'`);
  return true;
}
const nestedExtraction = [
  ['[', ']', TypeDefInfo.VecFixed, _decodeFixedVec],
  ['{', '}', TypeDefInfo.Struct, _decodeStruct],
  ['(', ')', TypeDefInfo.Tuple, _decodeTuple],
  // the inner for these are the same as tuple, multiple values
  ['BTreeMap<', '>', TypeDefInfo.BTreeMap, _decodeTuple],
  ['Result<', '>', TypeDefInfo.Result, _decodeTuple],
];
const wrappedExtraction = [
  ['Compact<', '>', TypeDefInfo.Compact],
  ['DoubleMap<', '>', TypeDefInfo.DoubleMap],
  ['Linkage<', '>', TypeDefInfo.Linkage],
  ['Option<', '>', TypeDefInfo.Option],
  ['Vec<', '>', TypeDefInfo.Vec],
];
function extractSubType(type, [start, end]) {
  return type.substr(start.length, type.length - start.length - end.length);
}
export function getTypeDef(_type, { name, displayName } = {}) {
  // create the type via Type, allowing types to be sanitized
  const type = sanitize(_type);
  const value = { info: TypeDefInfo.Plain, displayName, name, type };
  const nested = nestedExtraction.find(nested => hasWrapper(type, nested));
  if (nested) {
    value.info = nested[2];
    return nested[3](value, type, extractSubType(type, nested));
  }
  const wrapped = wrappedExtraction.find(wrapped => hasWrapper(type, wrapped));
  if (wrapped) {
    value.info = wrapped[2];
    value.sub = getTypeDef(extractSubType(type, wrapped));
  }
  return value;
}
