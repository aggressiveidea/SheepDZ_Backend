import { SheepController } from "../controllers/Sheep.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get('/all', authMiddleware.checkAdmin,  SheepController.getAllSheeps);
router.get('/:id', authMiddleware.checkAdmin,  SheepController.getSheepByID);
router.put('/:id', authMiddleware.checkAdmin,  SheepController.updateSheep);
router.delete('/:id', authMiddleware.checkAdmin, SheepController.deleteSheep);

export default router; 