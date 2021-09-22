
import bcryptjs from 'bcryptjs'

import { Encrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hashedData = await bcryptjs.hash(value, this.salt)
    return hashedData
  }
}
