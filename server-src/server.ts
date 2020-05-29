import {IRoutes} from '../routes/routes.interface';
import {IndexExpressRoutes} from '../routes/index';
import {GroupExpressRoutes} from '../routes/group';
import {UserExpressRoutes} from '../routes/user';
import {RateExpressRoutes} from '../routes/rate';

const express = require("express")
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express()
const config = require('./webpack.config.js');
const compiler = webpack(config);

// const cors = require("cors")
// const bodyParser = require("body-parser")
const http = require("http")
const RateExpressRoutes = require('./routes/rate');
require("dotenv").config()


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// app.use(bodyParser.json())
// app.use(cors())

const PORT = 3001

const server = http.createServer(app)

const { Pool } = require("pg")
const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}
const db = new Pool(dbParams)


// const indexRoutes = new IndexExpressRoutes('/', db);
// const groupRoutes = new GroupExpressRoutes('/group', db);
// const userRoutes = new UserExpressRoutes('/user', db);
const rateRoutes = new RateExpressRoutes('/rate', db);

// app.use(indexRoutes.baseEndpoint, indexRoutes.router)
// app.use(groupRoutes.baseEndpoint, groupRoutes.router)
// app.use(userRoutes.baseEndpoint, userRoutes.router)
app.use(rateRoutes.baseEndpoint, rateRoutes.router)

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
