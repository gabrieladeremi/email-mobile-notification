const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../security/hash');

const userAuth = new Schema(
  {
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    username: {
        type: String, 
        required: true
    },
    notificationType: {
        type: String,
        required: true,
        enum: ['phone', 'email']
    },
    password: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hook to encrypt password before saving
userAuth.pre('save', async function (next) {
  if (!this.isModified('password') && !this.isNew) return next();

  this.password = await hashPassword(this.password);
  next();
});

const UserAuth = mongoose.model('UserAuthDetails', userAuth);

module.exports = UserAuth;
