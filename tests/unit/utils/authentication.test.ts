import { authentication, randomString } from '../../../src/utils/authentication'

describe('authentication', () => {
   it('should return random string', () => {
      const result = randomString()
      expect(result).toBeDefined()
   })

   it('should return hash', () => {
      const expectedHash =
         '7675a053edd7b99903b556a518d7b7ef64f94a6f0d9fe54bf8db70afbd24c94d'
      const result = authentication('password', 'salt')
      expect(result).toEqual(expectedHash)
   })
})
