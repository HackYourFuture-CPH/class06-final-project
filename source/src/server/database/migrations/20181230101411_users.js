exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name')
    table.string('avatar')
    table.string('type')
    table.string('google_login')
    table.string('google_id')
    table.boolean('status').defaultTo(true)
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => knex.schema.dropTable('users')
