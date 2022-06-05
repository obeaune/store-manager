const Joi = require('joi');

const validate = (req, _res, next) => {
  // received as an array of objects
  const salesArr = req.body;

  const schema = Joi.object({
    productId: Joi.number().min(1).greater(0).required(),
    quantity: Joi.number().min(1).greater(0).required(),
  });

  // validating all objects inside the array
  salesArr.forEach(({ productId, quantity }) => {
    const { error } = schema.validate({ productId, quantity });
    // in case of error:
    if (error) return next(error);
  });

  // in case of success:
  next();
};

module.exports = validate;
