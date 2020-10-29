import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProductsTable1601754765613 implements MigrationInterface {
  name = 'CreateProductsTable1601754765613'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"'
    )
    await queryRunner.query('DROP TABLE "product"')
  }
}
