type WithoutId<O extends { id: unknown }> = Omit<O, 'id'>;

export { WithoutId };
