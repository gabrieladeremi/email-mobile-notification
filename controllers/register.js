const { session } = require('../connection/mongoDB');
const { NotFoundError, BadRequestError } = require('../response/responseMessage');
const AppSuccess = require('../response/responseProcessor');
const { registerService } = require('../services/registerService');

const register = async (req, res, next) => {
    const transaction = await session;
    
    try {
        transaction.startTransaction();
        const {email, phone, username, password, confirmPassword, notificationType } = req.body;
        
        if (!email || !username || !phone||  !password || !confirmPassword || !notificationType) 
        {
            throw new BadRequestError('Your details are Incomplete');
        }
            
        await registerService(email, phone, username, password, notificationType);

        await transaction.commitTransaction();

        return new AppSuccess(res).ACCOUNTCREATED();
        
    } catch (error) {
        await transaction.abortTransaction();
        next(error);
    }

    transaction.endSession();
}

module.exports = register;