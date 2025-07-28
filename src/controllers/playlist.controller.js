import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Playlist
const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) throw new ApiError(400, "Playlist name is required");

    const newPlaylist = await Playlist.create({
        name,
        description,
        owner: req.user._id,
        videos: [],
    });

    res.status(201).json(
        new ApiResponse(201, newPlaylist, "Playlist created successfully")
    );
});

// Get Playlists by User
const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const playlists = await Playlist.find({ owner: userId }).sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, playlists, "User playlists fetched successfully")
    );
});

// Get Single Playlist by ID
const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const playlist = await Playlist.findById(playlistId).populate("videos");

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    res.status(200).json(
        new ApiResponse(200, playlist, "Playlist details fetched successfully")
    );
});

// Add Video to Playlist
const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist or video ID");
    }

    const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user._id });

    if (!playlist) throw new ApiError(404, "Playlist not found or unauthorized");

    if (playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video already in playlist");
    }

    playlist.videos.push(videoId);
    await playlist.save();

    res.status(200).json(
        new ApiResponse(200, playlist, "Video added to playlist successfully")
    );
});

// Remove Video from Playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist or video ID");
    }

    const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user._id });

    if (!playlist) throw new ApiError(404, "Playlist not found or unauthorized");

    const index = playlist.videos.indexOf(videoId);
    if (index === -1) {
        throw new ApiError(404, "Video not found in playlist");
    }

    playlist.videos.splice(index, 1);
    await playlist.save();

    res.status(200).json(
        new ApiResponse(200, playlist, "Video removed from playlist successfully")
    );
});

// Delete Playlist
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const deleted = await Playlist.findOneAndDelete({
        _id: playlistId,
        owner: req.user._id,
    });

    if (!deleted) {
        throw new ApiError(404, "Playlist not found or unauthorized");
    }

    res.status(200).json(
        new ApiResponse(200, null, "Playlist deleted successfully")
    );
});

// Update Playlist
const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user._id });

    if (!playlist) throw new ApiError(404, "Playlist not found or unauthorized");

    if (name) playlist.name = name;
    if (description) playlist.description = description;

    await playlist.save();

    res.status(200).json(
        new ApiResponse(200, playlist, "Playlist updated successfully")
    );
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
