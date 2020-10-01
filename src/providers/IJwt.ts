
export default interface IJwt {
  sign(data: any, privateKey: string): string
}
