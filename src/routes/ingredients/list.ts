import { Request, Router } from 'express'
import Ingredient from '../../lib/ingredient'

type RequestQuery = {
  page: string
}

const router = Router()

router.get('/', async (req: Request<any, any, any, RequestQuery>, res, next) => {
  try {
    const { page } = req.query

    const result = await Ingredient.list(Number(page) || 0)

    res.send(result)
  } catch (e) {
    next(e)
  }
})

export default router
