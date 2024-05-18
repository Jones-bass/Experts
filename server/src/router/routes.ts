import { FastifyInstance } from 'fastify'
import { CreatePollsController } from '../controller/createPollsController'

export async function pollsRoutes(app: FastifyInstance) {
  app.post('/polls', CreatePollsController)
}