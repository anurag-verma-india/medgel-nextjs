import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { EmailTypes } from "@/types";
import handleError from "@/helpers/handleError";

export async function POST(request: NextRequest) {
  try {
    // Validating request has email
    const reqBody = await request.json();
    if (!Object.hasOwn(reqBody, "email")) {
      return NextResponse.json(
        {
          error: "request body does not contain 'email' property",
          success: false,
        },
        { status: 400 },
      );
    }
    const { email } = await reqBody;
    dbConnect();

    // Checking if user already exists
    let user = await User.findOne({ email });
    // if (user) {
    //   return NextResponse.json(
    //     { error: "User already exists", success: false },
    //     { status: 400 },
    //   );
    // }
    if (!user) {
      // If user does not already exist then create a new one
      // create and save new user
      const newUser = new User({
        email: email,
      });
      user = await newUser.save();
    }
    console.log("User already exists");

    // Send verification mail
    const emailResponse = await sendEmail({
      email,
      emailType: EmailTypes.VERIFY,
      userId: user._id,
    });
    console.log("Email response: ", emailResponse);

    const response_to_send_back = NextResponse.json({
      message: "Email sent successfully, and user created in database",
      success: true,
      savedUser: user,
    });
    response_to_send_back.cookies.set(
      "email",
      email,
      // { httpOnly: true }
    );
    response_to_send_back.cookies.set("sent", "true");
    return response_to_send_back;
  } catch (error) {
    return handleError(error, "Error in creating user");
    // return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
