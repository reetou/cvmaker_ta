import { Request, Router } from 'express'
import Ingredient from '../../lib/ingredient'
import validate from '../../middlewares/validate'
import createIngredientSchema from '../../validations/ingredients/create'

type RequestBody = {
  name: string
  amount: number
  recipe_id?: string
}

const router = Router()

/**
 * @api {post} /api/ingredients Create ingredient
 * @apiName CreateIngredient
 * @apiGroup Ingredients
 *
 * @apiBody {String} name Name
 * @apiBody {Number} amount Amount (integer)
 * @apiBody {String} recipe_id Recipe id. If provided, assigns created ingredient to the recipe.
 *
 * @apiSuccess {object} ingredient Created ingredient
 * @apiError recipe_not_found The <code>recipe_id</code> of the recipe was not found.
 */
router.post('/', createIngredientSchema, validate, async (req: Request<any, any, RequestBody>, res, next) => {
  try {
    const { name, amount, recipe_id } = req.body

    const ingredient = await Ingredient.create({
      name,
      amount,
      recipe_id,
    })

    res.send({
      ingredient,
    })
  } catch (e) {
    next(e)
  }
})

export default router
