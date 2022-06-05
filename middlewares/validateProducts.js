const Joi = require('joi');

const validate = (req, _res, next) => {
  const { name, quantity } = req.body;

  // body validation
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).greater(0).required(),
  }).validate({ name, quantity });

  // in case of error:
  if (schema.error) return next(schema.error);

  // in case of success:
  next();
};

module.exports = validate;
