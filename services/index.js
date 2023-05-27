const UserAuth = require('../models/userauth');
const { verifyPassword } = require('../security/hash');

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

exports.loginService = async (username, password) => {
    const user = await UserAuth.findOne({ username });

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }
    
    if (user && !(await verifyPassword(password, user.password))) {
      throw new AuthenticationError('Incorrect password');
    }
  
    const payload = { 
      id: user._id, 
    };
      
    await user.save();
    return payload;
  };