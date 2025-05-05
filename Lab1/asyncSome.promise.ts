export async function asyncSome<T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => Promise<boolean>,
  signal?: AbortSignal
): Promise<boolean> {
  for (let i = 0; i < arr.length; i++) {
    if (signal?.aborted) {
      throw new Error('Operation cancelled');
    }
    const result = await predicate(arr[i], i, arr);
    if (result) return true;
  }
  return false;
}

const controller = new AbortController();

asyncSome(
  [1, 2, 3, 4, 5],
  async (num) => {
    await new Promise(res => setTimeout(res, 50));
    return num === 3;
  },
  controller.signal,
).then(result => {
  console.log('Found:', result);
})
.catch(err => {
  console.error('Error:', err.message);
});

setTimeout(() => controller.abort(), 120);
