import postModel from "../models/postModel";
import UserModel from "../models/userModel";
import { HttpError } from "../models/errorModel";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { Types } from 'mongoose';

// creating a post POST (protected) - /api/posts
const createPost = async (req, res, next) => {
  try {
    let { title, category, description, developerLink } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(new HttpError("Fill in all required fields", 422));
    }
    const { thumbnail } = req.files;

    // check files size
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError(
          "File size is too large, please choose a file less than 2mb",
          422
        )
      );
    }

    let fileName = thumbnail.name;
    let splittedFileName = fileName.split(".");
    let newFileName =
      splittedFileName[0] +
      uuid() +
      "." +
      splittedFileName[splittedFileName.length - 1];

    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err, 403));
        } else {
          const newPost = await postModel.create({
            title,
            category,
            description,
            developerLink, 
            thumbnail: newFileName,
            creator: new Types.ObjectId(req.user.userId),
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
        }
      }
    );
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
    let fileName;
    let newFileName;
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description, developerLink } = req.body;

    if (!title || !category || description.length < 12) {
      return next(new HttpError("Please fill in all required fields", 400));
    }

    if (!req.files) {
      // No new thumbnail, update post without changing the thumbnail // || !req.files.thumbnail
      updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { title, category, description, developerLink },
        { new: true }
      );
    } else {
      const oldPost = await postModel.findById(postId);

    // check if user = postId
    const post = await postModel.findById(postId);
    const creatorId = new Types.ObjectId(req.user.userId);
    if (creatorId.equals(post.creator)) {
      // Delete old thumbnail
      fs.unlink(
        path.join(__dirname, "..", "/uploads", oldPost.thumbnail),
        async (err) => {
          if (err) {
            return next(new HttpError("Error replacing thumbnail", 422));
          }
        }
      );

      const {thumbnail} = req.files; // Use optional chaining // const thumbnail = req.files?.thumbnail; 

      // Check size
      if (thumbnail.size > 2000000) {
        return next(new HttpError("Thumbnail size is over 2mb", 422));
      }

      fileName = thumbnail.name;
let splittedFileName = fileName.split('.');
let fileExtension = splittedFileName.pop(); // Remove the last element (file extension)
newFileName =
  splittedFileName.join('.') +
  uuid() +
  '.' +
  fileExtension;

      thumbnail.mv(
        path.join(__dirname, "..", "/uploads", newFileName),
        async (err) => {
          if (err) {
            return next(
              new HttpError("New post image did not send correctly", 422)
            );
          }
        }
      );

      // Update post with a new thumbnail
      updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { title, category, description, thumbnail: newFileName, developerLink },
        { new: true }
      );
    }
  };
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
    const fileName = post?.thumbnail;

    // check if user = postId
    const creatorId = new Types.ObjectId(req.user.userId);
    // console.log('creatorId.equals(post.creator):', creatorId.equals(post.creator));

    if (creatorId.equals(post.creator)) {
      // delete thumbnail
      fs.unlink(path.join(__dirname, '..', '/uploads', fileName), async (err) => {
        if (err) {
          return next(new HttpError("Thumbnail not Found", 403));
        } else {
          await postModel.findByIdAndDelete(postId);
          // find user and remove 1 post
          const currentUser = await UserModel.findById(req.user.userId);
          const userPostCount = currentUser?.posts - 1;
          await UserModel.findByIdAndUpdate(req.user.userId, { posts: userPostCount });
          res.json(`Post ${postId} deleted Successfully`);
        }
      });
    } else {
      return next(new HttpError("Issue deleting Post", 403));
    }

  } catch (error) {
    console.error('Error in deletePost:', error);
    return next(new HttpError("Issue while trying to delete the Post", 404));
  }
};


export {
  createPost,
  getPosts,
  getLimitedPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
