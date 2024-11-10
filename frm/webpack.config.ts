require('dotenv').config();

import paths from './paths';
import webpack from 'webpack';

export default {
    mode: 'development',
    entry: paths.frm + '/client.tsx',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@': paths.src,
            'lib': paths.lib,
            'frm': paths.frm,
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ico|png|jpg|jpeg|svg)/,
                type: 'asset/resource',
                // generator: {
                //     filename: 'img/[name].[hash:8][ext]',
                // },
            },
        ],
    },
    output: {
        path: paths.static,
        filename: 'client.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.SELF_URL': JSON.stringify(process.env.SELF_URL),
        }),
    ]
};
