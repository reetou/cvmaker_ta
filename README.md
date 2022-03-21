# CVmaker test assignment

Test assignment for cvmaker

## Startup

- Install PostgreSQL 12+
- `yarn install`
- `yarn migrate`
- `yarn start`

## Tests

Tests located in `test/` folder

Run tests: `yarn test`

## Docs

Generate docs: `yarn docs:gen`

## Original Assignment

Create a small API including endpoints to interact with recipes and ingredients. Since we’re working with big data, we also want to see a use case of simulating response time of the http methods based on a database with over 1 million items.

### Tech-stack
- NodeJS
- Express
- Typescript

### Requirements
- Possibility to create recipes
- Possibility to create ingredients as a collection of a recipe
- Possibility to get, create, update or delete recipes and ingredients
- Generate documentation for create ingredient endpoint
- Write create ingredient tests
- Write create ingredient error handling
