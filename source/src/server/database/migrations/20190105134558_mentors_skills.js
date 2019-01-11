exports.up = function(knex, Promise) {
  return knex.schema.createTable('mentors_skills', table => {
    table
      .integer('skill_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('skills')
      .onDelete('CASCADE')
    table
      .integer('mentor_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.primary(['skill_id', 'mentor_id'])
  })
}

exports.down = (knex, Promise) => knex.schema.dropTable('mentors_skills')
