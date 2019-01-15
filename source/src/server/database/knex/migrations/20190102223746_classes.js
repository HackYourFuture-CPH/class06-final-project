const tableName = 'classes'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table.string('classname').notNullable()
    table.boolean('active')
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
