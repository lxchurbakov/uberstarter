# Uberstarter

This is a Fullstack React Application Starter that I really like and use for half of my pet projects. It's minimalistic and easily modifiable.

## Typescript

It uses Typescript and JSX for both server and client side. The client is built using webpack, server is built using ts compiler. For FE components it's using React without any UI kits.

## Styling

For styling it's using `styled-components`. If you want to opt out, remove `ServerStyleSheet` (lines 26, 33, 52, 57) from `frm/server.tsx`.

## SSR & useForth

Server Side Rendering works out of the box. To fetch data you can use `useForth` which is an replacement of `use` that accepts a `() => Promise`. Resolved data will be rendered on SSR as well as transferred to FE and put in state on hydration stage.

```
const Component = () => {
    const value = useForth(() => {
        // You can async do whatever you want here
        return new Promise<number>((resolve) => {
            let value = 0;

            for (;value < 3; value = Math.random() * 10) {}

            resolve(value);
        });
    });

    return (
        <div>Should be more than 3: {value}</div>
    );
};
```

## Routing

It uses `react-router` with Browser Router on FE and Static Router on SSR. If you want to opt out, just update `frm/client.tsx` and `frm/server.tsx`. Actual routes can be found in `src/index.tsx`.

## Build

It uses `webpack` to compile client and `tsc` to compile server. Webpack config can be fonud at `frm/webpack.config.ts`. You can npm run `client:dev` or `client:build` to build client or `server:dev` or `server:build` to build server. If you want to opt out webpack, modify `package.json` and remove `frm/webpack.config.ts` file.

## Static files

All the static files your application imports in code will be bundled with webpack and put to `dist/static` folder. If you want to add something that is not imported by your application (like favicon or manifest) you can use `assets` folder.

## State management

>

## Fetchup

>

## Envs

>

## Dockerfile

>

## Redis

>

## Postgres

>

## S3

>





## FAQ

### How to update Font

>

### How to opt out Use Between

>

### Why custom use-between?

