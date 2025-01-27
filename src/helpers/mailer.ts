// import User from "@/models/userModel";
import User from "@/models/user";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
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
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USERNAME}>`, // sender address
            to: email,
            subject: "Verify your email",
            // emailType === "VERIFY"
            //     ? "Verify your email"
            //     : "Reset your password",
            html: `<p>Click <a href="${
                process.env.NEXT_PUBLIC_API_URL
            }/verifyemail?token=${hashedToken}">here</a> to verify your email${
                " "
                // emailType === "VERIFY"
                //     ? "verify your email"
                //     : "reset your password"
            }
                or copy the link below in your browser
                <br>
                 ${
                     process.env.NEXT_PUBLIC_API_URL
                 }/verifyemail?token=${hashedToken}
                </p>`,
        };
        const mailResponse = await transport.sendMail(mailOptions);
        console.log(mailResponse);

        // remove password from the api response ❌❌❌
        return mailResponse;

        //         // ----------------------------------------------------

        //         // const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        //         // if (emailType === "VERIFY") {
        //         //     await User.findByIdAndUpdate(userId, {
        //         //         verifyToken: hashedToken,
        //         //         verifyTokenExpiry: Date.now() + 3600000,
        //         //     });
        //         // } else if (emailType === "RESET") {
        //         //     await User.findByIdAndUpdate(userId, {
        //         //         forgotPasswordToken: hashedToken,
        //         //         forgotPasswordTokenExpiry: Date.now() + 3600000,
        //         //     });
        //         // }

        //         // const transport = nodemailer.createTransport({
        //         //     host: process.env.MAIL_HOST,
        //         //     port: process.env.MAIL_PORT,
        //         //     auth: {
        //         //         user: process.env.MAIL_USERNAME,
        //         //         pass: process.env.MAIL_PASSWORD,
        //         //     },
        //         // });

        //         // const mailOptions = {
        //         //     from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USERNAME}>`, // sender address
        //         //     to: email,
        //         //     subject:
        //         //         emailType === "VERIFY"
        //         //             ? "Verify your email"
        //         //             : "Reset your password",
        //         //     html: `<p>Click <a href="${
        //         //         process.env.DOMAIN
        //         //     }/verifyemail?token=${hashedToken}">here</a> to ${
        //         //         emailType === "VERIFY"
        //         //             ? "verify your email"
        //         //             : "reset your password"
        //         //     }
        //         //     or copy the link below in your browser
        //         //     <br>
        //         //      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        //         //     </p>`,
        //         // };
        //         // const mailResponse = await transport.sendMail(mailOptions);
        //         // console.log(mailResponse);
        //         // // remove password from the api response ❌❌❌
        //         // return mailResponse;
    } catch (error: any) {
        // console.log("An error occurred in sending email");
        // console.log(error);
        throw new Error(error.message);
    }
};

// ---------------------------------------------------- old exact

//     try {
//         console.log("userId: ", userId);
//         const hashedToken = await bcryptjs.hash(userId.toString(), 10);
//         // const hashedToken = "894iwjhca87sd9ijfara";

//         if (emailType === "VERIFY") {
//             await User.findByIdAndUpdate(userId, {
//                 verifyToken: hashedToken,
//                 verifyTokenExpiry: Date.now() + 3600000,
//             });
//         } else if (emailType === "RESET") {
//             await User.findByIdAndUpdate(userId, {
//                 forgotPasswordToken: hashedToken,
//                 forgotPasswordTokenExpiry: Date.now() + 3600000,
//             });
//         }

//         // Looking to send emails in production? Check out our Email API/SMTP product!

//         // const transport = nodemailer.createTransport({
//         //     host: "sandbox.smtp.mailtrap.io",
//         //     port: 2525,
//         //     auth: {
//         //         user: "e8e226e589c695", // 🔥🔥🔥
//         //         pass: "f7da0757d94542", // 🔥🔥🔥
//         //     },
//         // });

//         // const transport = nodemailer.createTransport({
//         //     host: "smtp.ethereal.email",
//         //     port: 587,
//         //     auth: {
//         //         user: "emilio.bauch@ethereal.email",
//         //         pass: "Vv28SUtFGDB489YEEE",
//         //     },
//         // });

//         const transport = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             port: process.env.MAIL_PORT,
//             auth: {
//                 user: process.env.MAIL_USERNAME,
//                 pass: process.env.MAIL_PASSWORD,
//             },
//         });

//         const mailOptions = {
//             // from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//             from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USERNAME}>`, // sender address
//             // to: "bar@example.com, baz@example.com", // list of receivers
//             to: email,
//             subject:
//                 emailType === "VERIFY"
//                     ? "Verify your email"
//                     : "Reset your password",
//             // text: "Hello world?", // plain text body
//             html: `<p>Click <a href="${
//                 process.env.DOMAIN
//             }/verifyemail?token=${hashedToken}">here</a> to ${
//                 emailType === "VERIFY"
//                     ? "verify your email"
//                     : "reset your password"
//             }
//             or copy the link below in your browser
//             <br>
//              ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//             </p>`,
//         };
//         const mailResponse = await transport.sendMail(mailOptions);
//         console.log(mailResponse);
//         // remove password from the api response ❌❌❌
//         return mailResponse;
//     } catch (error: any) {
//         // console.log("An error occurred in sending email");
//         // console.log(error);
//         throw new Error(error.message);
//     }
// };
