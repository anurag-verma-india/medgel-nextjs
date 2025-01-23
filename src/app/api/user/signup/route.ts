// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { sendEmail } from "@/helpers/mailer";

// connect();
dbConnect();
export async function POST(request: NextRequest) {
    try {
        // TODO: Validate user
        const reqBody = request.json();
        const { email } = await reqBody;

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // const salt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            // username: username,
            email: email,
            verificationExpiry: Date.now() + 24 * 60 * 60 * 100, // 24 Hours
            // password: hashedPassword,
        });

        const savedUser = await newUser.save();

        console.log("Saved user: ", savedUser);

        // Send verification mail
        const emailResponse = await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });
        console.log("Email response: ", emailResponse);

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            // TODO: Remove some properties form savedUser before sending (like password, or something, check by console logging)
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
