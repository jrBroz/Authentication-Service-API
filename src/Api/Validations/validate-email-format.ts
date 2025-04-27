import { app } from "../../server";

export function validateEmailFormat(email: string) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
    app.log.info("Starting process of validating email format.");

    let emailTest = emailRegex.test(email);


    if (emailTest) {

        app.log.info("Email has passed the validation.");
        return emailTest;
    } 

    app.log.error("Something is wrong with the provided email.");

}