const tableName = 'sessions'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table
      .integer('module_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('modules')
      .onDelete('CASCADE')
    table.string('location')
    table.string('description')
    table.text('recordings_links')
    table.string('mentors')
    table.timestamp('session_date', true).defaultTo(knex.fn.now())
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
