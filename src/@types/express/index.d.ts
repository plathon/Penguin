// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface User {
    id: number
  }
  export interface Request {
    currentUser: string
  }
}