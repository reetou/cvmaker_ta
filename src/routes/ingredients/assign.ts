import { Request, Router } from 'express'
import Ingredient from '../../lib/ingredient'

type RequestBody = {
  recipe_id: string
}

type RequestParams = {
  id: string
}

const router = Router()

router.post('/:id', async (req: Request<RequestParams, any, RequestBody>, res, next) => {
  try {
    const { id } = req.params
    const { recipe_id } = req.body

    const ingredient = await Ingredient.get(id)

    await Ingredient.assignToRecipe(id, recipe_id)

    res.send({
      ingredient,
    })
  } catch (e) {
    next(e)
  }
})

export default router
