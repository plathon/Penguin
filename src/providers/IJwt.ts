export interface ISign {
  id: number
  name: string
  email: string
}

export default interface IJwt {
  sign(data: ISign, privateKey: string): string
}
