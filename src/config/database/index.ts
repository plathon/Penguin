import { createConnection, Connection } from 'typeorm'

export class Database {
  private connection: Connection;

  constructor () {
    this.init()
  }

  private async init () {
    this.connection = await createConnection()
  }

  async getConnection (): Promise<Connection> {
    return this.connection
  }
};

const database = new Database()

export default database
