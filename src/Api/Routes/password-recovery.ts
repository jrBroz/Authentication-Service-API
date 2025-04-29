import { createTransport } from "nodemailer";
import { app } from "../../server";
import { generateNewPassword } from "../Helpers/generate-new-password";
import { MailRequestBody } from "../Interface/mail-request-body";
import { validateAllEmailFields } from "../Validations/validateAllEmailFields";
import { PrismaClient } from "../../generated/prisma";
import { RequestBody } from "../Interface/request-body";

export async function passwordRecovery() { 
    
    app.post('/password-recovery', (request, reply) =>  {

        const prisma =  new PrismaClient();
        let newPassword = generateNewPassword();
        const { email} = request.body as RequestBody;

        
        prisma.users.update({
            where: {
                email: email
            },
            data: {
                password: newPassword
            }
        })

        const requestBody = request.body as MailRequestBody

        const to = requestBody.to;

        const transporter = createTransport({

        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: 'e91876f4ad732e', // Normally it would be in a .env file, however for the purpose of the exercise it is ok.
            pass: '6f41c8e6312b39',   
        }
        });

        const mailOptions = {        
            from: process.env.FROM,
            to: to,
            subject: "Your Password was updated, sending you the new password: ",
            text: newPassword
        };


    try {
        validateAllEmailFields(mailOptions.to, mailOptions.subject, mailOptions.text);
    
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                app.log.error("Error Occurred: ", err);
                return;
            }
            app.log.info("Email Was successfully sent.");
        });
    } catch (error) {
        app.log.error("Validation or Send Error:", error);
    }    
    return { message: 'Password recovery email sent successfully.' };
    });
}