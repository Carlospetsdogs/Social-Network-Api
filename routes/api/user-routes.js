// Import the Router class from Express
const router = require('express').Router();

// Import the user controller functions
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// Define routes for user collection
router.route('/')
    // GET request to fetch all users
    .get(getUsers)
    // POST request to create a new user
    .post(createUser);

// Define routes for a single user by userId
router.route('/:userId')
    // GET request to fetch a single user by ID
    .get(getSingleUser)
    // PUT request to update a user by ID
    .put(updateUser)
    // DELETE request to remove a user by ID
    .delete(deleteUser);

// Define routes for managing friends of a user
router.route('/:userId/friends/:friendId')
    // POST request to add a friend to a user
    .post(addFriend)
    // DELETE request to remove a friend from a user
    .delete(removeFriend);

// Export the router module
module.exports = router;
