import {
  HttpRequest,
  HttpResponse,
  Controller
} from '../../presentation/protocols'

class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await this.controller.handle(httpRequest)
  }
}

export { LogControllerDecorator }
