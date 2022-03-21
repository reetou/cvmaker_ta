
exports.up = function(knex) {
  return knex.schema.createTable('ingredients', t => {
    t
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    t.string('name').notNullable()
    t.integer('amount').notNullable()

    t.datetime('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ingredients')
};
