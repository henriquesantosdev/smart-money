import { HashingServiceProtocol } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptService extends HashingServiceProtocol {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const passwordHash = bcrypt.hash(password, salt);
    return passwordHash;
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    const comparePassword = await bcrypt.compare(password, passwordHash);
    return comparePassword;
  }
}
