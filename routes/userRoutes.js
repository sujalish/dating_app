const express = require('express');
const { getUserProfile, updateUserProfile, createUserProfile } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/profile').get(protect, getUserProfile)
.post(protect, createUserProfile)
.put(protect, updateUserProfile);


module.exports = router;
