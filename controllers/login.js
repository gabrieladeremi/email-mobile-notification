const { createLoginToken } = require('../utils/createLoginToken');
const AppSuccess = require('../response/responseProcessor');

const { loginService } = require('../services');

const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      const payload = await loginService(username, password);
      const token = await createLoginToken(payload);
  
      return new AppSuccess(res, { ...token }).TOKENCREATED();
    } catch (error) {
      next(error);
    }
};
  
module.exports = login;