import { useState } from 'react';

import { nanoid } from 'nanoid';

export const simplifyString = (v: string) => v.trim().toLocaleLowerCase();

export const isQueryInArr = (arr: [string, ...string[]], query?: string) =>
  query ? arr.some((v) => simplifyString(v).includes(query)) : true;

export const useRandomId = () => {
  const [val] = useState('s' + nanoid());
  return val;
};
