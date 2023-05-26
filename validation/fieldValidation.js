const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.number().required(),
  username: Joi.string().required(),
  notificationType: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .min(8)
    .max(30)
    .required()
    .label(
      "Please enter a password that is between 8 to 30, made of a number, a special symbol, a capital letter and a small letter"
    ),
  confirmPassword: Joi.ref("password"),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .min(8)
    .max(30)
    .required()
    .label(
      "Please enter a password that is between 8 to 30, made of a number, a special symbol, a capital letter and a small letter"
    ),
  confirmPassword: Joi.ref("password"),
  resetToken: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
});
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .min(8)
    .max(30)
    .required()
    .label(
      "Please enter a password that is between 8 to 30, made of a number, a special symbol, a capital letter and a small letter"
    ),
  newPassword: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .min(8)
    .max(30)
    .required()
    .label(
      "Please enter a password that is between 8 to 30, made of a number, a special symbol, a capital letter and a small letter"
    ),
  confirmPassword: Joi.ref("newPassword"),
});
module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
};
