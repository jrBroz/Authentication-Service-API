import { app } from "../../server"
import PasswordValidator from "password-validator";

export function validatePassword(password: string) :  any{
    
    const schema = new PasswordValidator();

    schema
    .is().min(8)           
    .is().max(100)          
    .has().uppercase()      
    .has().lowercase()      
    .has().digits()         
    .has().not().spaces(); 
    
    app.log.info("Initializing process of validating pasword");

    const validPassword = schema.validate(password);

    if (validPassword) return validPassword;
}