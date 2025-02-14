import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

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
    const user = await User.findOne({ email });
/
    if (!user) {
      // return NextResponse.json(
      //   { error: "User already exists", success: false },
      //   { status: 400 },
      // );
    }

    // create and save new user
    const newUser = new User({
      email: email,
    });
    const savedUser = await newUser.save();

    // Send verification mail
    const emailResponse = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });
    console.log("Email response: ", emailResponse);

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
