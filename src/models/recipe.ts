import { Model } from 'objection'
import IngredientModel from './ingredient'
import RecipeIngredientModel from './recipe_ingredient'

class RecipeModel extends Model {
  id!: string

  title!: string

  description!: string | null

  cooking_time!: number

  difficulty!: number

  updated_at!: Date

  static get tableName() {
    return 'recipes'
  }

  static get relationMappings() {
    return {
      ingredients: {
        relation: Model.ManyToManyRelation,
        modelClass: IngredientModel,
        join: {
          from: `${this.tableName}.id`,
          through: {
            from: `${RecipeIngredientModel.tableName}.recipe_id`,
            to: `${RecipeIngredientModel.tableName}.ingredient_id`
          },
          to: `${IngredientModel.tableName}.id`,
        },
      },
    }
  }
}

export default RecipeModel
