
exports.up = function(knex) {
  return knex.schema.createTable('recipes_ingredients', t => {
    t
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    t.uuid('recipe_id').references('id').inTable('recipes').notNullable().onDelete('CASCADE')
    t.uuid('ingredient_id').references('id').inTable('ingredients').notNullable().onDelete('CASCADE')

    t.datetime('created_at').defaultTo(knex.fn.now())

    t.unique(['recipe_id', 'ingredient_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes_ingredients')
};
