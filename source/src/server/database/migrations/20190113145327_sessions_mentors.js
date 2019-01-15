const tableName = 'sessions_mentors'
exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table
      .integer('session_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('sessions')
      .onDelete('CASCADE')
    table
      .integer('mentor_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('status') // pending | assign | confirmed
    table.primary(['session_id', 'mentor_id'])
  })

exports.down = knex => knex.schema.dropTable(tableName)
