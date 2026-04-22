import { MigrationInterface, QueryRunner } from "typeorm";
export class FeatureFlags1707100000000 implements MigrationInterface {
  name = "FeatureFlags1707100000000";
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE "fork_feature_flag" (
        "tenantId" varchar(64) NOT NULL,
        "name" varchar(128) NOT NULL,
        "enabled" boolean NOT NULL DEFAULT false,
        "updatedAt" timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY ("tenantId", "name")
      )
    `);
  }
  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE "fork_feature_flag"`);
  }
}
