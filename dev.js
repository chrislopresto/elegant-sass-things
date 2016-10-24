import express from 'express';
import config from './config';

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.jsServer.port, function () {
  console.log(`Example app listening on port ${config.jsServer.port}!`);
});
