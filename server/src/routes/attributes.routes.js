import {Router} from 'express'
import attributesController from '../controllers/attributesController.js'
const router=Router()

router.get('/',attributesController.getAll)

export default router