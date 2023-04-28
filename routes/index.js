const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const { postUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validatedUser, validatedUserId } = require('../utils/validation');
const NotFoundError = require('../utils/errors/NotFoundError');
const constants = require('../utils/constants');

router.post('/signin', validatedUserId, login);
router.post('/signup', validatedUser, postUser);

router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);

router.use(('/', auth, (req, res, next) => {
  next(new NotFoundError(constants.messages.pageError));
}));

module.exports = router;
