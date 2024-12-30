import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { IUserRepositary } from '../interfaces/user.repository.interface';
import { SignupDTO } from "../dtos/signup.dto";

@Injectable()
export class UserRepositary implements IUserRepositary {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    async create(userData: SignupDTO): Promise<User> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id);
    }
}