import fastify from "fastify";
import rateLimit from '@fastify/rate-limit';

export const app = fastify({logger: true});

// Sets rate limit even in 404 routes
async function main() {

    app.log.info("Registering Rate-Limit");

    await app.register(rateLimit, {
        max: 10,
        timeWindow: '2 minutes'
    })
    
    app.log.info("Applying Rate-limit on 404 routes.");

    // handling 404 
    app.setNotFoundHandler({
        preHandler: app.rateLimit() 
    }, function (request, reply) {
    
        reply.code(404).send({message: "Resource Not found."})
    })
        
    app.listen({ port: 3000 }, (error) => {
    
        if(error) {
            app.log.error('Error Occured:', error );
            process.exit(1);
        }
    })
}

main()