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
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationExpiry: {
        type: Date,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
