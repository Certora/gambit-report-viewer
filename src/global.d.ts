/// <reference types="vite/client" />

import { Context } from 'react';

import { ReadableAtom } from 'nanostores';

export {};

declare global {
  /**
   * Global helpers
   */
  type IStoreValue<T> = T extends ReadableAtom<infer U> ? U : T;
  type IContextValue<T> = T extends Context<infer U> ? U : T;
}
