const { User, Thought } = require('../models');

const userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find().populate("thoughts").populate("friends").select('-__v');
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get single user by ID
  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a user and their associated thoughts
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      // Delete associated thoughts
      await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to user's friend list
  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend from user's friend list
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
