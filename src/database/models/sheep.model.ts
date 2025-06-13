import {Schema, model} from 'mongoose';
import {Sheep} from '../../types/globals';

export const Sheepschema = new Schema<Sheep>({
    price : {
        type: Number,
        required: true
    },
      race : {
        type: String,
        trim: true,
        required: true,
    },
    origin:{
        type: String,
        trim: true,
        required: true,
    },
     weight:{
        type: Number,
        required: true,
    },
      age:{
        type: Number,
        required: true,
    },
    health:{
        type: String,
        enum: ["good", "excelent", "sick"]
    },
    statue:{
        type: String,
        enums : ["available", "unavailable"],
    },
    imageUrl:{
        type: String,
        required: true,
    }
},
    {
     timestamps: true,
    }
);
export const sheepModel = model<Sheep>("sheep", Sheepschema);