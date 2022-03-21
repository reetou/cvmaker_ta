import { Transaction } from "objection"
import IngredientModel from "../models/ingredient"
import RecipeIngredientModel from "../models/recipe_ingredient"
import ApiError from "./error/api_error"
import Logger from "./logger"
import Recipe from "./recipe"

type CreateIngredientData = {
  name: string
  amount: number
  recipe_id?: string
}

type UpdateIngredientData = {
  name: string
  amount: number
  recipe_id?: string
}

class Ingredient {

  async create(data: CreateIngredientData) {
    let trx

    try {
      trx = await IngredientModel.startTransaction()

      const result = await IngredientModel
        .query(trx)
        .insert({
          name: data.name,
          amount: data.amount,
        })

      if (data.recipe_id) {
        Logger.log('ingredient', 'Will insert with recipe id')
        await this.assignToRecipe(result.id, data.recipe_id, trx)
      }

      await trx.commit()

      return this.get(result.id)
    } catch (e) {
      if (trx) {
        await trx.rollback()
      }

      throw e
    }
  }

  async get(id: string) {
    const result = await IngredientModel
      .query()
      .where({
        id,
      })
      .first()

    if (!result) {
      throw new ApiError('ingredient_not_found', 404)
    }

    return result
  }

  async getByName(name: string) {
    const result = await IngredientModel
      .query()
      .where({
        name,
      })
      .first()

    return result
  }

  async update(id: string, data: UpdateIngredientData) {
    let trx

    await this.get(id)

    try {
      trx = await IngredientModel.startTransaction()

      await IngredientModel
        .query(trx)
        .where({ id })
        .update({
          name: data.name,
          amount: data.amount,
        })
        .returning('*')
        .first()

      if (data.recipe_id) {
        await this.assignToRecipe(id, data.recipe_id, trx)
      }

      await trx.commit()

      return this.get(id)
    } catch (e) {
      if (trx) {
        await trx.rollback()
      }

      throw e
    }
  }

  async remove(id: string) {
    await IngredientModel
      .query()
      .where({
        id
      })
      .delete()
  }

  async list(page: number) {
    const result = await IngredientModel
      .query()
      .page(page, 100)

    return result
  }

  async assignToRecipe(id: string, recipe_id: string, trx?: Transaction) {
    const recipe = await Recipe.get(recipe_id, trx)

    Logger.log('ingredient', 'inserting recipe assign')

    await RecipeIngredientModel
      .query(trx)
      .insert({
        recipe_id: recipe.id,
        ingredient_id: id,
      })
      .onConflict(['recipe_id', 'ingredient_id'])
      .ignore()
  }
}

export default new Ingredient()
