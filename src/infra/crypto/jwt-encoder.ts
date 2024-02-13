import { Encoder, Payload } from '@/app/crypto/encoder';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';

export class JwtEncoder implements Encoder {
  async encode(payload: Payload) {
    return sign(payload, env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }
}
