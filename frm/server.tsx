import 'dotenv/config';

import React from 'react';
import express from 'express';
import { Helmet } from 'react-helmet';
import { renderToPipeableStream } from 'react-dom/server';

import Application from '@/index';
import serverMiddleware from '@/server';

import paths from 'frm/paths';

import { Forth, ForthCache } from 'lib/use-forth';

const app = express();

app.use(express.json());

app.use('/', serverMiddleware);

app.use(express.static(paths.static));

app.get('*', (req, res) => {
    // const sheet = new ServerStyleSheet();
    const cache = new ForthCache();

    const stream = renderToPipeableStream((
        <div id="app">
            <Forth mode="server" cache={cache}>
            {/* {sheet.collectStyles(<Application  />)} */}
                <Application />
            </Forth>
        </div>
    ), {
        onShellReady() {
            res.setHeader('content-type', 'text/html');
        },
        onAllReady () {
            const helmet = Helmet.renderStatic();

            res.write('<head>');
            res.write(helmet.title.toString());
            res.write(helmet.meta.toString());
            res.write(helmet.link.toString());
            res.write(helmet.style.toString());
            res.write("<meta charSet='utf-8' />");
            res.write('</head>');

            // const styleTags = sheet.getStyleTags();
            // sheet.seal();

            stream.pipe(res);
            
            // res.write(styleTags);
            res.write(`<script nonce id="storage" type="application/json">${cache.stringify()}</script>`);
            res.write('<script src="/client.js"></script>');            
        },
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is up at ${process.env.PORT}`);
});
