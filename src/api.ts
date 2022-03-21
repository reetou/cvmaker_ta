import { Router } from 'express'
import ingredients from './routes/ingredients'
import recipes from './routes/recipes'

const router = Router()

router.use('/ingredients', ingredients)
router.use('/recipes', recipes)

export default router
