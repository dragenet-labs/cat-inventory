import { breakpoints } from '../Theme';

type Devices = typeof breakpoints;

export const devices: Devices = Object.entries(breakpoints).reduce(
  (acc, [key, val]) => ({ ...acc, [key]: `screen and (min-width: ${val})` }),
  {} as Devices
);
