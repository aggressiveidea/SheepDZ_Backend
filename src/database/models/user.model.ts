import {Schema, model} from 'mongoose';
import {User} from '../../types/globals';
import { request } from 'node:http';

export const Userschema = new Schema<User>({
    email : {
        type: String,
        trim: true,
        required: true
    },
     password: {
        type: String,
        trim: true,
        required: true
    },
      firstName: {
        type: String,
        trim: true,
        required: true
    },
      lastName : {
        type: String,
        trim: true,
        required: true
    },
      role : {
        type: String,
        trim: true,
        required: false,
        enum: ['user', 'admin'],
        default: 'user'
    },
    num_nat: {
        type: Number,
        required: true,
    },
    address:{
      type: String,
      required: true,
      trim: true,
    },
      receiptUrl: {
        type: String,
        required: true,
    },


},
    {
     timestamps: true,
    }
);
export const userModel = model<User>("user", Userschema);