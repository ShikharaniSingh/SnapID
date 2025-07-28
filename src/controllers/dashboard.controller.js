import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const { channelId } = req.params;

    const channel = await User.findById(channelId);
    if (!channel) {
        throw new ApiError(404, "Channel not found");
    }

    const videos = await Video.find({ owner: channelId });

    let totalViews = 0;
    let totalLikes = 0;
    let totalVideos = videos.length;

    videos.forEach((video) => {
        totalViews += video.views || 0;
        totalLikes += video.likes || 0;
    });

    const totalSubscribers = channel.subscribers.length;

    res.status(200).json(
        new ApiResponse(200, {
            totalViews,
            totalLikes,
            totalVideos,
            totalSubscribers
        }, "Channel stats fetched successfully")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const { channelId } = req.params;

    const videos = await Video.find({ owner: channelId }).sort({ createdAt: -1 });

    if (!videos || videos.length === 0) {
        throw new ApiError(404, "No videos found for this channel");
    }

    res.status(200).json(
        new ApiResponse(200, videos, "Channel videos fetched successfully")
    );
});

export {
    getChannelStats,
    getChannelVideos
}