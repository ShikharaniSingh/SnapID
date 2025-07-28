import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const userId = req.user?._id;
    const { content, image } = req.body;

    if (!content) {
        throw new ApiError(400, "Tweet content is required");
    }

    const tweet = await Tweet.create({
        content,
        image,
        owner: userId,
    });

    await User.findByIdAndUpdate(userId, {
        $push: { tweets: tweet._id },
    });

    res.status(201).json(new ApiResponse(201, tweet, "Tweet created successfully")
    );
});

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const tweets = await Tweet.find({ owner: userId }).sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, tweets, "User tweets fetched successfully")
    );
});

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params;
    const { content, image } = req.body;
    const userId = req.user?._id;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this tweet");
    }

    tweet.content = content || tweet.content;
    tweet.image = image || tweet.image;
    await tweet.save();

    res.status(200).json(new ApiResponse(200, tweet, "Tweet updated successfully")
    );
});

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this tweet");
    }

    await Tweet.findByIdAndDelete(tweetId);

    await User.findByIdAndUpdate(userId, {
        $pull: { tweets: tweetId },
    });

    res.status(200).json(new ApiResponse(200, null, "Tweet deleted successfully")
    );
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}