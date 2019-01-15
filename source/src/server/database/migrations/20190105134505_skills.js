const tableName = 'skills'

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table.string('title')
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
