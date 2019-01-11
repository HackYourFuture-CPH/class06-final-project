exports.up = function(knex, Promise) {
  return knex.schema.createTable('mentors_modules', table => {
    table
      .integer('mentorid')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('moduleid')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('modules')
      .onDelete('CASCADE')
    table.string('status') // pending | assign | confirmed
    table.primary(['mentorid', 'moduleid'])
    /*
     CREATE TABLE table_name (
     col_1 INT, col_2 INT,
     primary key (col_1, col_2) )
     */
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mentors_modules')
}
