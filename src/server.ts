import express from 'express';
import fs from 'fs';
import path from 'path';
import paths from 'frm/paths';

import { route, catchErrors } from 'lib/express-utils';

const router = express.Router();

router.get('/api/v1/ping', route(async (req) => {
    return 'pong';
}));

router.get('/api/v1/readme', route(async (req) => {
    return new Promise((resolve, reject) => 
        fs.readFile(path.resolve(paths.root, './readme.md'), (err, data) => err ? reject(err) : resolve(data.toString()))
    );
}));

router.use(catchErrors);

export default router;
