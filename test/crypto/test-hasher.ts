import { Hasher } from '@/app/crypto/hasher';

export class TestHasher implements Hasher {
  async hash(plain: string) {
    return plain.concat('_hashed');
  }

  async compare(plain: string, hash: string) {
    return plain.concat('_hashed') === hash;
  }
}
