import nodemailer from "nodemailer";

type FormData = {
    name: string
    email: string
    message: string
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // or specify your domain instead of '*'
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    // Handles the CORS preflight
    return new Response(null, { status: 204, headers: corsHeaders })
}

export async function POST(req: Request) {
    try {
        const { message, email }: FormData = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail", // or your SMTP service
            auth: {
                user: process.env.BUSINESS_EMAIL,
                pass: process.env.APP_PASSWORD, // app password, not your actual password
            },
        });

        const email_response = await transporter.sendMail({
            from: `"New Inquiry" <${process.env.ALIAS_EMAIL}>`,
            to: process.env.BUSINESS_EMAIL,
            subject: `New Inquiry from ${email}`,
            text: message,
        });
        console.info('This is the response from the email server: ', email_response)

        return new Response(JSON.stringify({ message: "Sent email", data: email_response }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "Failed to send email." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}
