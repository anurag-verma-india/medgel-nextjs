// import User from "@/models/userModel";
import User from "@/models/user";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

import { EmailTypes } from "@/types";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type sendEmailType = {
  email: string;
  emailType: EmailTypes;
  userId: string;
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendEmailType) => {
  try {
    /*
        Determine email type
        Create transporter
        Set mail options
        Send email
        return response
    */

    // send verification email

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }
    // else if (emailType === "RESET") {
    const mail_host = process.env.MAIL_HOST || "";
    const mail_port = parseInt(process.env.MAIL_PORT || "0");
    const auth_user = process.env.MAIL_USERNAME;
    const auth_pass = process.env.MAIL_PASSWORD;

    if (!mail_host || !mail_port || !auth_user || !auth_pass) {
      console.log(`
Email sending failed please check that these variables are present in environment variables:
MAIL_HOST
MAIL_PORT
MAIL_USERNAME
MAIL_PASSWORD
        `);
      return;
    }

    // const transport = nodemailer.createTransport({
    //   host: process.env.MAIL_HOST,
    //   port: process.env.MAIL_PORT,
    //   auth: {
    //     user: process.env.MAIL_USERNAME,
    //     pass: process.env.MAIL_PASSWORD,
    //   },
    // });
    const configOptions: SMTPTransport.Options = {
      host: mail_host,
      port: mail_port,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    };
    const transport = nodemailer.createTransport(configOptions);
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USERNAME}>`, // sender address
      to: email,
      subject: "Verify your email",
      // emailType === "VERIFY"
      //     ? "Verify your email"
      //     : "Reset your password",
      html: `<p>Click <a href="${
        process.env.NEXT_PUBLIC_SITE_URL
      }/verifyemail?token=${hashedToken}">here</a> to verify your email${
        " "
        // emailType === "VERIFY"
        //     ? "verify your email"
        //     : "reset your password"
      }
                or copy the link below in your browser
                <br>
                 ${
                   process.env.NEXT_PUBLIC_SITE_URL
                 }/verifyemail?token=${hashedToken}
                </p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log(mailResponse);

    // remove password from the api response ❌❌❌
    return mailResponse;
  } catch (error) {
    const message = "An error occurred in sending email";
    console.log(message);
    console.log(error);
    // console.log(error);
    throw new Error(message);
  }
};
