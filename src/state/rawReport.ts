import { MutantResults } from './transformReport';

import { atom } from 'nanostores';

export const reportStore = atom<MutantResults | void>();
