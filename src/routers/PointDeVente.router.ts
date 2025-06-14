
import { Router } from "express"
import { PointDeVente } from "../middlewares/validators/validate.middelware"
import {  PointDeVenteController } from "../controllers/PointDeVente.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.get("/all", PointDeVenteController.getAllCenters)
router.get("/:id", PointDeVenteController.getCenterByID)
router.post("/", authMiddleware.checkAuth, authMiddleware.checkAdmin, PointDeVente, PointDeVenteController.createCenter)
router.put("/:id", authMiddleware.checkAuth, authMiddleware.checkAdmin,  PointDeVente, PointDeVenteController.updateCenter)
router.delete("/:id", authMiddleware.checkAuth, authMiddleware.checkAdmin, PointDeVenteController.deleteCenter)

export default router