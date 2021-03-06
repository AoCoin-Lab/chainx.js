// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
export var TypeDefInfo;
(function(TypeDefInfo) {
  TypeDefInfo[(TypeDefInfo['BTreeMap'] = 0)] = 'BTreeMap';
  TypeDefInfo[(TypeDefInfo['Compact'] = 1)] = 'Compact';
  TypeDefInfo[(TypeDefInfo['DoubleMap'] = 2)] = 'DoubleMap';
  TypeDefInfo[(TypeDefInfo['Enum'] = 3)] = 'Enum';
  TypeDefInfo[(TypeDefInfo['Linkage'] = 4)] = 'Linkage';
  TypeDefInfo[(TypeDefInfo['Option'] = 5)] = 'Option';
  TypeDefInfo[(TypeDefInfo['Plain'] = 6)] = 'Plain';
  TypeDefInfo[(TypeDefInfo['Result'] = 7)] = 'Result';
  TypeDefInfo[(TypeDefInfo['Set'] = 8)] = 'Set';
  TypeDefInfo[(TypeDefInfo['Struct'] = 9)] = 'Struct';
  TypeDefInfo[(TypeDefInfo['Tuple'] = 10)] = 'Tuple';
  TypeDefInfo[(TypeDefInfo['Vec'] = 11)] = 'Vec';
  TypeDefInfo[(TypeDefInfo['VecFixed'] = 12)] = 'VecFixed';
  // anything not fully supported (keep this as the last entry)
  TypeDefInfo[(TypeDefInfo['Null'] = 13)] = 'Null';
})(TypeDefInfo || (TypeDefInfo = {}));
export var MetaTypeInfo;
(function(MetaTypeInfo) {
  MetaTypeInfo[(MetaTypeInfo['BuiltinPlain'] = 0)] = 'BuiltinPlain';
  MetaTypeInfo[(MetaTypeInfo['BuiltinTuple'] = 1)] = 'BuiltinTuple';
  MetaTypeInfo[(MetaTypeInfo['BuiltinVec'] = 2)] = 'BuiltinVec';
  MetaTypeInfo[(MetaTypeInfo['BuiltinVecFixed'] = 3)] = 'BuiltinVecFixed';
  MetaTypeInfo[(MetaTypeInfo['Enum'] = 4)] = 'Enum';
  MetaTypeInfo[(MetaTypeInfo['ClikeEnum'] = 5)] = 'ClikeEnum';
  MetaTypeInfo[(MetaTypeInfo['Struct'] = 6)] = 'Struct';
  MetaTypeInfo[(MetaTypeInfo['TupleStruct'] = 7)] = 'TupleStruct';
  MetaTypeInfo[(MetaTypeInfo['Null'] = 8)] = 'Null';
})(MetaTypeInfo || (MetaTypeInfo = {}));
export var MetaRegistryItem;
(function(MetaRegistryItem) {
  MetaRegistryItem[(MetaRegistryItem['String'] = 0)] = 'String';
  MetaRegistryItem[(MetaRegistryItem['Type'] = 1)] = 'Type';
  MetaRegistryItem[(MetaRegistryItem['TypeDef'] = 2)] = 'TypeDef';
})(MetaRegistryItem || (MetaRegistryItem = {}));
