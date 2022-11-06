type WithErrorObject<E extends object = Error> = {
  reason: string;
  error?: E;
};

export { WithErrorObject };
