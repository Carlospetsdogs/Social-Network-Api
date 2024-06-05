// Import the Router class from Express
const router = require('express').Router();

// Import the API routes module
const apiRoutes = require('./api');

// Mount the API routes at the /api path
router.use('/api', apiRoutes);

// Handle all other routes that are not defined
router.use((req, res) => {
    // Send a response indicating the route is incorrect
    return res.send('Incorrect route!');
});

// Export the router module
module.exports = router;
