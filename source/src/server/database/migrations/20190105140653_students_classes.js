exports.up = function(knex, Promise) {
  return knex.schema.createTable('students_classes', table => {
    table
      .integer('student_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('class_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
    table.primary(['student_id', 'class_id'])
  })
}

exports.down = (knex, Promise) => knex.schema.dropTable('students_classes')
