
exports.up = async function(knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable('recipes', t => {

    t
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    t.string('title').notNullable()

    t.text('description')

    t.integer('cooking_time').notNullable().defaultTo(15)

    t.integer('difficulty').notNullable().defaultTo(0)

    t.datetime('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('recipes')

  await knex.raw('DROP EXTENSION "uuid-ossp"')
};
