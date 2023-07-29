/**
 * Checks if an element of the provided array contains the target string
 * @param arr Array of string to check
 * @param target String to look for
 * @returns String, a matching element in the provided array
 */
export function elementContained(
  arr: string[],
  target: string,
): string | undefined {
  for (const elem of arr) {
    if (target.includes(elem)) return elem;
  }
}
