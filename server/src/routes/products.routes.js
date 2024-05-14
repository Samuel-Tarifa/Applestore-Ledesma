import {Router} from 'express'
import productController from '../controllers/productController.js'
const router=Router()

router.get('/',productController.getAll)
router.get('/:id',productController.getOne)

//router.post('/create',productController.create)

export default router