import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import Application from '@/index';
import { Forth, ForthCache } from 'lib/use-forth';
import { BrowserRouter } from 'react-router-dom';

const app = document.getElementById('app');

if (!app) {
    throw new Error('no app found');
}

const cacheNode = document.getElementById('storage');

if (!cacheNode) {
    throw new Error(`no cache node found`);
}

const root = hydrateRoot(app, (
    <BrowserRouter>
        <Forth mode="client" cache={ForthCache.parse(cacheNode.innerText)}>
            <Application />
        </Forth>
    </BrowserRouter>
));
