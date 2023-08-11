export const DB_CONFIG = {
  user: process.env.POSTGRES_USER || "test_user",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "test_db",
  password: process.env.POSTGRES_PASSWORD || "test_password",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
};
