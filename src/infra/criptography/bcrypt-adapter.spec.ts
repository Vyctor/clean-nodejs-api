import bcryptjs from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcryptjs, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()

    const hashedData = await sut.encrypt('any_value')
    expect(hashedData).toBe('hashed_password')
  })

  test('Should throw if Bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcryptjs, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
