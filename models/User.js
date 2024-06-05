// Import necessary modules from Mongoose
const { Schema, model } = require('mongoose');

// Define the User schema
const userSchema = new Schema(
  {
    // Define the username field
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Define the email field with validation for email format
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    // Array of Thought ObjectIds referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // Array of Friend ObjectIds referencing the User model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Configure the schema to include virtual properties in JSON output
    toJSON: {
      virtuals: true,
    },
    // Disable the virtual 'id' field
    id: false,
  }
);

// Create a virtual property `friendCount` that retrieves the length of the friends array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
