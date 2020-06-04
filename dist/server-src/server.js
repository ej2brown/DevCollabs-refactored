"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../routes/index");
const group_1 = require("../routes/group");
const user_1 = require("../routes/user");
const rate_1 = require("../routes/rate");
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
const indexRoutes = new index_1.IndexExpressRoutes('/', db);
const groupRoutes = new group_1.GroupExpressRoutes('/group', db);
const userRoutes = new user_1.UserExpressRoutes('/user', db);
const rateRoutes = new rate_1.RateExpressRoutes('/rate', db);
app.use(indexRoutes.baseEndpoint, indexRoutes.router);
app.use(groupRoutes.baseEndpoint, groupRoutes.router);
app.use(userRoutes.baseEndpoint, userRoutes.router);
app.use(rateRoutes.baseEndpoint, rateRoutes.router);
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
//# sourceMappingURL=server.js.map