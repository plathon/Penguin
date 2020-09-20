import path from 'path'
import { createConnection, Connection } from 'typeorm'

export class Database {
  private connection: Connection;

  constructor () {
    this.init()
  }

  private async init () {
    this.connection = await createConnection({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      logging: false,
      entities: [path.resolve(__dirname, '../../entities/*{.ts,.js}')]
    })
  }

  async getConnection (): Promise<Connection> {
    return this.connection
  }
};

const database = new Database()

export default database
