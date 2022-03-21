import { Router } from 'express'
import create from './create'
import update from './update'
import remove from './remove'
import get from './get'
import list from './list'

const router = Router()

router.use('/', get)
router.use('/', list)
router.use('/', update)
router.use('/', create)
router.use('/', remove)

export default router
