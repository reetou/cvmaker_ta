import { Request, Router } from 'express'
import Ingredient from '../../lib/ingredient'

type RequestParams = {
  id: string
}

const router = Router()

router.get('/:id', async (req: Request<RequestParams>, res, next) => {
  try {
    const { id } = req.params

    const ingredient = await Ingredient.get(id)

    res.send({
      ingredient,
    })
  } catch (e) {
    next(e)
  }
})

export default router
