export function asyncSomeCallback<T>(
  arr: T[],
  predicate: (
    item: T,
    index: number,
    array: T[],
    callback: (err: Error | null, result?: boolean) => void
  ) => void,
  finalCallback: (err: Error | null, result?: boolean) => void,
  signal?: AbortSignal
) {
  let index = 0;
  const next = () => {
    if (signal?.aborted) {
      return finalCallback(new Error('Operation cancelled'));
    }
    if (index >= arr.length) {
      return finalCallback(null, false);
    }
    predicate(arr[index], index, arr, (err, result) => {
      if (err) return finalCallback(err);
      if (result) return finalCallback(null, true);
      index++;
      next();
    });
  };
  next();
}

const controller = new AbortController();

asyncSomeCallback(
  [10, 20, 30],
  (item, i, arr, callback) => {
    setTimeout(() => callback(null, item === 20), 100);
  },
  (err, result) => {
    if (err) {
      console.error('Cancelled or error:', err.message);
    } else {
      console.log('Found:', result);
    }
  },
  controller.signal
);

setTimeout(() => controller.abort(), 160);
