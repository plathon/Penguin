import supertest from 'supertest'
import server from '@server/app'
import database from '@config/database'
import { MigrationExecutor } from 'typeorm'

const app = () => supertest(server)

describe('routes', () => {
  beforeAll(async () => {
    await database.openConnection()
    await (await database.getConnection()).runMigrations()
  })

  afterAll(async () => {
    const connection = await database.getConnection()
    const migrationExecutor = new MigrationExecutor(connection)
    const migrations = await migrationExecutor.getAllMigrations()
    migrations.forEach(async () => {
      await migrationExecutor.undoLastMigration()
    })
    await database.closeConnection()
  })

  describe('users', () => {
    test('should register a new user (POST: /users)', async () => {
      const response = await app()
        .post('/users')
        .send({ name: 'jose da silva', email: 'jose@test.com', password: '12345' })

      expect(response.status).toBe(200)
    })
  })
})
