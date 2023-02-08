export function truthy<T>(val: T | null | undefined | false | void): T {
  if (val === void 0 || val === false || val === null) {
    throw new Error('Cannot be falsy');
  }
  return val;
}
