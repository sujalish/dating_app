const User = require('../models/User');

getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

const createUserProfile = async (req, res) => {
  try {
    const { username, email, password, gender, dateOfBirth, location, bio, photos, preferences } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      gender,
      dateOfBirth,
      location,
      bio,
      photos,
      preferences,
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.bio = req.body.bio || user.bio;
      user.photos = req.body.photos || user.photos;
      user.preferences = req.body.preferences || user.preferences;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  createUserProfile
};
