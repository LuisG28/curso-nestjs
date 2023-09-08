import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {
    @Prop({ unique: true })
    tittle: string;

    @Prop()
    description: string;

    @Prop()
    source: string;

    @Prop()
    idUser: mongoose.Types.ObjectId;

    @Prop()
    idCourse: mongoose.Types.ObjectId;

    @Prop()
    score: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);