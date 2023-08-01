import { AVG_LIFESPAN } from "./constants";

/**
 * Calculates the time a person has left to live based on their birth year
 * @param birthYear Birth year
 * @returns Time left in ms
 */
export function getMsLeft(birthYear: number): number {
  return (
    new Date(birthYear, 0, 1).valueOf() +
    AVG_LIFESPAN * 60 * 60 * 24 * 365 * 1000 -
    Date.now()
  );
}

/**
 * Calculates the percentage of your life that you've used (WARNING: using this function might upset you)
 * @param birthYear Birth year
 * @returns Percent of life used
 */
export function getPercentUsed(birthYear: number): number {
  return (
    (Date.now() - new Date(birthYear, 0, 1).valueOf()) /
    (AVG_LIFESPAN * 60 * 60 * 24 * 365 * 1000)
  );
}
