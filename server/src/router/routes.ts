import { FastifyInstance } from 'fastify'
import { CreatePollsController } from '../controller/createPollsController'
import { GetPollController } from '../controller/getPollsController'
import { VotePollsController } from '../controller/votePollsController'

export async function pollsRoutes(app: FastifyInstance) {
  app.post('/polls', CreatePollsController)
  app.get('/polls/:pollId', GetPollController)
  app.post('/polls/:pollId/votes', VotePollsController);

}