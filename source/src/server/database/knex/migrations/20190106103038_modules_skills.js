const tableName = 'modules_skills'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table
      .integer('module_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('modules')
      .onDelete('CASCADE')
    table
      .integer('skill_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('skills')
      .onDelete('CASCADE')
    table.primary(['module_id', 'skill_id'])
  })

exports.down = knex => knex.schema.dropTable(tableName)
