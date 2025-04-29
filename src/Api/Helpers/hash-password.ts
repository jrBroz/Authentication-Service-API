import { app } from '../../server'
import bcrypt from 'bcrypt';



export async function hashPassword(password: string) : Promise<string> {

    app.log.info("Initializing process of hashing password.");
    const salt = 8;
    return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string) {

    app.log.info("Initializing process of comparing passwords.");

    return bcrypt.compare(password, hashedPassword);

} 