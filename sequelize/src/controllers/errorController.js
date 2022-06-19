const error404 = (req, res, next) => {
  const error = new Error(`${req.url} ${req.method} 존재하지 않습니다.`);
  error.status = 404;
  return next(error);
}

const error = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(500);
  return res.render("error");
}

export {
  error404,
  error,
}