import { ClientRDVModel } from "../database/models/ClientRDV.model"
import { EmailService } from "../services/email.service"
import type { UserRDV, EmailTemplateData } from "../types/globals"

export class RDVService {
  static async getAllRDV() {
    try {
      const rdvs = await ClientRDVModel.find()
        .populate("userId", "firstName lastName email")
        .populate("pointDeVenteId", "name location")
      return rdvs
    } catch (error: unknown) {
      console.error("Error fetching appointements:", error)
      throw new Error("Failed to fetch appointements")
    }
  }

  static async getRDVByID(RDVid: string) {
    try {
      const rdv = await ClientRDVModel.findById(RDVid)
        .populate("userId", "firstName lastName email")
        .populate("pointDeVenteId", "name location")
      if (!rdv) {
        return null
      }
      return rdv
    } catch (error: unknown) {
      console.error("Error fetching appointement:", error)
      throw new Error("Failed to fetch appointement")
    }
  }

  static async createAppointment(RDVdata: Partial<UserRDV>) {
    try {
   
      const newRDV = await ClientRDVModel.create(RDVdata)
      await this.sendAppointmentEmail(newRDV._id!.toString())

      return newRDV
    } catch (error: unknown) {
      console.error("Error creating appointement:", error)
      throw new Error("Failed to create appointement")
    }
  }

  static async updateAppointement(RDVid: string, RDVdata: Partial<UserRDV>) {
    try {
      const currentRDV = await ClientRDVModel.findById(RDVid)
      const updatedRDV = await ClientRDVModel.findByIdAndUpdate(RDVid, RDVdata, { new: true })

      if (!updatedRDV) {
        return null
      }
      if (currentRDV && RDVdata.status && currentRDV.status !== RDVdata.status) {
        await this.sendAppointmentUpdateEmail(RDVid, RDVdata.status)
      }

      return updatedRDV
    } catch (error: unknown) {
      console.error("Error updating appointement:", error)
      throw new Error("Failed to update appointement")
    }
  }

  static async deleteAppointement(RDVid: string) {
    try {
      const deletedRDV = await ClientRDVModel.findByIdAndDelete(RDVid)
      if (!deletedRDV) {
        return false
      }
      return true
    } catch (error: unknown) {
      console.error("Error deleting appointement:", error)
      throw new Error("Failed to delete appointement")
    }
  }

  private static async sendAppointmentEmail(rdvId: string): Promise<boolean> {
    try {
      const rdv = await ClientRDVModel.findById(rdvId)
        .populate("userId", "firstName lastName email")
        .populate("pointDeVenteId", "name location")

      if (!rdv || !rdv.userId || !rdv.pointDeVenteId) {
        console.error("Cannot send email: RDV, user, or point of sale not found")
        return false
      }
      const user = rdv.userId as any 
      const pointDeVente = rdv.pointDeVenteId as any 

      if (!user || !user.email || !user.firstName) {
        console.error("Cannot send email: User details incomplete")
        return false
      }

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(rdv.date)

      const templateData: EmailTemplateData = {
        userName: `${user.firstName} ${user.lastName || ""}`,
        formattedDate,
        location: pointDeVente.location || "Our location",
        pointDeVenteName: pointDeVente.name || "Our store",
        year: new Date().getFullYear(),
      }
      return await EmailService.sendRDVConfirmationEmail(user.email, templateData)
    } catch (error: unknown) {
      console.error("Error sending appointment email:", error)
      return false
    }
  }

  private static async sendAppointmentUpdateEmail(rdvId: string, status: string): Promise<boolean> {
    try {
      const rdv = await ClientRDVModel.findById(rdvId)
        .populate("userId", "firstName lastName email")
        .populate("pointDeVenteId", "name location")

      if (!rdv || !rdv.userId || !rdv.pointDeVenteId) {
        console.error("Cannot send update email: RDV, user, or point of sale not found")
        return false
      }

      const user = rdv.userId as any 
      const pointDeVente = rdv.pointDeVenteId as any 

      if (!user || !user.email || !user.firstName) {
        console.error("Cannot send update email: User details incomplete")
        return false
      }
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(rdv.date)

      const templateData: EmailTemplateData = {
        userName: `${user.firstName} ${user.lastName || ""}`,
        formattedDate,
        location: pointDeVente.location || "Our location",
        pointDeVenteName: pointDeVente.name || "Our store",
        year: new Date().getFullYear(),
      }

      return await EmailService.sendRDVUpdateEmail(user.email, templateData, status)
    } catch (error: unknown) {
      console.error("Error sending appointment update email:", error)
      return false
    }
  }
}
