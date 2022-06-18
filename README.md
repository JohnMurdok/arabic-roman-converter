# Jolimoi monorepo

*Project* : Make a number converter from arabic system to roman system with a frontend application and backend application

- App server port: 1234
- Back server port: 3123

Two branches with diffents implementations :

- ITW-002 : With graphql direct calls
- ITW-003 : Use SSE to have an async callback from server (based on ITW-002)

## How to install

1. ```npm i```
2. ```npx lerna bootstrap```
3. In each projects
```cp .env.example .env```

## How to start

Two ways :

- npm start

or

- docker-compose up -d

