import { Express, Router } from 'express'
import fastGlob from 'fast-glob'

export default async (app: Express): Promise<void> => {
  const router = Router()

  app.use('/api', router)

  fastGlob.sync('**/src/main/routes/**routes.ts').map(async file => {
    return (await import(`../../../${file}`)).default(router)
  })
}
