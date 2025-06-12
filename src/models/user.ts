import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // password: {
  //     type: String,
  //     required: [true, "Please provide an password"],
  // },
  // isVerified: {
  //     type: Boolean,
  //     default: false,
  // },
  allowVerificationAfter: {
    // This variable keeps track of when the next email verification request will be entertained
    type: Date,
    default: Date.now,
    // default: Date.now + 60, // 1 min in seconds
  },
  verificationExpiry: {
    type: Date,
    default: Date.now,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
