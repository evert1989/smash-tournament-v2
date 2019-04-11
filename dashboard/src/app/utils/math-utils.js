// @flow

// Utils
// ---------------------------------------------------------------------------------------------------------------------
export const getPowerOf2FromResult = (n: number): number => (n > 0 ? Math.round(Math.log(n) / Math.log(2)) : 0);

export const isEven = (n: number): boolean => n % 2 === 0;

export const isOdd = (n: number): boolean => Math.abs(n % 2) === 1;
