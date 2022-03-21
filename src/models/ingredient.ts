import { Model } from 'objection'
import RecipeIngredientModel from './recipe_ingredient'

class IngredientModel extends Model {
  id!: string

  name!: string

  amount!: number

  created_at!: Date

  static get tableName() {
    return 'ingredients'
  }
}

export default IngredientModel
