import { Request, Router } from 'express'
import Recipe from '../../lib/recipe'

type RequestQuery = {
  page: string
}

const router = Router()

router.get('/', async (req: Request<any, any, any, RequestQuery>, res, next) => {
  try {
    const { page } = req.query

    const result = await Recipe.list(Number(page) || 0)

    res.send(result)
  } catch (e) {
    next(e)
  }
})

export default router
