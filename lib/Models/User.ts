import mongoose,{Document,Schema,Model} from "mongoose";

export interface UserDocument extends Document{
    name: String,
    email: String,
    avatar:String
}


const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
});

// const User = mongoose.model<UserDocument>("User", userSchema);
let UserModel: Model<UserDocument>;
if (mongoose.models.User) {
  UserModel = mongoose.model<UserDocument>('User');
} else {
  UserModel = mongoose.model<UserDocument>('User', userSchema);
}

export default UserModel;