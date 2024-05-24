export function diffArrays(arr1: string[], arr2: string[]) {
  // Create a Set from the second array for efficient lookup
  const set2 = new Set(arr2);

  // Filter the first array to find items not present in the Set
  return arr1.filter((item) => !set2.has(item));
}
