const tableName = 'sessions'

exports.up = knex =>
  knex.schema.table(tableName, table => {
    table.dropColumn('mentors')
    table.text('description').alter()
  })

exports.down = knex =>
  knex.schema.alterTable(tableName, table => {
    table.string('mentors')
    table.string('description').alter()
  })
