export default interface IBcrypt {
  genSalt(rounds: number): Promise<string>
  hash(phrase: string, salt: string): Promise<string>
  compare(phrase: string, hash: string): Promise<boolean>
}
