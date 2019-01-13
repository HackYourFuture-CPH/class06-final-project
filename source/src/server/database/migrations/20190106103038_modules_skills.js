exports.up = function(knex, Promise) {
  return knex.schema.createTable('modules_skills', table => {
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
}

exports.down = (knex, Promise) => knex.schema.dropTable('modules_skills')
