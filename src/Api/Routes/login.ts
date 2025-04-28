import { app } from "../../server";

export async function login () {

    app.post('/login', (request, reply) =>  {


        app.log.info("User accessed login route");


    });
    


}