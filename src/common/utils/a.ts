export function flatFn(array: number[]) {
  return array.flat();
}

export function flatMap(array: number[]) {
  return array.flatMap((x) => [x * 2]);
}
