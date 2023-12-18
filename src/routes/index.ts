import express from 'express'
import authentication from './authentication'
import user from './users'
import { Request, Response } from 'express'

const router = express.Router()
/**
 * @route GET /
 * @description Welcome message and API information
 * @access Public
 */
router.get('/', (req: Request, res: Response) => {
   res.status(200).json({
      message: 'Welcome to the Node TypeScript Express Mongoose API!',
      version: '1.0.0',
      description:
         'This API serves as the backend for the Node TypeScript Express Mongoose Starter project. It is built with Node, Express, MongoDB, Mongoose, and TypeScript.',
      author: 'Sunny Sahsi',
      repository: 'https://github.com/sahsisunny/node-mongo-typescript-server',
      documentation:
         'https://github.com/sahsisunny/node-mongo-typescript-server/blob/master/README.md',
   })
})
export default (): express.Router => {
   authentication(router)
   user(router)
   return router
}
