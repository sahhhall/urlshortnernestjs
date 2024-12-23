import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Url extends Document {
    @Prop({ required: true })
    url: string

    @Prop({ required: true, unique: true })
    shortId: string

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Types.ObjectId

    @Prop({ default: 0 })
    clicks: number
}

export const urlSchema = SchemaFactory.createForClass(Url)