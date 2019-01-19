const tableName = 'sessions'

exports.up = knex =>
  knex.schema.table(tableName, table => {
    table.dropForeign('id', 'sessions_module_id_foreign')
    table
      .integer('classes_modules_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('classes_modules')
      .onDelete('CASCADE')
  })

exports.down = knex => knex.schema.alterTable(tableName, table => {})

//knex.schema.dropTable(tableName)
