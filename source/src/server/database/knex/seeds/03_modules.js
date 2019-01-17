exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('modules')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('modules').insert([
        {
          id: 1,
          title: 'HTML',
          description: null,
          length: 3
        },
        {
          id: 2,
          title: 'CSS',
          description: null,
          length: 3
        },
        {
          id: 3,
          title: 'Javascript 1',
          description: null,
          length: 4
        },
        {
          id: 4,
          title: 'javascript 2',
          description: null,
          length: 4
        },
        {
          id: 5,
          title: 'javascript 3',
          description: null,
          length: 4
        },
        {
          id: 6,
          title: 'Node.js',
          description: null,
          length: 3
        },
        {
          id: 7,
          title: 'MySQL',
          description: null,
          length: 3
        },
        {
          id: 8,
          title: 'React',
          description: null,
          length: 4
        },
        {
          id: 9,
          title: 'Final Project',
          description: null,
          length: 8
        }
      ])
    })
}
