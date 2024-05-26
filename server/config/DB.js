import { Pool } from "pg";

export const pool = new Pool({
  user: "leejinw", // 데이터베이스 사용자명
  host: "localhost",
  database: "server_metrics",
  password: "123456789a", // 데이터베이스 비밀번호
  port: 5432,
});
