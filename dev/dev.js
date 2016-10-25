import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import config from '../config';

const app = express();
const compiler = webpack(webpackConfig);

let webpackMiddlewareOptions = {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  }
};
app.use(webpackMiddleware(compiler, webpackMiddlewareOptions));

app.listen(config.jsServer.port, () => {
  console.log(`JS server started: http://${config.jsServer.hostname}:${config.jsServer.port}`);
});
