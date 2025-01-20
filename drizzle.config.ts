import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", //사용할 db
  schema: "./db/schema.ts", //스키마 경로
  out: "./drizzle", //마이그레이션 파일 위치
  dbCredentials: { url: process.env.DATABASE_URL! },
});
