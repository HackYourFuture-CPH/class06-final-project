exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('permissions').insert([
        { id: 1, role_id: 1, name: 'add_class' },
        { id: 2, role_id: 1, name: 'add_user' },
        { id: 3, role_id: 1, name: 'delete_user' },
        { id: 4, role_id: 1, name: 'edit_user' },
        { id: 5, role_id: 1, name: 'add_module' },
        { id: 6, role_id: 1, name: 'edit_module' },
        { id: 7, role_id: 1, name: 'delete_module' },
        { id: 8, role_id: 2, name: 'add_session' },
        { id: 9, role_id: 3, name: 'send_mail' },
        
      ])
    })
}
