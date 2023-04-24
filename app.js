require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { postUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');
const { validatedUser, validatedUserId } = require('./utils/validation');
const errorHandler = require('./utils/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;
const constants = require('./utils/constants');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use(cors);
app.use(helmet());

app.post('/signin', validatedUserId, login);
app.post('/signup', validatedUser, postUser);

app.use('/', auth, userRouter);
app.use('/', auth, movieRouter);

app.use(('/', auth, (req, res, next) => {
  next(new NotFoundError(constants.messages.pageError));
}));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
