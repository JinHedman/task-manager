import { createClient } from 'redis';

// set up redis client and connect to redis server
// used for caching tasks
const client = createClient(); 

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect(); 
})();

export default client;
