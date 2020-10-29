import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTagsTable1602016641466 implements MigrationInterface {
  name = 'CreateTagsTable1602016641466'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "product_tags_tag" ("productId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_8da52c0bc9255c6cb07af25ac73" PRIMARY KEY ("productId", "tagId"))'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_208235f4a5c925f11171252b76" ON "product_tags_tag" ("productId") '
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_0de90b04710a86601acdff88c2" ON "product_tags_tag" ("tagId") '
    )
    await queryRunner.query(
      'ALTER TABLE "product_tags_tag" ADD CONSTRAINT "FK_208235f4a5c925f11171252b760" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "product_tags_tag" ADD CONSTRAINT "FK_0de90b04710a86601acdff88c21" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "product_tags_tag" DROP CONSTRAINT "FK_0de90b04710a86601acdff88c21"'
    )
    await queryRunner.query(
      'ALTER TABLE "product_tags_tag" DROP CONSTRAINT "FK_208235f4a5c925f11171252b760"'
    )
    await queryRunner.query('DROP INDEX "IDX_0de90b04710a86601acdff88c2"')
    await queryRunner.query('DROP INDEX "IDX_208235f4a5c925f11171252b76"')
    await queryRunner.query('DROP TABLE "product_tags_tag"')
    await queryRunner.query('DROP TABLE "tag"')
  }
}
