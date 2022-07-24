import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      return response
        .status(httpResponse.statusCode)
        .send(httpResponse.body)
    } else {
      return response.status(httpResponse.statusCode).send({
        error: httpResponse.body.message
      })
    }
  }
}
