const tableName = 'users'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table.string('name')
    table.string('email')
    table.string('avatar')
    table
      .integer('role_id')
      .unsigned()
      .references('id')
      .inTable('roles')
    table.string('status')
    table.string('google_id')
    table.string('google_login')
    table.string('type')
    table.boolean('active').defaultTo(true)
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
