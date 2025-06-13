import nodemailer from "nodemailer"
import fs from "fs/promises"
import path from "path"
import Handlebars from "handlebars"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { EmailTemplateData } from "../types/globals"
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

  static async loadTemplate(templatePath: string): Promise<string> {
    try {
      return await fs.readFile(templatePath, "utf-8")
    } catch (error) {
      console.error("Error loading email template:", error)
      throw new Error("Failed to load email template")
    }
  }

  static async sendRDVConfirmationEmail(to: string, templateData: EmailTemplateData): Promise<boolean> {
    try {
      const templatePath = path.join(__dirname, "../templates/RDVTemplate.html")
      const templateSource = await this.loadTemplate(templatePath)
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
    } catch (error) {
      console.error("Error sending RDV confirmation email:", error)
      return false
    }
  }
}
