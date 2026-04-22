import { MigrationInterface, QueryRunner } from "typeorm";
export class AddTenantIdToUsers1707000000000 implements MigrationInterface {
  name = "AddTenantIdToUsers1707000000000";
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE "user" ADD COLUMN "tenantId" varchar(64) NOT NULL DEFAULT 'system'`);
    await q.query(`CREATE INDEX "IDX_user_tenant" ON "user" ("tenantId")`);
  }
  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP INDEX "IDX_user_tenant"`);
    await q.query(`ALTER TABLE "user" DROP COLUMN "tenantId"`);
  }
}
