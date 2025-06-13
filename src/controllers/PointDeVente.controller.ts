import { PointDeVenteService } from "../services/pointDeVente.service"
import { StatusCodes } from "http-status-codes"
import type { Request, Response, NextFunction } from "express"
import { ErrorResponseUtil, SuccessResponseUtil } from "../utils/Responses.util"

export class PointDeVenteController {
  static async getAllCenters(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const centers = await PointDeVenteService.getAllDistCenters()
      if (!centers  || centers .length === 0) {
        const errorResponse = new ErrorResponseUtil().setError("no centers found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "centers fetched successfully",
        data: centers ,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.error("Error fetching centers:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to fetch centers")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async getCenterByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    const centerID: string = req.params.id
    try {
      const center = await PointDeVenteService.getDistCenterByID(centerID)
      if (!center) {
        const errorResponse = new ErrorResponseUtil().setError("center not found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "center fetched successfully",
        data: center,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.log("error fetching center ")
      const errorResponse = new ErrorResponseUtil().setError("Failed to fetch center")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async createCenter(req: Request, res: Response, next: NextFunction): Promise<void> {
    const centerData = req.body
    try {
      const createdCenter = await PointDeVenteService.createDistCenter(centerData)
      const SuccessResponse = new SuccessResponseUtil({
        message: "center created successfully",
        data: createdCenter,
      })
      res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
      console.error("Error creating center:", error)
      const errorResponse = new ErrorResponseUtil().setError("filed to create center")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async updateCenter(req: Request, res: Response, next: NextFunction): Promise<void> {
    const centerID: string = req.params.id
    const centerData = req.body
    try {
      const updateCenter = await PointDeVenteService.updateDistCenter(centerID, centerData)
      if (!updateCenter) {
        const errorResponse = new ErrorResponseUtil().setError("center not found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "center updated successfully",
        data: updateCenter,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.error("Error updating center:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to update center")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async deleteCenter(req: Request, res: Response, next: NextFunction): Promise<void> {
    const centerID: string = req.params.id
    try {
      const deletedcenter = await PointDeVenteService.deleteDistCenter(centerID);
      if (!deletedcenter) {
        const errorResponse = new ErrorResponseUtil().setError("center not found")
        res.status(StatusCodes.NOT_FOUND).json(errorResponse)
        return
      }
      const successResponse = new SuccessResponseUtil({
        message: "center deleted successfully",
        data: deletedcenter,
      })
      res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      console.error("error deleting center:", error)
      const errorResponse = new ErrorResponseUtil().setError("failed to delete center")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }
}