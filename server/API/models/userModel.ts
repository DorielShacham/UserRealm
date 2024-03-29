import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    posts: { type: Number, default: 0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const UserModel = model('User', userSchema);

export default UserModel;
