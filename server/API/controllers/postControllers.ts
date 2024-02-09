import postModel from "../models/postModel";
import UserModel from "../models/userModel";
import { HttpError } from "../models/errorModel";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { Types } from 'mongoose';

// Like a Post POST (protected) - /api/posts/:postId/like
const likePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    const post = await postModel.findById(postId);
    if (post.likes.includes(userId)) {
      return next(new HttpError("User has already liked this post", 400));
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    return next(new HttpError("Error liking post", 500));
  }
};

// creating a post POST (protected) - /api/posts
const createPost = async (req, res, next) => {
  try {
    let { title, category, description, developerLink, thumbnail } = req.body;
    if (!title || !category || !description || !thumbnail) {
      return next(new HttpError("Fill in all required fields", 422));
    }

    const newPost = await postModel.create({
      title,
      category,
      description,
      developerLink, 
      thumbnail,
      creator: new Types.ObjectId(req.user.userId),
      likes: [],
    });

    // add user posts by 1
    const currentUser = await UserModel.findById(req.user.userId);
    if (!currentUser) {
      return next(new HttpError("Current user not found", 404));
    }

    const userPostCount = currentUser.posts + 1;
    await UserModel.findByIdAndUpdate(req.user.userId, {
      posts: userPostCount,
    });

    res.status(201).json(newPost);
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// get all posts GET (unprotected) - /api/posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// get limited posts GET (unprotected) - /api/posts/limited
const getLimitedPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const limitedPosts = await postModel.find().sort({ createdAt: -1 }).limit(limit);
    res.status(200).json(limitedPosts);
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// get a single post GET (unprotected) - /api/posts/:id
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) {
      return next(new HttpError("Post was not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError("User was not found", 404));
  }
};

// get post by category GET (unprotected) - /api/posts/categories/:category
const getCatPosts = async (req, res, next) => {
  try {
    const category = req.params.category;
    const posts = await postModel.find({ category }).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return next(new HttpError("Category posts not found", 404));
    }

    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError("Internal Server Error", 500));
  }
};

// get post by username GET (unprotected) - /api/posts/users/:id
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await postModel.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError("Users posts were not found", 404));
  }
};

// Edit Post PATCH (protected) - /api/posts/:id
const editPost = async (req, res, next) => {
  try {
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description, developerLink, thumbnail } = req.body;

    if (!title || !category || description.length < 12 || !thumbnail) {
      return next(new HttpError("Please fill in all required fields", 400));
    }

    // Update post with the new thumbnail
    updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { title, category, description, thumbnail, developerLink },
      { new: true }
    );

    if (!updatedPost) {
      return next(new HttpError("Issue while updating the post", 400));
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Async operation failed:", error);
    return next(new HttpError("Issue while editing the post", 500));
  }
};

// Delete Post DELETE (protected) - /api/posts/:id
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post not Found", 400));
    }
    const post = await postModel.findById(postId);

    if (!post) {
      return next(new HttpError("Post not found", 404));
    }

    if (post.creator.toString() !== req.user.userId) {
      return next(new HttpError("Unauthorized to delete this post", 403));
    }

    await postModel.findByIdAndDelete(postId);
    await UserModel.findByIdAndUpdate(req.user.userId, { $inc: { posts: -1 } });

    res.json(`Post ${postId} deleted Successfully`);
  } catch (error) {
    console.error('Error in deletePost:', error);
    return next(new HttpError("Issue while trying to delete the Post", 500));
  }
};



export {
  likePost,
  createPost,
  getPosts,
  getLimitedPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
