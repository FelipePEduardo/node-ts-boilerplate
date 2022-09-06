# QueryBuilder for Knex

This method was created to make it easy to receive query parameters from the API, transforming them into Knex query construction syntax.

```ts
import { QueryParams } from '@domain/DTO';

import DatabaseConnection from '@infra/data/DatabaseConnection'
import { getSortFromQuery, queryBuilder } from '@infra/data/helpers';

function search(query: QueryParams) {
  const { column, order } = getSortFromQuery(query);

  const query = DatabaseConnection('user')
    .where((builder) => queryBuilder(builder, query))
    .orderBy(column, order);
}
```

## Query Filter

|Operator                     |Description                               |Example                        |Types      |
|-----------------------------|------------------------------------------|-------------------------------|-----------|
|`<field>`                    | Value is equal to (*not case sensitive*) |`?name=Mauro`                  |`string`   |
|`<field>_notEqual`           | Value is different from                  |`?name_notEqual=Mauro`         |`string`   |
|`<field>_startsWith`         | Value starts with                        |`?name_startsWith=Ma`          |`string`   |
|`<field>_endsWith`           | Value ends with                          |`?name_endsWith=uro`           |`string`   |
|`<field>_in`                 | Value is one of the informed options     |`?year_in=2020,2021`           |`any[]`    |
|`<field>_notIn`              | Value is not one of the informed options |`?yean_notIn=2022,2023`        |`any[]`    |
|`<field>_lowerThan`          | Number field is less than                |`?year_lowerThan=2024`         |`number`   |
|`<field>_lowerThanOrEqual`   | Number field is less or equal to         |`?year_lowerThanOrEqual=2023`  |`number`   |
|`<field>_greaterThan`        | Number field is greater than             |`?year_greaterThan=2024`       |`number`   |
|`<field>_greaterThanOrEqual` | Number field is greater or equal to      |`?year_greaterThanOrEqual=2023`|`number`   |
|`<field>_between`            | Number is between range                  |`?year_between=2000,2010`      |`number[]` |
|`<field>_notBetween`         | Number in not between range              |`?year_notBetween=2000,2010`   |`number[]` |
|`<field>_isNull`             | Field is null                            |`?email_isNull=true`           |`boolean`  |
