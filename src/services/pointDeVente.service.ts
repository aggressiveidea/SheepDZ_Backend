import { PointDeVenteModel } from "../database/models/pointDeVente.model"
import type {  PointDeVente } from "../types/globals"

export class PointDeVenteService {
  static async getAllDistCenters(): Promise< PointDeVente[]> {
    try {
      const centers= await PointDeVenteModel.find()
      return centers
    } catch (error) {
      console.error("Error fetching distribution centers:", error)
      throw new Error("Failed to distribution centers fetch ")
    }
  }

  static async getDistCenterByID(id: string): Promise< PointDeVente | null> {
    try {
      const center = await PointDeVenteModel.findById(id)
      if (!center) {
        console.error("distribution centernot found with ID:", id)
        return null
      }
      return center
    } catch (error) {
      console.error("Error fetching distribution center by ID:", error)
      throw new Error("Failed to fetch distribution center by ID")
    }
  }

  static async createDistCenter(centerData:  PointDeVente): Promise< PointDeVente> {
    try {
      const newCenter = await PointDeVenteModel.create(centerData)
      return newCenter
    } catch (error) {
      console.error("Error creating distribution center:", error)
      throw new Error("Failed to create distribution center")
    }
  }

  static async updateDistCenter(id: string, centerData: Partial< PointDeVente>): Promise< PointDeVente | null> {
    try {
      const updatedCenter = await PointDeVenteModel.findByIdAndUpdate(id, centerData, { new: true })
      if (!updatedCenter) {
        console.log("distribution center not found")
        return null
      }
      return updatedCenter
    } catch (error) {
      console.error("Error updating distribution center:", error)
      throw new Error("Failed to update distribution center")
    }
  }

  static async deleteDistCenter(id: string): Promise<boolean> {
    try {
      const deletedCenter = await PointDeVenteModel.findByIdAndDelete(id)
      if (!deletedCenter) {
        console.error("distribution center not found with ID:", id)
        return false
      }
      return true
    } catch (error) {
      console.error("Error deleting distribution center:", error)
      throw new Error("Failed to delete distribution center")
    }
  }
}