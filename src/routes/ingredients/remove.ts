import { Request, Router } from 'express'
import Ingredient from '../../lib/ingredient'

type RequestParams = {
  id: string
}

const router = Router()

router.delete('/:id', async (req: Request<RequestParams>, res, next) => {
  try {
    const { id } = req.params

    await Ingredient.remove(id)

    res.send({})
  } catch (e) {
    next(e)
  }
})

export default router
