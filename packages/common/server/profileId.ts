import { createHash } from './crypto';

interface GenerateDeviceIdOptions {

  ua: string;
  ip: string;
  origin: string;
}

export function generateDeviceId({
  ua,
  ip,
  origin,
}: GenerateDeviceIdOptions) {
  return createHash(`${ua}:${ip}:${origin}`, 16);
}
