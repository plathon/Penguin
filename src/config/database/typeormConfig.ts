import path from 'path'
import { ConnectionOptions } from 'typeorm'

export class GetConnectionOptions {
  private connectionOptions: ConnectionOptions[] = [
    {
      name: 'default',
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      entities: [path.resolve(__dirname, '../../entities/*{.ts,.js}')],
      migrations: [path.resolve(__dirname, 'migrations/**/*.ts')]
    }
  ]

  execute(connectionName = 'default'): ConnectionOptions {
    return this.connectionOptions.find(
      connection => connection.name === connectionName
    )
  }
}

const getConnectionOptions = new GetConnectionOptions()

export default getConnectionOptions
