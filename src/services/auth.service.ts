import { userModel } from "../database/models/user.model";
import { bcryptUtil } from "../utils/bcrypt.util";
import { JwtUtil } from "../utils/jwt.util";

export class AuthService{
    static async Login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcryptUtil.compare(password, user.password);
    if (!isPasswordCorrect) {
      return null;
    }

    const authToken = await JwtUtil.createToken(user.id);
    const data = {
      token: authToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        num_nat: user.num_nat,
        receiptUrl: user.receiptUrl,
      },
    };
    return data;
  }
  static async RegisterUser(email: string, password: string, firstName:string, lastName: string, role: string, num_nat: number, receiptUrl: string){
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return null
    }
      const hashedPass = await bcryptUtil.hash(password);
    const user = await userModel.create({
      email,
      password: hashedPass,
      firstName,
      lastName,
      role,
      num_nat,
      receiptUrl,
    });

    if (!user) {
      return null;
    }
      const authToken = await JwtUtil.createToken(user.id);
    const data = {
      token: authToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        num_cat : user.num_nat,
        receiptUrl: user.receiptUrl
      },
    };

    return data

  }
}