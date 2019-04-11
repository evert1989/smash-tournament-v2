// @flow

// Utils
// ---------------------------------------------------------------------------------------------------------------------
export const digit = (): number => Math.round(Math.random() * 9);

export const generateID = (): string => `${Math.round(Date.now() * (Math.random() * 9999999 + 1))}`.substring(0, 16);

// eslint-disable-next-line no-bitwise
export const getNearestPowerOf2 = (n: number): number => (n <= 0 ? 0 : 1 << 31 - Math.clz32(n));
