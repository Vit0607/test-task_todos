export default function delay<T>(data: T, ms: number = 1000): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
}
