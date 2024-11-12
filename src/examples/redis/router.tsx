import express from 'express';
import { route } from 'lib/express-utils';

import { createClient } from 'redis';

const client = createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@localhost:${process.env.REDIS_PORT}`
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

const router = new express.Router();

router
    .get('/api/v1/examples/redis/:key', route (async (req) => {
        // const { text } = req.body;
        const { key } = req.params;
        // const { value } = req.body;

        return client.GET(key);

        // const [{ id }] = await db('todos').insert({ text }).returning('*');

        // return id;
    }))
    .put('/api/v1/examples/redis/:key', route (async (req) => {
        // const { text } = req.body;
        const { key } = req.params;
        const { value } = req.body;

        return client.SET(key, value);

        // const [{ id }] = await db('todos').insert({ text }).returning('*');

        // return id;
    }))
    // .get('/api/v1/examples/postgres', route (async (req) => {
    //     return db.select('*').from('todos');
    // }));

// router
//     .delete('/api/v1/examples/postgres/:id', route (async (req) => {
//         const { id } = req.params;
        
//         return db('todos').delete().where({ id });
//     }));

// export default client;

// await redis.SADD(TELEGRAM_TOKEN_SET_NAME, token);
// await redis.HSET(TELEGRAM_TOKEN_SET_EXPIRY, token, new Date().getTime() + 5 * 60 * 1000);

// return await redis.SISMEMBER(TELEGRAM_TOKEN_SET_NAME, token);

// await redis.HSET(TELEGRAM_TOKEN_HASH_NAME, token, jwt);
// await redis.HSET(TELEGRAM_TOKEN_HASH_EXPIRY, token, new Date().getTime() + 5 * 60 * 1000);




// router.get('/api/v1/examples/postgres', route(async (req) => {
//     return get({ key: req.params.key });
// }));

// router.put('/api/v1/examples/s3/:key', route(async (req) => {
//     return put({ key: req.params.key, value: req.body.value });
// }));

export default router;
