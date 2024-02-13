export type Payload = Record<string, unknown>;

export interface Encoder {
  encode(payload: Payload): Promise<string>;
}
