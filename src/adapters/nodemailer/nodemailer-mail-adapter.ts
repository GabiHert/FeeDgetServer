import {MailAdapter, SendMailData} from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "9eed2e9ab036b9",
        pass: "7e28796bc9c421"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {

        await transport.sendMail({
            from: "Feedget Team <oi@feedget.com>",
            to: "Gabriel Guinter Herter <hertergabriel4@gmail.com>",
            subject,
            html: body
        })
    }
}