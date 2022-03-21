import { Request, Router } from 'express'
import Recipe from '../../lib/recipe'

type RequestBody = {
  title: string
  description?: string
  cooking_time?: number
  difficulty?: number
}

type RequestParams = {
  id: string
}

const router = Router()

router.put('/:id', async (req: Request<RequestParams, any, RequestBody>, res, next) => {
  try {
    const { id } = req.params
    const { title, description, cooking_time, difficulty } = req.body

    const recipe = await Recipe.update(id, {
      title,
      description,
      cooking_time,
      difficulty,
    })

    res.send({
      recipe,
    })
  } catch (e) {
    next(e)
  }
})

export default router
