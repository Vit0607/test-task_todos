export const delay = <T>(value: T, ms: number): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
};
