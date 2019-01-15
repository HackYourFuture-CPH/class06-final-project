const tableName = 'events'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table.string('title')
    table.string('description')
    table.string('type') // for students or mentors...
    table.timestamp('event_time', true).defaultTo(knex.fn.now())
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
