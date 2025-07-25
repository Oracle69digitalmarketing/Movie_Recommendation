const Activity = require('../models/Activity');
const User = require('../models/User'); // Assuming you have a User model here

/**
 * Creates a new social activity.
 * @param {string} userId - ID of the user performing the activity.
 * @param {string} type - Type of activity (e.g., 'post', 'rated', 'added_to_watchlist').
 * @param {object} data - Object containing activity-specific data (movieId, rating, text, etc.).
 * @returns {Promise<object>} The created activity document.
 */
const createActivity = async (userId, type, data = {}) => {
    try {
        const newActivity = new Activity({
            userId,
            type,
            ...data // Spread operator to include movieId, rating, text, targetUserId, targetActivityId etc.
        });
        await newActivity.save();
        return newActivity;
    } catch (error) {
        console.error('Error creating activity:', error.message);
        throw new Error('Failed to create activity.');
    }
};

/**
 * Fetches the personalized activity feed for a given user.
 * This includes activities from users the current user follows.
 * @param {string} currentUserId - The ID of the authenticated user.
 * @param {number} page - Current page number for pagination.
 * @param {number} limit - Number of activities per page.
 * @returns {Promise<object[]>} Array of activity documents.
 */
const getFeed = async (currentUserId, page = 1, limit = 10) => {
    try {
        // Find the current user to get their 'following' list
        const user = await User.findById(currentUserId).select('following').lean();

        if (!user) {
            // If user not found, return an empty array or throw an error
            console.warn(`User with ID ${currentUserId} not found for feed generation.`);
            return [];
        }

        // Get IDs of users the current user is following
        const followingIds = user.following || [];

        // Add the current user's own ID to include their activities in their feed (optional, but common)
        followingIds.push(currentUserId);

        // Fetch activities from these users
        const feed = await Activity.find({
            userId: { $in: followingIds },
            // Exclude specific types if desired, e.g., 'commented', 'liked' if you want these to be nested
            // type: { $nin: ['commented', 'liked'] }
        })
        .sort({ createdAt: -1 }) // Sort by most recent
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('userId', 'username profilePicture') // Populate user details
        .populate('movieId', 'title poster_path') // Populate movie details
        // Add other .populate calls as needed (e.g., 'tvShowId', 'targetUserId', 'targetActivityId')
        .lean(); // Use .lean() for faster execution if you don't need Mongoose documents

        return feed;
    } catch (error) {
        console.error('Error fetching social feed:', error.message);
        throw new Error('Failed to fetch social feed.');
    }
};

module.exports = {
    createActivity,
    getFeed
};

