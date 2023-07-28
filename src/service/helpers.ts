/**
 * Checks if an element of the provided array contains the target string
 * @param arr Array of string to check
 * @param target String to look for
 * @returns Boolean, whether or not an element of the provided array contains the target string
 */
export function elementContained(arr: string[], target: string): boolean {
  for (const elem of arr) {
    if (target.includes(elem)) return true;
  }
  return false;
}
