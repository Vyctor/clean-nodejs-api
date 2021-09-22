import bcryptjs from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcryptjs, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashedData = await sut.encrypt('any_value')
    expect(hashedData).toBe('hashed_password')
  })
})
