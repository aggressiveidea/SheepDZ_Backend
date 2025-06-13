import nodemailer from "nodemailer"
import fs from "fs/promises"
import path from "path"
import Handlebars from "handlebars"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import type { EmailTemplateData } from "../types/globals"

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as SMTPTransport.Options)

  static async sendEmail(mailOptions: SMTPTransport.Options) {
    return this.transporter.sendMail(mailOptions)
  }

  static async loadTemplate(templateName: string): Promise<string> {
    try {
      // skill issue testing 
      const possiblePaths = [
        path.join(__dirname, "../templates", templateName), 
        path.join(process.cwd(), "src/templates", templateName), 
        path.join(process.cwd(), "templates", templateName),
        path.join(process.cwd(), "dist/templates", templateName), 
      ]

      for (const templatePath of possiblePaths) {
        try {
          return await fs.readFile(templatePath, "utf-8")
        } catch (err) {
          continue
        }
      }

      throw new Error(`Template ${templateName} not found in any of the expected locations`)
    } catch (error: unknown) {
      console.error("Error loading email template:", error)
      throw new Error("Failed to load email template")
    }
  }

  static async sendRDVConfirmationEmail(to: string, templateData: EmailTemplateData): Promise<boolean> {
    try {
      const templateSource = await this.loadTemplate("RDVTemplate.html")
      const template = Handlebars.compile(templateSource)
      const html = template(templateData)

      await this.sendEmail({
        from: `"Appointment System" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your Appointment Confirmation",
        html,
      } as SMTPTransport.Options)

      console.log(`RDV confirmation email sent to ${to}`)
      return true
    } catch (error: unknown) {
      console.error("Error sending RDV confirmation email:", error)
      return false
    }
  }

  static async sendRDVUpdateEmail(to: string, templateData: EmailTemplateData, status: string): Promise<boolean> {
    try {
      const templateSource = await this.loadTemplate("RDVTemplate.html")
      const template = Handlebars.compile(templateSource)

      const updatedTemplateData = {
        ...templateData,
        status,
        statusMessage: this.getStatusMessage(status),
      }

      const html = template(updatedTemplateData)

      await this.sendEmail({
        from: `"Appointment System" <${process.env.EMAIL_USER}>`,
        to,
        subject: `Your Appointment Has Been ${this.getStatusSubject(status)}`,
        html,
      } as SMTPTransport.Options)

      console.log(`RDV update email sent to ${to}`)
      return true
    } catch (error: unknown) {
      console.error("Error sending RDV update email:", error)
      return false
    }
  }

  private static getStatusMessage(status: string): string {
    switch (status) {
      case "confirmed":
        return "Your appointment has been confirmed. We look forward to seeing you!"
      case "cancelled":
        return "Your appointment has been cancelled. If you didn't request this cancellation, please contact us."
      case "completed":
        return "Your appointment has been marked as completed. Thank you for visiting us!"
      default:
        return "Your appointment status has been updated."
    }
  }

  private static getStatusSubject(status: string): string {
    switch (status) {
      case "confirmed":
        return "Confirmed"
      case "cancelled":
        return "Cancelled"
      case "completed":
        return "Completed"
      default:
        return "Updated"
    }
  }
}
