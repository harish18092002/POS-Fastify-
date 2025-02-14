import { fastify } from './app/app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Instantiate Fastify with some config

// Register your application as a normal plugin.

// Start listening.
fastify.listen({ port, host }, (err) => {
  if (err) {
    console.log(err, 'Server is not running');
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
