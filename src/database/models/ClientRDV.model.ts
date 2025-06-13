import { Schema, model } from "mongoose"
import type { UserRDV } from "../../types/globals"

export const ClientRDVSchema = new Schema<UserRDV>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pointDeVenteId: {
      type: Schema.Types.ObjectId,
      ref: "pointDeVente",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

export const ClientRDVModel = model<UserRDV>("clientRDV", ClientRDVSchema)
