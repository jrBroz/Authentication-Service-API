import fastify from "fastify"

const app = fastify({logger: true});

app.listen({ port: 3000 }, (error) => {

    if(error) {
        app.log.error('Error Occured', error );
        process.exit(1);
    }
})