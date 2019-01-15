const tableName = 'roles'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table.string('name')
  })

exports.down = knex => knex.schema.dropTable(tableName)
