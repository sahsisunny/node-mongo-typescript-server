import express from 'express'
import { authentication, randomString } from '../utils/authentication'
import {
   createUser,
   getUserByEmail,
   getUser,
   getUserBySessionToken,
} from '../models/user'

/**
 * Register a new user
 * @param req : username, email, password
 * @param res : message, user
 * @returns
 */
export const register = async (req: express.Request, res: express.Response) => {
   try {
      const { username, email, password } = req.body

      if (!username || !email || !password) {
         return res.sendStatus(400)
      }

      const existingEmail = await getUserByEmail(email)
      if (existingEmail) {
         return res.status(400).json({
            message: 'Email already exists',
         })
      }

      const salt = randomString()

      const user = await createUser({
         username,
         email,
         authentication: {
            password: authentication(password, salt),
            salt,
            sessionToken: randomString(),
         },
      })

      return res.status(200).json({
         message: 'User created successfully',
         user: {
            username: user.username,
            email: user.email,
         },
      })
   } catch (err) {
      console.error(err)
      return res.sendStatus(400)
   }
}

/**
 * Login a user
 * @param req : username, password
 * @param res : message, user
 * @returns
 */
export const login = async (req: express.Request, res: express.Response) => {
   try {
      const { username, password } = req.body

      if (!username || !password) {
         return res.sendStatus(400).json({
            message: 'Username or password is missing',
         })
      }

      const user = await getUser(username)
      if (!user) {
         return res.status(400).json({
            message: 'User does not exist',
         })
      }

      const expectedHash = authentication(password, user.authentication.salt)

      if (expectedHash !== user.authentication.password) {
         return res.status(400).json({
            message: 'Password is incorrect',
         })
      }

      const salt = randomString()
      user.authentication.sessionToken = authentication(
         salt,
         user.authentication.salt,
      )
      await user.save()

      res.cookie('MOONWALKER-AUTH', user.authentication.sessionToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.status(200).json({
         message: 'User logged in successfully',
         user: {
            username: user.username,
            email: user.email,
         },
      })
   } catch (err) {
      console.error(err)
      return res.sendStatus(400)
   }
}

/**
 * Logout a user
 * @param req : sessionToken
 * @param res : message
 * @returns
 */
export const logout = async (req: express.Request, res: express.Response) => {
   try {
      res.cookie('MOONWALKER-AUTH', '', {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.status(200).json({
         message: 'User logged out successfully',
      })
   } catch (err) {
      console.error(err)
      return res.sendStatus(400)
   }
}

/**
 * Get the current user
 * @param req : sessionToken
 * @param res : message, user
 * @returns
 */
export const self = async (req: express.Request, res: express.Response) => {
   try {
      const token = req.cookies['MOONWALKER-AUTH']

      if (!token) {
         return res.status(400).json({
            message: 'No session token',
         })
      }

      const user = await getUserBySessionToken(token)

      if (!user) {
         return res.status(400).json({
            message: 'User does not exist',
         })
      }

      return res.status(200).json({
         message: 'User found',
         user: {
            username: user.username,
            email: user.email,
         },
      })
   } catch (err) {
      console.error(err)
      return res.sendStatus(400)
   }
}
