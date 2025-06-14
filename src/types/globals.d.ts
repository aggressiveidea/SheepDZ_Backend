import type { Types } from "mongoose"

export declare interface User {
  _id?: string | Types.ObjectId
  email: string
  password: string
  num_nat: number
  receiptUrl?: string
  firstName: string
  lastName: string
  role: string
  address: string
  createdAt?: Date
  updatedAt?: Date

}

export declare interface Sheep {
  _id?: string | Types.ObjectId
  price: number
  race: string
  origin: string
  weight: number
  age: number
  imageUrl?: string
  health?: string
  statue?: string
}

export declare interface PointDeVente {
  _id?: string | Types.ObjectId
  weather?: string
  location?: string
  name?: string
  createdAt?: Date
  updatedAt?: Date
}

export declare interface UserRDV {
  _id?: string | Types.ObjectId
  userId: string | Types.ObjectId
  pointDeVenteId: string | Types.ObjectId
  date: Date
  status: string
  createdAt?: Date
  updatedAt?: Date
}

export declare interface EmailTemplateData {
  userName: string
  formattedDate: string
  location: string
  pointDeVenteName: string
  year: number
}
