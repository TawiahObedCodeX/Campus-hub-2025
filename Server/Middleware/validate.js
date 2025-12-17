import Joi from 'joi';

const validateSignup = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .label('Email'),

    phone: Joi.string()
      .required()
      .label('Phone number'),

    password: Joi.string()
      .min(8)
      .required()
      .label('Password'),

    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({
        'any.only': 'Passwords do not match',
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map(d => d.message).join('; '),
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export { validateSignup, validateLogin };
