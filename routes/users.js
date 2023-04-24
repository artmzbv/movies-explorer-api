const router = require('express').Router();
const {
  updateProfile, getProfile,
} = require('../controllers/users');
const {validatedProfile } = require('../utils/validation');

router.get('/users/me', getProfile);

router.patch('/users/me', validatedProfile, updateProfile);

module.exports = router;
