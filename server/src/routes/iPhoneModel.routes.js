import {Router} from 'express'
import iPhoneModelController from '../controllers/iPhoneModelController.js'
const router=Router()

router.get('/',iPhoneModelController.getAll)
router.post('/create',iPhoneModelController.create)


export default router