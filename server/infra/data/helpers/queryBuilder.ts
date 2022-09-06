import { QueryParams } from '@domain/DTO';
import { Knex } from 'knex';

const DEFAULT_SORT_COLUMN = 'id';
const DEFAULT_SORT_ORDER = 'desc';
const DEFAULT_QUERY_LIMIT = 100;

function convertStringToInteger(string: string) {
  const number = Number(string);
  if (!string || !Number.isInteger(number)) return null;
  return number;
}

function convertStringToBoolean(string: string) {
  if (!string || ['true', 'false'].indexOf(string) === -1) return null;
  return string === 'true';
}

function applyNotEqualWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  builder.whereNot(property, value);
}

function applyStartsWithWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  builder.where(property, 'like', `${value}%`);
}

function applyEndsWithWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  builder.where(property, 'like', `%${value}`);
}

function applyInWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  builder.whereIn(property, value.split(','));
}

function applyNotInWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  builder.whereNotIn(property, value.split(','));
}

function applyLowerThanWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  const number = convertStringToInteger(value);
  if (number) builder.where(property, '<', number);
}

function applyLowerThanOrEqualWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  const number = convertStringToInteger(value);
  if (number) builder.where(property, '<=', number);
}

function applyGreaterThanWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  const number = convertStringToInteger(value);
  if (number) builder.where(property, '>', number);
}

function applyGreaterThanOrEqualWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  const number = convertStringToInteger(value);
  if (number) builder.where(property, '>=', number);
}

function applyBetweenWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  const [firstValue, secondValue] = value.split(',');
  const firstNumber = convertStringToInteger(firstValue);
  const secondNumber = convertStringToInteger(secondValue);

  if (firstNumber && secondNumber) builder.whereBetween(property, [firstNumber, secondNumber]);
}

function applyNotBetweenWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  const [firstValue, secondValue] = value.split(',');
  const firstNumber = convertStringToInteger(firstValue);
  const secondNumber = convertStringToInteger(secondValue);

  if (firstNumber && secondNumber) builder.whereNotBetween(property, [firstNumber, secondNumber]);
}

function applyWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  builder.where(property, value);
}

function applyIsNullWhereClause(property: string, value: string, builder: Knex.QueryBuilder) {
  const booleanValue = convertStringToBoolean(value);
  if (booleanValue !== null) {
    if (booleanValue) {
      builder.whereNull(property);
    } else {
      builder.whereNotNull(property);
    }
  }
}

export function queryBuilder(builder: Knex.QueryBuilder, query: QueryParams) {
  Object.entries(query).forEach(([key, value]) => {
    if (['start', 'limit', 'sort'].indexOf(key) > -1) return;

    const [property, operator] = key.split('_');

    // FIXME: ADJUST TYPE FOR VALUE
    switch (operator) {
      case undefined:
        applyWhereClause(property, value as string, builder);
        break;
      case 'notEqual':
        applyNotEqualWhereClause(property, value as string, builder);
        break;
      case 'startsWith':
        applyStartsWithWhereClause(property, value as string, builder);
        break;
      case 'endsWith':
        applyEndsWithWhereClause(property, value as string, builder);
        break;
      case 'in':
        applyInWhereClause(property, value as string, builder);
        break;
      case 'notIn':
        applyNotInWhereClause(property, value as string, builder);
        break;
      case 'lowerThan':
        applyLowerThanWhereClause(property, value as string, builder);
        break;
      case 'lowerThanOrEqual':
        applyLowerThanOrEqualWhereClause(property, value as string, builder);
        break;
      case 'greaterThan':
        applyGreaterThanWhereClause(property, value as string, builder);
        break;
      case 'greaterThanOrEqual':
        applyGreaterThanOrEqualWhereClause(property, value as string, builder);
        break;
      case 'between':
        applyBetweenWhereClause(property, value as string, builder);
        break;
      case 'notBetween':
        applyNotBetweenWhereClause(property, value as string, builder);
        break;
      case 'isNull':
        applyIsNullWhereClause(property, value as string, builder);
        break;
      default:
        break;
    }
  });
}

function getValueFromQuery(query: QueryParams, key: string): number | null {
  const entry = Object.entries(query).find(([k]) => k === key);

  if (entry) {
    const [, value] = entry;
    return Number(value);
  }

  return null;
}

export function getLimitFromQuery(query: QueryParams): number {
  const value = getValueFromQuery(query, 'limit');

  return value ?? DEFAULT_QUERY_LIMIT;
}

export function geStartFromQuery(query: QueryParams): number {
  const value = getValueFromQuery(query, 'start');

  return value || 0;
}

export type SortOrder = 'asc' | 'desc';

export function getSortFromQuery(query: QueryParams): { column: string; order: SortOrder } {
  const sort = query.sort || '';

  const [column, order] = sort.split(':');
  const orderLowerCase = order?.toLocaleLowerCase();

  if (column && ['asc', 'desc'].indexOf(orderLowerCase) > -1) {
    return { column, order: orderLowerCase as SortOrder };
  }

  if (column && !orderLowerCase) {
    return { column, order: DEFAULT_SORT_ORDER };
  }

  return { column: DEFAULT_SORT_COLUMN, order: DEFAULT_SORT_ORDER };
}
