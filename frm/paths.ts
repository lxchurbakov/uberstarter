import * as path from 'path';

const ROOT = path.resolve(__dirname, '../');

export default {
    root: ROOT,
    frm: path.resolve(ROOT, './frm'),
    src: path.resolve(ROOT, './src'),
    lib: path.resolve(ROOT, './lib'),
    dist: path.resolve(ROOT, './dist'),
    static: path.resolve(ROOT, './dist/static'),
    assets: path.resolve(ROOT, './assets'),
};
