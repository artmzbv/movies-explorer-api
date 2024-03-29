const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const constants = require('../utils/constants');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const ConflictError = require('../utils/errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === constants.codes.wrongCode) {
        next(new ConflictError(constants.messages.conflictError));
      } else if (err.name === constants.names.validationError) {
        next(new ValidationError(constants.messages.validationError));
      } else {
        next(err);
      }
    });
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(constants.messages.searchError));
      } else {
        res.send({
          data: user,
        });
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(constants.messages.searchError));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        next(new ValidationError(constants.messages.userDataError));
        return;
      }
      if (err.code === constants.codes.wrongCode) {
        next(new ConflictError(constants.messages.conflictError));
      }
    });
};
