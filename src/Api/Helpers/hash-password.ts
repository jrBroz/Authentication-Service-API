import { app } from '../../server'
import bcrypt from 'bcrypt';

export async function hashPassword(password: string) : Promise<string> {

    app.log.info("Initializing process of hashing password.");
    const salt = 8;
    return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string) : Promise<boolean>{

    return await bcrypt.compare(password, hashedPassword);

} 
