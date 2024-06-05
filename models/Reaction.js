// Import necessary modules from Mongoose
const { Schema, Types } = require('mongoose');
// Import the dateFormat utility function
const dateFormat = require('../utils/dateFormat');

// Define the Reaction schema
const reactionSchema = new Schema(
    {
        // Define the reactionId field, which is an ObjectId and has a default value
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // Define the reactionBody field, which is a string and is required with a max length of 280
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        // Define the username field, which is a string and is required
        username: {
            type: String,
            required: true
        },
        // Define the createdAt field, which is a date with a default value and a getter to format the timestamp
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        // Configure the schema to include getters in JSON output
        toJSON: {
            getters: true
        },
        // Disable the virtual 'id' field
        id: false
    }
);

// Export the reactionSchema
module.exports = reactionSchema;
