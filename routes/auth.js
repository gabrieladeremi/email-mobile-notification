const express = require('express');

const register = require('../controllers/register');

const { 
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema 
} = require('../validation/fieldValidation');

const { validateSchema } = require('../validation/genericValidation');

const router = express.Router();

router.post('/register', validateSchema(registerSchema), register);