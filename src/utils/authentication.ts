import crypto from 'crypto'

const length = 128
const SECRET = 'MOONWALKER'

export const randomString = (): string => {
   return crypto.randomBytes(length).toString('base64')
}

// export const authentication = {
//   hash: (password: string, salt: string): string => {
//     return crypto
//       .pbkdf2Sync(password, salt, 10000, 512, "sha512")
//       .toString("hex");
//   },
//   salt: (): string => {
//     return randomString();
//   },
//   compare: (password: string, hash: string, salt: string): boolean => {
//     return authentication.hash(password, salt) === hash;
//   },
// };

export const authentication = (password: string, salt: string): string => {
   return crypto
      .createHmac('sha256', [salt, password].join('/'))
      .update(SECRET)
      .digest()
      .toString('hex')
}
