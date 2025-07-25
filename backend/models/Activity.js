const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to your User model
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['post', 'watched', 'rated', 'added_to_watchlist', 'commented', 'liked', 'followed']
        // Expand this enum as more activity types are introduced
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you have a Movie model
        ref: 'Movie',
        required: function() {
            // Movie ID is required for 'watched', 'rated', 'added_to_watchlist' types
            return ['watched', 'rated', 'added_to_watchlist'].includes(this.type);
        }
    },
    tvShowId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you have a TVShow model
        ref: 'TVShow',
        required: function() {
            // TV Show ID is required for 'watched', 'rated', 'added_to_watchlist' types (if applicable to TV shows)
            // Adjust this logic if TV show activities are handled differently
            return false; // For now, assume mainly movie-centric, adjust as needed
        }
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: function() {
            return this.type === 'rated';
        }
    },
    text: {
        type: String,
        trim: true,
        maxlength: 500, // Limit post/comment length
        required: function() {
            return ['post', 'commented'].includes(this.type);
        }
    },
    targetUserId: {
        type: mongoose.Schema.Types.ObjectId, // For 'followed' type
        ref: 'User',
        required: function() {
            return this.type === 'followed';
        }
    },
    targetActivityId: {
        type: mongoose.Schema.Types.ObjectId, // For 'liked' or 'commented' on an existing activity
        ref: 'Activity',
        required: function() {
            return ['commented', 'liked'].includes(this.type);
        }
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for efficient querying
ActivitySchema.index({ userId: 1, createdAt: -1 }); // For fetching a user's own activities
ActivitySchema.index({ type: 1, createdAt: -1 }); // For general activity types
ActivitySchema.index({ movieId: 1, type: 1 }); // For activities related to a specific movie

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;

