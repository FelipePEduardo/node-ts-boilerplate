import { Knex } from 'knex';

import DatabaseConnection from '@infra/data/DatabaseConnection';

export default class BaseDAO {
  protected connection: Knex;

  constructor() {
    this.connection = DatabaseConnection;
  }
}
