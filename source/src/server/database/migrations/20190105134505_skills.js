exports.up = function(knex, Promise) {
  return knex.schema.createTable('skills', table => {
    table.increments()
    table.string('title')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => knex.schema.dropTable('skills')
