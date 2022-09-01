import { knex } from 'knex';

export function connectionFactory() {
  const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_POOL_MIN,
    DATABASE_POOL_MAX,
    DATABASE_POOL_IDLE,
  } = process.env;

  return knex({
    client: 'mysql2' /* Driver */,
    connection: {
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      host: DATABASE_HOST,
      port: DATABASE_PORT ? Number(DATABASE_PORT) : undefined,
      database: DATABASE_NAME,
      decimalNumbers: true,
    },
    pool: {
      min: DATABASE_POOL_MIN ? Number(DATABASE_POOL_MIN) : undefined,
      max: DATABASE_POOL_MAX ? Number(DATABASE_POOL_MAX) : undefined,
      idleTimeoutMillis: DATABASE_POOL_IDLE ? Number(DATABASE_POOL_IDLE) : undefined,
    },
    acquireConnectionTimeout: 2000,
  });
}

const DatabaseConnection = connectionFactory();

export default DatabaseConnection;
