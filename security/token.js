const jwt = require("jsonwebtoken");
const accessSecret = process.env.STACKIVY_TOKEN_ACCESS_SECRET;
const refreshSecret = process.env.STACKIVY_TOKEN_REFRESH_SECRET;

exports.generateAccessToken = async (payload) => {
  const options = {
    expiresIn: `${process.env.STACKIVY_TOKEN_ACCESS_EXPIRES_M}m`,
  };

  const token = await jwt.sign(payload, accessSecret, options);

  return token;
};

exports.verifyAccessToken = async (token) => {
  try {
    const payload = await jwt.verify(token, accessSecret);
    return payload;
  } catch (err) {
    return err;
  } 
};


exports.decodeToken = async (token) =>{
  try{
    return jwt.decode(token)
  }catch(error){
    return error
  }
}

exports.generateRefreshToken = async (payload) => {
  const options = {
    expiresIn: `${process.env.STACKIVY_TOKEN_REFRESH_EXPIRES_M}m`,
  };
  const token = await jwt.sign(payload, refreshSecret, options);
  return token;
};

exports.verifyRefreshToken = async (token) => {
  try {
    const payload = await jwt.verify(token, refreshSecret);
    return payload;
  } catch (err) {
    return err;
  }
};
