import { PrismaClient } from "../../generated/prisma";
import { app } from "../../server";
import { checkEmailExists } from "../Validations/check-email-exists";
import { validateEmailFormat } from "../Validations/validate-email-format";
import { validatePasswordStrength } from "../Validations/validate-password";
import { hashPassword } from "../Helpers/hash-password";
import { RequestBody } from "../Interface/request-body";


export async function register() {
   
    const prisma = new PrismaClient();
    
    app.post('/register', async (request, reply) =>  {
    
        app.log.info("User accessed the register route");

        const {email, password} = request.body as RequestBody;
    
        await checkEmailExists(email); // Check if exists in db

        validateEmailFormat(email); 
    
        validatePasswordStrength(password);
        let hashedPassword = await hashPassword(password);


        await prisma.users.create({data: {
            email: email,
            password: hashedPassword
        }})
    
        app.log.info("User was created successfully.");        
    });
}