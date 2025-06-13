import { sheepModel } from "../database/models/sheep.model";
import {Sheep} from "../types/globals"

export class SheepService {
    static async getAllSheeps() {
      try {
        const sheeps = await sheepModel.find();
        return sheeps; 
      } catch (error) {
        console.error("Error fetching sheeps:", error);
        throw new Error("Failed to fetch sheeps");
      }
    }
  
    static async getSheepByID(id: string) {
      try {
        const sheep = await sheepModel.findById(id);
        if (!sheep) {
          return null;
        }
        return sheep;
      } catch (error) {
        console.error(`Error fetching the sheep with id ${id}:`, error);
        throw new Error("Failed to get thar sheep");
      }
    }
  
    static async UpdateSheep(id: string, data: Partial<Sheep>) {
      try {
        const updatedSheep = await sheepModel.findByIdAndUpdate(id, data);
        if (!updatedSheep) {
          return null;
        }
        return updatedSheep;
      } catch (error) {
        console.error("Failed to update the sheep:", error);
        throw new Error("Failed to update sheep");
      }
    }
  
    static async DeleteSheep(id: string) {
      try {
        const deletedSheep = await sheepModel.findByIdAndDelete(id); 
        return !!deletedSheep; 
      } catch (error) {
        console.error("Failed to delete the sheep:", error);
        throw new Error("Failed to delete sheep");
      }
    }
}