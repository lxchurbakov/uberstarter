import express from 'express';
import { route } from 'lib/express-utils';
import { db } from 'lib/knex';
// import { get, put } from './api';

const router = new express.Router();

router
    .post('/api/v1/examples/postgres', route (async (req) => {
        const { text } = req.body;

        const [{ id }] = await db('todos').insert({ text }).returning('*');

        return id;
    }))
    .get('/api/v1/examples/postgres', route (async (req) => {
        return db.select('*').from('todos');
    }));

router
    .delete('/api/v1/examples/postgres/:id', route (async (req) => {
        const { id } = req.params;
        
        return db('todos').delete().where({ id });
    }));

// router.get('/api/v1/examples/postgres', route(async (req) => {
//     return get({ key: req.params.key });
// }));

// router.put('/api/v1/examples/s3/:key', route(async (req) => {
//     return put({ key: req.params.key, value: req.body.value });
// }));

export default router;
