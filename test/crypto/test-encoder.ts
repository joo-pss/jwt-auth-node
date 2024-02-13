import { Encoder, Payload } from '@/app/crypto/encoder';

export class TestEncoder implements Encoder {
  async encode(payload: Payload) {
    return JSON.stringify(payload);
  }
}
