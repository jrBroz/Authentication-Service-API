import { app } from "../../server"
import PasswordValidator from "password-validator";


export function validatePasswordStrength(password: string) :  boolean {
    
    const schema = new PasswordValidator();

    schema
    .is().min(8, "Password too small.")           
    .is().max(100)          
    .has().uppercase()      
    .has().lowercase()      
    .has().digits()         
    .has().not().spaces(); 
    
    app.log.info("Initializing process of validating pasword");

    const validPassword = schema.validate(password, {list:true});


    app.log.info("Pasword was validated.");

    return validPassword === true;
}