import { Router } from "express"
import { RDVController } from "../controllers/RDV.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
router.get("/:id", authMiddleware.checkAuth, RDVController.getRDVById)
router.get("/", authMiddleware.checkAdmin, RDVController.getAllRDVs)
router.post("/", authMiddleware.checkAdmin, RDVController.createRDV)
router.put("/:id", authMiddleware.checkAdmin, RDVController.updateRDV)
router.delete("/:id", authMiddleware.checkAdmin, RDVController.deleteRDV)

export default router
