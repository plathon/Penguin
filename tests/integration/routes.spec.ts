import supertest from 'supertest'
import server from '../../src/app'
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
    let accessToken

    test('should register a new user (POST: /users)', async () => {
      const response = await app()
        .post('/users')
        .send({ name: 'jose da silva', email: 'jose@test.com', password: '12345' })
      expect(response.status).toBe(200)
    })

    test('should authenticate a user local (POST: /auth/local)', async () => {
      const response = await app()
        .post('/auth/local')
        .send({ email: 'jose@test.com', password: '12345' })
      accessToken = response.body.accessToken
      expect(response.status).toBe(200)
    })

    test('should return a 404 when not found user (POST: /auth/local)', async () => {
      const response = await app()
        .post('/auth/local')
        .send({ email: 'inexistent@test.com', password: '12345' })
      expect(response.status).toBe(404)
    })

    test('should create a new product (POST: /product)', async () => {
      const response = await app()
        .post('/product')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'product name', description: 'product description' })

      expect(response.status).toBe(200)
    })
  })
})
