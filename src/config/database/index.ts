import { createConnection, Connection } from 'typeorm'
import getConnectionOptions from './typeormConfig'

export class Database {
  private connection: Connection;

  constructor () {
    if (process.env.NODE_ENV !== 'testing') {
      this.init()
    }
  }

  private async init () {
    const defaultConnection = getConnectionOptions.execute()
    this.connection = await createConnection(defaultConnection)
  }

  async getConnection (): Promise<Connection> {
    return this.connection
  }

  async openConnection (): Promise<void> {
    return this.init()
  }

  async closeConnection (): Promise<void> {
    return this.connection.close()
  }
};

const database = new Database()

export default database
