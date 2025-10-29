import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ResponseData = {
    message: string
}

type FormData = {
    name: string
    email: string
    message: string
}

export async function POST(
    req: any,
    res: NextApiResponse<ResponseData>
) {
    // const { name, email, message }: FormData = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail", // or your SMTP service
        auth: {
            user: process.env.BUSINESS_EMAIL,
            pass: process.env.APP_PASSWORD, // app password, not your actual password
        },
    });

    // await transporter.sendMail({
    //     from: email,
    //     to: process.env.BUSINESS_EMAIL,
    //     subject: `New Lead from ${name}`,
    //     text: message,
    // });
    //
    const email_response = await transporter.sendMail({
        from: `"Inquires" <${process.env.BUSINESS_EMAIL}>`,
        to: process.env.BUSINESS_EMAIL,
        subject: `New Inquiry`,
        text: 'A new inquiry came in bro.',
    });
    console.info('This is the response from the email server: ', email_response)

    return new Response("Message sent", { status: 200 });
}
