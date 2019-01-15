const tableName = 'users_skills'

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table
      .integer('skill_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('skills')
      .onDelete('CASCADE')
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.primary(['skill_id', 'user_id'])
  })

exports.down = knex => knex.schema.dropTable(tableName)
