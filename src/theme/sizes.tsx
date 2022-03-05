export enum MQSize {
  XS = 320,
  SM = 360,
  MD = 768,
  LG = 1024,
  XL = 1366,
}

export const MQ = (size: MQSize) => `@media (min-width: ${size}px`;
