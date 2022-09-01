/* Contains */

import { Knex } from 'knex';

function applyNotEqualWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyStartsWithWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyEndsWithWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyInWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyNotInWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyLowerThanWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyLowerThanOrEqualWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyGreaterThanWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyGreaterThanOrEqualWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyBetweenWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyNotBetweenWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

function applyIsNullWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  throw new Error('Not Implemented');
}

export function mountQueryBuilder(builder: Knex.QueryBuilder, query: Record<string, string>) {
  Object.entries(query).forEach(([key, value]) => {
    if (['start', 'limit', 'sort'].indexOf(key) > -1) return;

    const [property, operator] = key.split('_');

    switch (operator) {
      case undefined:
        applyWhereClause(property, value, builder);
        break;
      case 'notEqual':
        applyNotEqualWhereClause(property, value, builder);
        break;
      case 'startsWith':
        applyStartsWithWhereClause(property, value, builder);
        break;
      case 'endsWith':
        applyEndsWithWhereClause(property, value, builder);
        break;
      case 'in':
        applyInWhereClause(property, value, builder);
        break;
      case 'notIn':
        applyNotInWhereClause(property, value, builder);
        break;
      case 'lowerThan':
        applyLowerThanWhereClause(property, value, builder);
        break;
      case 'lowerThanOrEqual':
        applyLowerThanOrEqualWhereClause(property, value, builder);
        break;
      case 'greaterThan':
        applyGreaterThanWhereClause(property, value, builder);
        break;
      case 'greaterThanOrEqual':
        applyGreaterThanOrEqualWhereClause(property, value, builder);
        break;
      case 'between':
        applyBetweenWhereClause(property, value, builder);
        break;
      case 'notBetween':
        applyNotBetweenWhereClause(property, value, builder);
        break;
      case 'isNull':
        applyIsNullWhereClause(property, value, builder);
        break;
      default:
        break;
    }
  });
}
