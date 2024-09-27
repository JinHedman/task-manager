// to run redis server locally, use the following command
// docker run --name redis -p 6379:6379 -d redis
// or docker-compose up -d

import { createClient } from 'redis';

// set up redis client and connect to redis server
// used for caching tasks
const client = createClient(); 

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect(); 
})();

export default client;
