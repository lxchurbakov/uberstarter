import express from 'express';

export const route = <T>(predicate: (req: express.Request, res: express.Response) => Promise<T>) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) =>
        Promise.resolve().then(() => predicate(req, res)).then((data) => res.json(data)).catch((err) => next(err));

export class HttpError extends Error {
    constructor (public statusCode, public body, ...args) {
        super(...args);
    }
};

export const catchErrors = (err, _req, res, _next) => {
    if (!!err.statusCode) {
        res.status(err.statusCode).json(err.body || null);
    } else {
        res.status(500).send(err.toString());
    }
};
