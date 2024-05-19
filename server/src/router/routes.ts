import { FastifyInstance } from 'fastify'
import { CreatePollsController } from '../controller/createPollsController'
import { GetPollController } from '../controller/getEventController'

export async function pollsRoutes(app: FastifyInstance) {
  app.post('/polls', CreatePollsController)
  app.get('/polls/:pollId', GetPollController)
}