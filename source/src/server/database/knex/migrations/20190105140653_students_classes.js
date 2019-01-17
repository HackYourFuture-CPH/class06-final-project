const tableName = 'students_classes'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
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

exports.down = knex => knex.schema.dropTable(tableName)
