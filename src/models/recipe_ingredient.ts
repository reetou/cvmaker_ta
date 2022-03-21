import { Model } from 'objection'

class RecipeIngredientModel extends Model {
  id!: string

  recipe_id!: string

  ingredient_id!: string

  created_at!: Date

  static get tableName() {
    return 'recipes_ingredients'
  }
}

export default RecipeIngredientModel
