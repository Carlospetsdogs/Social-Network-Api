// Import the Router class from Express
const router = require('express').Router();

// Import the thought controller functions
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

// Define routes for thought collection
router.route('/')
    // GET request to fetch all thoughts
    .get(getThoughts)
    // POST request to create a new thought
    .post(createThought);

// Define routes for a single thought by thoughtId
router.route('/:thoughtId')
    // GET request to fetch a single thought by ID
    .get(getSingleThought)
    // PUT request to update a thought by ID
    .put(updateThought)
    // DELETE request to remove a thought by ID
    .delete(deleteThought);

// Define route for adding a reaction to a thought
router.route('/:thoughtId/reactions')
    // POST request to add a reaction to a thought
    .post(addReaction);

// Define route for removing a reaction from a thought by reactionId
router.route('/:thoughtId/reactions/:reactionId')
    // DELETE request to remove a reaction from a thought by reactionId
    .delete(removeReaction);

// Export the router module
module.exports = router;
