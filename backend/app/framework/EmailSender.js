import nodemailer from "nodemailer";
import {isNullOrUndefined} from "./functions.js";

class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:parseInt(process.env.SMTP_PORT),
            auth: {
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASS
            }
        });
    }

    async sendMail(mailOptions) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return !isNullOrUndefined(info);
        } catch(err) {
            console.log("EmailSender:sendMail: ", err);
            return false;
        }
    }
}

export default EmailSender;