const ErrorHandler = (err, _req, res, _next) => {
  const options = {
    'string.min': 422,
    'number.min': 422,
    'any.required': 400,
  };

  if (err.isJoi) {
    const statusCode = err.details[0].type;
    return res.status(options[statusCode]).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

module.exports = ErrorHandler;
