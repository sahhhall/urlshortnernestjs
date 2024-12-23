import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//Prop here to use maps 

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string;
};

//shema factory using for generate mongoose shema from class 
export const UserSchema = SchemaFactory.createForClass(User)
