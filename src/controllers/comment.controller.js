import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { text } from "express"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params;
    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Comment text required");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const newComment = {
        user: req.user._id,
        text
    };

    video.comments.push(newComment);
    await video.save();

    res.status(201).json(
        new ApiResponse(201, { comments: video.comments }, "Comment added successfully")
    );
});

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { videoId, commentId } = req.params;
    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Updated text is required");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comment = video.comments.id(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Optional: allow only the author to update
    if (comment.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only edit your own comments");
    }

    comment.text = text;
    await video.save();

    res.status(200).json(
        new ApiResponse(200, { comment }, "Comment updated successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { videoId, commentId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comment = video.comments.id(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Only allow the comment owner (or optionally an admin) to delete
    if (comment.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own comment");
    }

    comment.remove(); // Remove subdocument
    await video.save();

    res.status(200).json(
        new ApiResponse(200, {}, "Comment deleted successfully")
    );
});

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}