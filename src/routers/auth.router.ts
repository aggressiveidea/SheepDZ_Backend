import { Router } from "express"
import { validateRegister, validateLogin } from "../middlewares/validators/validate.middelware"
import { AuthController } from "../controllers/auth.controller"

const router = Router()

router.post("/register", validateRegister, AuthController.Register)
router.post("/login", validateLogin, AuthController.login)

export default router