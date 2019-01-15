const tableName = 'classes_modules'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table
      .integer('classid')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
    table
      .integer('moduleid')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('modules')
      .onDelete('CASCADE')
    table.string('github_page')
    table.date('start_date').defaultTo(new Date().toISOString().slice(0, 10))
    table.date('end_date')
    table.primary(['classid', 'moduleid'])
  })

exports.down = knex => knex.schema.dropTable(tableName)
