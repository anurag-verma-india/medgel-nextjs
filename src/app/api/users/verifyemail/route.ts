import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import handleError from "@/helpers/handleError";

// import { sendEmail } from "@/helpers/mailer";

// TODO: Handle all the extra things from the verifyemail nextauth route and page

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("token: ", token);
    // TODO: handle user already verified
    // TODO: Handle token is not received
    // TODO: handle token invalid

    // if (!token) {
    //     request
    // }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid token", success: false, invalidToken: true },
        { status: 400 },
      );
    }
    console.log("user (in verify token): ", user);

    // user.isVerified = true;
    user.verificationExpiry = Date.now() + 24 * 60 * 60 * 1000;
    console.log("User verification expiry: ", user.verificationExpiry);
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    const tokenData = {
      id: user._id,
    };

    if (!process.env.TOKEN_SECRET) {
      console.log("No token secret environment variable available");
      process.exit(1);
    }
    const jwtToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // console.log("ttt: \n" + jwtToken + "\n");

    const response = NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 },
    );
    response.cookies.set("token", jwtToken, { httpOnly: true });
    return response;
  } catch (error) {
    return handleError(error, "Error occurred in creating new user");
    // return NextResponse.json(
    //   { message: "An error occurred" + error.message },
    //   { status: 500 },
    // );
  }
}
