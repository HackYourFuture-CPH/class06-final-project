exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes_modules', table => {
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
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('classes_modules')
}
