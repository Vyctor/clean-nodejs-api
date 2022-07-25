import { Validation } from './validation'
import { MissingParamError } from '../../errors/missing-param-error'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
