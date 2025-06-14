import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { RequestPasswordResetSchema, ResetPasswordSchema } from "../types/validation.schemas"
import { ErrorResponseUtil } from "../utils/Responses.util"

export const validatePasswordResetRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    RequestPasswordResetSchema.parse(req.body)
    next()
  } catch (error: any) {
    const errorResponse = new ErrorResponseUtil().setError(error.errors?.[0]?.message || "Invalid request data")
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
  }
}

export const validatePasswordReset = (req: Request, res: Response, next: NextFunction) => {
  try {
    ResetPasswordSchema.parse(req.body)
    next()
  } catch (error: any) {
    const errorResponse = new ErrorResponseUtil().setError(error.errors?.[0]?.message || "Invalid request data")
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
  }
}
