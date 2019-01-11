exports.up = function(knex, Promise) {
  return knex.schema.createTable('modules', table => {
    table.increments()
    table.string('title')
    table.string('description')
    table.string('length')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('modules')
}
