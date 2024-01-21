import mongoose, { Document, Schema, Model } from "mongoose";
import UserModel from "./User";

export interface NoteDocument extends Document {
    icon: String;
    content: String;
    author: mongoose.Types.ObjectId;
    title: String;
}

const noteSchema = new Schema<NoteDocument>({
    icon: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

let NoteModel: Model<NoteDocument>;
if (mongoose.models.Note) {
    NoteModel = mongoose.model<NoteDocument>("Note");
} else {
    NoteModel = mongoose.model<NoteDocument>("Note", noteSchema);
}
export default NoteModel;
