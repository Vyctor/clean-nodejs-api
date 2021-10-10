import { Request, Response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.post('/test_content_type', (req: Request, res: Response) => {
      res.send('')
    })

    await request(app)
      .post('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    app.post('/test_content_type_xml', (req: Request, res: Response) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .post('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
