import { PrismaClient } from "../../generated/prisma";
import { app } from "../../server";
import { RequestBody } from "../Interface/request-body";
import { verifyPassword } from "../Helpers/hash-password";

const prisma = new PrismaClient();


export function login() {

    app.post('/login', async (request, reply) =>  {
        app.log.info("User accessed login route");
    
        const { email, password } = request.body as RequestBody;
    
        const user = await prisma.users.findFirst({
            select: {
                password: true
            },
            where: { email: email }
        });
    
        if (!user) {
            return reply.status(401).send({ message: 'Invalid email or password' });
        }
    
        const isPasswordCorrect = await verifyPassword(password, user.password);
    
        if (!isPasswordCorrect) {
            return reply.status(401).send({ message: 'Invalid email or password' });
        }
    
    
        reply.send({ message: 'Login successful' });
    });

}