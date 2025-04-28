import { app } from "../../server"
import { PrismaClient } from "../../generated/prisma"


const prisma = new PrismaClient();

export async function checkEmailExists(email: string) : Promise<boolean | undefined> {


    app.log.info("Verifying if email already exists. ");

        const user = await prisma.users.findFirst({where: {email: email}});
    
        if(user) {
            app.log.warn("User already exists.");
            return;   
        }
    
        app.log.info("User does not exist.");
        return false;
    }