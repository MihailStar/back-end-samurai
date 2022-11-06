function throwError(reason: unknown): never {
  throw reason instanceof Error ? reason : new Error(String(reason));
}

export { throwError };
