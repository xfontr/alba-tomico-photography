export const getDistance = (key: string): string => {
  const minLength = 4; // shortest key (max right shift)
  const maxLength = 12; // longest key (min right shift)
  const maxRight = 95; // for short keys
  const minRight = 45; // for long keys

  const length = Math.min(Math.max(key.length, minLength), maxLength);
  const ratio = (length - minLength) / (maxLength - minLength);
  const rightPercent = maxRight - ratio * (maxRight - minRight);

  return `-${rightPercent.toFixed(0)}%`;
};
