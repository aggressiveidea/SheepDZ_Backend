import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { RDVService } from "../services/rdv.service"
import { SuccessResponseUtil, ErrorResponseUtil } from "../utils/Responses.util"

export class RDVController {
  static async getAllRDVs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rdvs = await RDVService.getAllRDV()

      const success = new SuccessResponseUtil({
        message: "RDVs retrieved successfully",
        data: rdvs,
      })

      res.status(StatusCodes.OK).json(success)
    } catch (error: unknown) {
      console.error("Error getting RDVs:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to retrieve RDVs")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async getRDVById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const rdv = await RDVService.getRDVByID(id)

      if (!rdv) {
        const error = new ErrorResponseUtil().setError("RDV not found")
        res.status(StatusCodes.NOT_FOUND).json(error)
        return
      }

      const success = new SuccessResponseUtil({
        message: "RDV retrieved successfully",
        data: rdv,
      })

      res.status(StatusCodes.OK).json(success)
    } catch (error: unknown) {
      console.error("Error getting RDV:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to retrieve RDV")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async createRDV(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rdvData = req.body

      // Validate required fields
      if (!rdvData.userId || !rdvData.pointDeVenteId || !rdvData.date) {
        const error = new ErrorResponseUtil().setError("Missing required fields")
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
      }

      const newRDV = await RDVService.createAppointment({
        userId: rdvData.userId,
        pointDeVenteId: rdvData.pointDeVenteId,
        date: new Date(rdvData.date),
        status: rdvData.status || "pending",
      })

      const success = new SuccessResponseUtil({
        message: "RDV created successfully and notification email sent",
        data: newRDV,
      })

      res.status(StatusCodes.CREATED).json(success)
    } catch (error: unknown) {
      console.error("Error creating RDV:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to create RDV")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async updateRDV(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const rdvData = req.body

      const updatedRDV = await RDVService.updateAppointement(id, rdvData)

      if (!updatedRDV) {
        const error = new ErrorResponseUtil().setError("RDV not found")
        res.status(StatusCodes.NOT_FOUND).json(error)
        return
      }

      const success = new SuccessResponseUtil({
        message: "RDV updated successfully",
        data: updatedRDV,
      })

      res.status(StatusCodes.OK).json(success)
    } catch (error: unknown) {
      console.error("Error updating RDV:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to update RDV")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  static async deleteRDV(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const success = await RDVService.deleteAppointement(id)

      if (!success) {
        const error = new ErrorResponseUtil().setError("RDV not found")
        res.status(StatusCodes.NOT_FOUND).json(error)
        return
      }

      const successResponse = new SuccessResponseUtil({
        message: "RDV deleted successfully",
      })

      res.status(StatusCodes.OK).json(successResponse)
    } catch (error: unknown) {
      console.error("Error deleting RDV:", error)
      const errorResponse = new ErrorResponseUtil().setError("Failed to delete RDV")
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }
}
