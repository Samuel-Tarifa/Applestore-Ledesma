import {Router} from 'express'
import typesController from '../controllers/typesController.js'
const router=Router()

router.get('/',typesController.getAll)

export default router