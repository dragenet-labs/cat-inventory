declare module 'kill-port' {
  export type Method = 'tcp' | 'udp';
  export default function kill(port: number | string, method?: Method): Promise;
}
