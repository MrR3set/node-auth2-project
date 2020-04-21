exports.up = function(knex) {
  return knex.schema.createTable('Users', users => {
    users.increments();

    users.string('username', 128).notNullable().unique().index();
    users.string('password', 32).notNullable();
    users.string("department",128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Users');
};
