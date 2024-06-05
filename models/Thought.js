const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');


// Define the Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp) // Apply dateFormat getter to createdAt field
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema] // Array of reactions, assumed to be defined elsewhere
  },
  {
    toJSON: {
      getters: true // Enable getters to transform the response object
    },
    id: false // Disable the virtual 'id' field
  }
);

// Create a virtual property `reactionCount` that retrieves the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
