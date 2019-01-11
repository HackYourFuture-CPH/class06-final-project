exports.up = function(knex, Promise) {
  return knex.schema.createTable('module_students', table => {
    table
      .integer('module_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('modules')
      .onDelete('CASCADE')
    table
      .integer('student_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.primary(['module_id', 'student_id'])
  })
}

exports.down = (knex, Promise) => knex.schema.dropTable('module_students')
