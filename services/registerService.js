const UserAuth = require('../models/userauth');

const { AuthenticationError, BadRequestError } = require('../response/responseMessage');

exports.registerService = async (
    email,
    phone,
    username,
    password,
    notificationType,
) => {
    email = email.toLowerCase().trim();

    const user = await UserAuth.findOne({ email });

    if (user) {
        throw new AuthenticationError('User already registered with this email address');
    }
    
    const newUserAuth = await new UserAuth({
        email,
        phone,
        username,
        password,
        notificationType
    });

    await newUserAuth.save();

    return newUserAuth;
}