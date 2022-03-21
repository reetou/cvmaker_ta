import { Transaction } from "objection"
import RecipeModel from "../models/recipe"
import ApiError from "./error/api_error"

type CreateRecipeData = {
  title: string
  description?: string
  cooking_time?: number
  difficulty?: number
}

type UpdateRecipeData = {
  title?: string
  description?: string
  cooking_time?: number
  difficulty?: number
}

class Recipe {
  async create(data: CreateRecipeData) {
    const result = await RecipeModel
      .query()
      .insert({
        title: data.title,
        description: data.description,
        cooking_time: data.cooking_time,
        difficulty: data.difficulty,
      })

    return result
  }

  async get(id: string, trx?: Transaction) {
    const result = await RecipeModel
      .query(trx)
      .where({
        id,
      })
      .withGraphFetched('[ingredients]')
      .first()

    if (!result) {
      throw new ApiError('recipe_not_found', 404)
    }

    return result
  }

  async update(id: string, data: UpdateRecipeData) {
    const result = await RecipeModel
      .query()
      .where({ id })
      .update({
        ...data,
      })
      .returning('*')
      .first()

    if (!result) {
      throw new ApiError('recipe_not_found', 404)
    }

    return result
  }

  async remove(id: string) {
    await RecipeModel
      .query()
      .where({
        id
      })
      .delete()
  }

  async list(page: number) {
    const result = await RecipeModel
      .query()
      .page(page, 100)

    return result
  }
}

export default new Recipe()
