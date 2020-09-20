import path from 'path'
import { ConnectionOptions, createConnection, Connection } from 'typeorm'

export class Database {
  private connection: Connection;

  constructor () {
    this.init()
  }

  private async init () {
    const options: ConnectionOptions = {
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
      entities: [path.resolve(__dirname, '../../entities/*{.ts,.js}')]
    }
    this.connection = await createConnection(options)
  }

  async getConnection (): Promise<Connection> {
    return this.connection
  }
};

const database = new Database()

export default database
