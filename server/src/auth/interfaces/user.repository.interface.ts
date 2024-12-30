import { SignupDTO } from "../dtos/signup.dto";
import { User } from "../schemas/user.schema";


export interface IUserRepositary {
    findByEmail(email: string): Promise<User | null>
    create(userData: SignupDTO): Promise<User>
    findById(id: string): Promise<User | null>
}