import { Request, Router } from 'express'
import Recipe from '../../lib/recipe'

type RequestParams = {
  id: string
}

const router = Router()

router.get('/:id', async (req: Request<RequestParams>, res, next) => {
  try {
    const { id } = req.params

    const recipe = await Recipe.get(id)

    res.send({
      recipe,
    })
  } catch (e) {
    next(e)
  }
})

export default router
