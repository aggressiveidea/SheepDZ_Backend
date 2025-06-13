import { SheepService } from "../services/Sheep.service";
import { ErrorResponseUtil, SuccessResponseUtil } from "../utils/Responses.util";
import { StatusCodes } from "http-status-codes";
import {Request, Response, NextFunction} from 'express'

export class SheepController{
    static async getAllSheeps(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const sheeps = await SheepService.getAllSheeps();
          if (!sheeps || sheeps.length === 0) {
            const errorResponse = new ErrorResponseUtil().setError("no sheeps found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "sheeps fetched successfully",
            data: sheeps,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.error("Error fetching sheeps:", error)
          const errorResponse = new ErrorResponseUtil().setError("Failed to fetch sheeps")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
    
      static async getSheepByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        const sheepID: string = req.params.id
        try {
          const sheep = await SheepService.getSheepByID(sheepID)
          if (!sheep) {
            const errorResponse = new ErrorResponseUtil().setError("sheep not found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "sheep fetched successfully",
            data: sheep,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.log("error fetching sheep ")
          const errorResponse = new ErrorResponseUtil().setError("Failed to fetch sheep")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
      static async updateSheep(req: Request, res: Response, next: NextFunction): Promise<void> {
        const sheepID: string = req.params.id
        const sheepData = req.body
        try {
          const updateSheep = await SheepService.UpdateSheep(sheepID, sheepData)
          if (!updateSheep) {
            const errorResponse = new ErrorResponseUtil().setError("sheep not found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "sheep updated successfully",
            data: updateSheep,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.error("Error updating sheep:", error)
          const errorResponse = new ErrorResponseUtil().setError("Failed to update sheep")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
    
      static async deleteSheep(req: Request, res: Response, next: NextFunction): Promise<void> {
        const sheepID: string = req.params.id
        try {
          const deletedSheep = await SheepService.DeleteSheep(sheepID);
          if (!deletedSheep) {
            const errorResponse = new ErrorResponseUtil().setError("sheep not found")
            res.status(StatusCodes.NOT_FOUND).json(errorResponse)
            return
          }
          const successResponse = new SuccessResponseUtil({
            message: "sheep deleted successfully",
            data: deletedSheep,
          })
          res.status(StatusCodes.OK).json(successResponse)
        } catch (error) {
          console.error("error deleting sheep:", error)
          const errorResponse = new ErrorResponseUtil().setError("failed to delete sheep")
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        }
      }
}