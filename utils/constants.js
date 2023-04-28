const constants = {
  names: {
    castError: 'CastError',
    validationError: 'ValidationError',
  },
  codes: {
    wrongCode: 11000,
  },
  messages: {
    searchError: 'Запрашиваемый пользователь не найден',
    movieError: 'Запрашиваемый фильм не найден',
    deletedMovie: 'Вы удалили фильм',
    pageError: 'Страница не найдена',
    movieRightError: 'У вас нет прав на удаление этого фильма',
    validationError: 'Переданы неправильные данные',
    movieDataError: 'Переданы некорректные данные фильма',
    userDataError: 'Переданы некорректные данные при пользователя',
    conflictError: 'Такой пользователь уже есть',
    forbiddenError: 'Нет прав для удаления',
    emailError: 'Email введен неправильно',
  },
};

module.exports = constants;
