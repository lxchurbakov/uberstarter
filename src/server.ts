import express from 'express';


// import session from './session/router';
// import { build_router } from 'lib/buffalo';
import { route } from 'lib/express-utils';

// import './profile/router';

const router = new express.Router();

// router.use('/buffalo', build_router(express));
// router.use('/api/v1/session', session);

router.get('/api/v1/ping', route(async (req) => {
    return 'pong';
}));

/* handle HTTP ERRORS thrown by lib/express-utils */

router.use((err, _req, res, _next) => {
    if (!!err.statusCode) {
        res.status(err.statusCode).json(err.body || null);
    } else {
        res.status(500).send(err.toString());
    }
});

export default router;
