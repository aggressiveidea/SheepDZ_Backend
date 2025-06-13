export declare interface User {
  _id?: string;
  email: string;
  password: string;
  num_nat: number;
  receiptUrl?: string; 
  firstName: string;
  lastName: string;
  role: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

export declare interface Sheep {
  _id?: string;
  price: number;
  race: string;
  origin: string;
  weight: number; 
  age: number; 
  imageUrl?: string; 
}

export declare interface PointDeVente {
  _id?: string;
  weather?: string;
  location?: string;
  name?: string;     
  createdAt?: Date;
  updatedAt?: Date;
}
