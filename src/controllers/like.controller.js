import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: toggle like on video

    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Video not found");

    const userId = req.user._id.toString();
    const index = video.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
        video.likes.push(userId); // like
    } else {
        video.likes.splice(index, 1); // unlike
    }

    await video.save();

    res.status(200).json(new ApiResponse(200, { liked: index === -1 }, "Video like toggled")
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    //TODO: toggle like on comment

    const video = await Video.findOne({ "comments._id": commentId });
    if (!video) throw new ApiError(404, "Comment not found");

    const comment = video.comments.id(commentId);
    const userId = req.user._id.toString();

    const index = comment.likes?.findIndex(id => id.toString() === userId) ?? -1;

    if (index === -1) {
        comment.likes = comment.likes || [];
        comment.likes.push(userId); // like
    } else {
        comment.likes.splice(index, 1); // unlike
    }

    await video.save();

    res.status(200).json(new ApiResponse(200, { liked: index === -1 }, "Comment like toggled")
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    //TODO: toggle like on tweet

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) throw new ApiError(404, "Tweet not found");

    const userId = req.user._id.toString();
    const index = tweet.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
        tweet.likes.push(userId); // like
    } else {
        tweet.likes.splice(index, 1); // unlike
    }

    await tweet.save();

    res.status(200).json(new ApiResponse(200, { liked: index === -1 }, "Tweet like toggled")
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId = req.user._id;

    const likedVideos = await Video.find({ likes: userId }).sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, likedVideos, "Fetched all liked videos successfully")
    );
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}