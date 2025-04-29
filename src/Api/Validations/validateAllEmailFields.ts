import { app } from "../../server";

export function validateAllEmailFields(to: string, subject: string, text: string) {

    app.log.info("Starting the process of validating all email fields");
 
    if(!to) {

        app.log.error('Field: "To" can not be empty');

        throw new Error("Empty field.");
    }

    if(!subject) {

        app.log.error('Field: "subject" can not be empty');
        throw new Error("Empty field.");
    }

    if(!text) {

        app.log.error('Field: "Text" can not be empty');
        throw new Error("Empty field.");       
    }    
    app.log.info("Validation completed.");
}