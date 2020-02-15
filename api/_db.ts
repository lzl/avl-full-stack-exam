import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
  pool: { min: 1, max: 1 },
})

export default db
