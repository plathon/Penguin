import './environment'
import database from '@config/database'

(async () => {
  await database.openConnection()
  await (await database.getConnection()).runMigrations()
  await database.closeConnection()
})()
