import {Schema, model} from 'mongoose';
import {PointDeVente} from '../../types/globals';

export const PointDeVenteschema = new Schema<PointDeVente>({
      weather : {
        type: String,
        required: true
    },

      location: {
        type: String,
        trim: true,
        required: true,
    },
      name:{
        type: String,
        trim: true,
        required: true,
    }

},
    {
     timestamps: true,
    }
);
export const PointDeVenteModel = model<PointDeVente>("pointDeVente", PointDeVenteschema);