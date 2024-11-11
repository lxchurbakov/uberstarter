import express from 'express';
import { route } from 'lib/express-utils';
import { get, put } from './api';

const router = new express.Router();

router.get('/api/v1/examples/s3/:key', route(async (req) => {
    return get({ key: req.params.key });
}));

router.put('/api/v1/examples/s3/:key', route(async (req) => {
    return put({ key: req.params.key, value: req.body.value });
}));

export default router;
