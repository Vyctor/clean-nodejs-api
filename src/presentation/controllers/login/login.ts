import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParamError } from '../../errors'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }

    if (!password) {
      return await Promise.resolve(
        badRequest(new MissingParamError('password'))
      )
    }

    const emailIsValid = this.emailValidator.isValid(email)

    if (!emailIsValid) {
      return await Promise.resolve(
        badRequest(new InvalidParamError('email'))
      )
    }
  }
}
