import { Request, Router } from 'express'
import Recipe from '../../lib/recipe'

type RequestParams = {
  id: string
}

const router = Router()

router.delete('/:id', async (req: Request<RequestParams>, res, next) => {
  try {
    const { id } = req.params

    await Recipe.remove(id)

    res.send({})
  } catch (e) {
    next(e)
  }
})

export default router
