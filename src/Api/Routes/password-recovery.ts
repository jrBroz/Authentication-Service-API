import { createTransport } from "nodemailer";
import { app } from "../../server";
import { generateNewPassword } from "../Helpers/generate-new-password";
import { validateAllEmailFields } from "../Validations/validateAllEmailFields";
import { PrismaClient } from "../../generated/prisma";
import { RequestBody } from "../Interface/request-body";
import { hashPassword } from "../Helpers/hash-password";


const revokedTokens = new Set();

export async function passwordRecovery() { 
    
    app.post('/password-recovery',async (request, reply) =>  {

        const prisma =  new PrismaClient();
        let newPassword = generateNewPassword();

        const { email} = request.body as RequestBody;
        let newHashedPassword = await hashPassword(newPassword);

       await prisma.users.update({
            where: {
                email: email
            },
            data: {
                password: newHashedPassword
            }
        })

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
            to: email,
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

    // 'Removing' JWT
    const token = request.headers.authorization?.replace("Bearer", '');
    if(token) revokedTokens.add(token);
    
    return { message: 'Password recovery email sent successfully.' };
    });
}