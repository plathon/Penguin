import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOrdersTable1602188571530 implements MigrationInterface {
  name = 'CreateOrdersTable1602188571530'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "order_products_product" ("orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c" PRIMARY KEY ("orderId", "productId"))'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_1f9ea0b0e59e0d98ade4f2d5e9" ON "order_products_product" ("orderId") '
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_d6c66c08b9c7e84a1b657797df" ON "order_products_product" ("productId") '
    )
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff"'
    )
    await queryRunner.query(
      'ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99"'
    )
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"'
    )
    await queryRunner.query('DROP INDEX "IDX_d6c66c08b9c7e84a1b657797df"')
    await queryRunner.query('DROP INDEX "IDX_1f9ea0b0e59e0d98ade4f2d5e9"')
    await queryRunner.query('DROP TABLE "order_products_product"')
    await queryRunner.query('DROP TABLE "order"')
  }
}
