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
