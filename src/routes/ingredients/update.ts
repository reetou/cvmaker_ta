import { Request, Router } from 'express'
import Ingredient from '../../lib/ingredient'

type RequestBody = {
  name: string
  amount: number
}

type RequestParams = {
  id: string
}

const router = Router()

router.put('/:id', async (req: Request<RequestParams, any, RequestBody>, res, next) => {
  try {
    const { id } = req.params
    const { name, amount } = req.body

    const ingredient = await Ingredient.update(id, {
      name,
      amount,
    })

    res.send({
      ingredient,
    })
  } catch (e) {
    next(e)
  }
})

export default router
