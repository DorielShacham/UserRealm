import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, enum:["Portfolio",
    "Blog",
    "E-Commerce",
    "Social",
    "AI",
    "Educational",
    "Weather",
    "Real Estate",
    "Job Board",
    "Gaming",
    "Streaming",
    "Pet",
    "Space",
    "News",
    "Health",
    "Entertainment",
    "Travel",
    "Food",
    "Music",
    "Fashion",
    "Sports",
    "Crypto",
    "Mobile App",
    "Photography",
    "Dashboard",
    "Government",
    "Uncategorized"], message:"{VALUE IS NOT SUPPORTED}" },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true},
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    developerLink: { type: String },
},{timestamps: true});

const postModel = model('Post', postSchema);

export default postModel;
