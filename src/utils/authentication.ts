import crypto from 'crypto'

const length = 128
const SECRET = 'MOONWALKER'

/**
 * @description Generates a random string
 * @returns {string} Random string
 */
export const randomString = (): string => {
   return crypto.randomBytes(length).toString('base64')
}

/**
 * @description Hashes the password with the salt
 * @param password
 * @param salt
 * @returns {string} Hashed password
 */
export const authentication = (password: string, salt: string): string => {
   return crypto
      .createHmac('sha256', [salt, password].join('/'))
      .update(SECRET)
      .digest()
      .toString('hex')
}
