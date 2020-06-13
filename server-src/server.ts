import { IRoutes } from "../routes/routes.interface";
import { IndexExpressRoutes } from "../routes/index";
import { GroupExpressRoutes } from "../routes/group";
import { UserExpressRoutes } from "../routes/user";
import { RateExpressRoutes } from "../routes/rate";
import { IDatabaseController } from "./database/databaseController.interface";
import { PostgresController } from "./database/postgres/postgresController";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");

app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;

const server = http.createServer(app);

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('./webpack.config.js');
// const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }));

const { Pool } = require("pg");
const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
const db = new Pool(dbParams);
const dbController: IDatabaseController = new PostgresController (db);

const indexRoutes: IRoutes = new IndexExpressRoutes("/", dbController);
const groupRoutes: IRoutes = new GroupExpressRoutes("/group", dbController);
const userRoutes: IRoutes = new UserExpressRoutes("/user", dbController);
const rateRoutes: IRoutes = new RateExpressRoutes("/rate", dbController);

app.use(indexRoutes.baseEndpoint, indexRoutes.router);
app.use(groupRoutes.baseEndpoint, groupRoutes.router);
app.use(userRoutes.baseEndpoint, userRoutes.router);
app.use(rateRoutes.baseEndpoint, rateRoutes.router);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));