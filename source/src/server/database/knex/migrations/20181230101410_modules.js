const tableName = 'modules'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table.string('title')
    table.string('description')
    table.string('length')
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
