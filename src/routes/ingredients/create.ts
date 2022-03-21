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
