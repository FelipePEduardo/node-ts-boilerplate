import { Knex } from 'knex';

import DatabaseConnection from '@infra/data/DatabaseConnection';

export default class BaseRepository {
  protected connection: Knex;

  constructor() {
    this.connection = DatabaseConnection;
  }
}
