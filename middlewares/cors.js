// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://localhost:3000',
  'http://artmzbv.frontend.diplom.nomoredomains.monster/',
  'https://artmzbv.frontend.diplom.nomoredomains.monster/',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  // Сохраняем источник запроса в переменную origin. Браузер формирует его автоматически
  const { origin } = req.headers;
  // Сохраняем тип запроса (HTTP-метод)
  const { method } = req;
  // Проверяем, что источник запроса есть среди разрешённых
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
  // Access-Control-Allow-Origin — используется сервером и прикладывается к ответу.
  // Cписок источников, с которых можно осуществлять кросс-доменные запросы к конкретному ресурсу.
    res.header('Access-Control-Allow-Origin', origin);

    // Если это предварительный запрос, добавляем нужные заголовки
    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы с указанными типами
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      // разрешаем кросс-доменные запросы с заголовками
      res.header('Access-Control-Allow-Headers', requestHeaders);
      // завершаем обработку запроса и возвращаем результат клиенту
      return res.end();
    }
  }
  return next();
};

module.exports = cors;
