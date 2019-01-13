exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', table => {
    table.increments()
    table.string('title')
    table.string('description')
    table.string('type') // for students or mentors...
    table.timestamp('event_time', true).defaultTo(knex.fn.now())
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => knex.schema.dropTable('events')
