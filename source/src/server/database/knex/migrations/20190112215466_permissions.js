const tableName = 'permissions'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table
      .integer('role_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('roles')
    table.string('name')
  })

exports.down = knex => knex.schema.dropTable(tableName)
