const express = require('express');
const router = express.Router();
const socialService = require('../services/socialService');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/social/activities
// @desc    Create a new social activity (e.g., post, watched, rated)
// @access  Private
router.post('/activities', authMiddleware, async (req, res) => {
    const { type, movieId, tvShowId, rating, text, targetUserId, targetActivityId } = req.body;
    const userId = req.user.id; // User ID from authMiddleware

    try {
        const newActivity = await socialService.createActivity(
            userId, // First argument
            type,   // Second argument
            {       // Third argument (the 'data' object)
                movieId,
                tvShowId,
                rating,
                text,
                targetUserId,
                targetActivityId
            }
        );
        res.status(201).json(newActivity);
    } catch (error) {
        console.error('Error in socialRoutes POST /activities:', error);
        res.status(500).json({ message: error.message || 'Failed to create activity.' });
    }
});

// @route   GET /api/social/feed
// @desc    Get personalized social feed for the authenticated user
// @access  Private
router.get('/feed', authMiddleware, async (req, res) => {
    const userId = req.user.id; // User ID from authMiddleware
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit, adjust as needed

    try {
        const feed = await socialService.getFeed(userId, page, limit); // Pass limit to getFeed
        res.json(feed);
    } catch (error) {
        console.error('Error in socialRoutes GET /feed:', error);
        res.status(500).json({ message: error.message || 'Failed to fetch social feed.' });
    }
});

module.exports = router;


