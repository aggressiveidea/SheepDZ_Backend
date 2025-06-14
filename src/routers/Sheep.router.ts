import { SheepController } from "../controllers/Sheep.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get('/all', SheepController.getAllSheeps);
router.get('/:id', SheepController.getSheepByID);
router.put('/:id', authMiddleware.checkAdmin,  SheepController.updateSheep);
router.delete('/:id', authMiddleware.checkAdmin, SheepController.deleteSheep);
router.post('/', authMiddleware.checkAdmin, SheepController.createSheep);
export default router; 