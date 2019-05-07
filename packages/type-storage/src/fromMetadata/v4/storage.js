// Copyright 2017-2019 @polkadot/storage authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import * as substrate from './substrate';
export const storage = {
  substrate, // Prefill storage with well known keys, as not returned by state_getMetadata
};
