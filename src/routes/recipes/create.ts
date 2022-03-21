import { Request, Router } from 'express'
import Recipe from '../../lib/recipe'

type RequestBody = {
  title: string
  description?: string
  cooking_time?: number
  difficulty?: number
}

const router = Router()

router.post('/', async (req: Request<any, any, RequestBody>, res, next) => {
  try {
    const { title, description, cooking_time, difficulty } = req.body

    const recipe = await Recipe.create({
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
