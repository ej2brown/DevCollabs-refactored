"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../routes/index");
const group_1 = require("../routes/group");
const user_1 = require("../routes/user");
const rate_1 = require("../routes/rate");
const postgresController_1 = require("./database/postgres/postgresController");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
app.use(bodyParser.json());
app.use(cors());
const PORT = 3001;
const server = http.createServer(app);
const io = socketio(server);
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('./webpack.config.js');
// const compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }));
// configure to postgres db
const dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};
const { Pool } = require("pg");
const db = new Pool(dbParams);
const dbController = new postgresController_1.PostgresController(db);
// configure routes
const indexRoutes = new index_1.IndexExpressRoutes("/", dbController);
const groupRoutes = new group_1.GroupExpressRoutes("/group", dbController);
const userRoutes = new user_1.UserExpressRoutes("/user", dbController);
const rateRoutes = new rate_1.RateExpressRoutes("/rate", dbController);
app.use(indexRoutes.baseEndpoint, indexRoutes.router);
app.use(groupRoutes.baseEndpoint, groupRoutes.router);
app.use(userRoutes.baseEndpoint, userRoutes.router);
app.use(rateRoutes.baseEndpoint, rateRoutes.router);
// configure socket connection
io.on("connection", socket => {
    const users = [];
    socket.on("join", ({ userName, roomId }) => {
        if (!users.includes(userName))
            users.push(userName);
        socket.room_id = roomId;
        socket.join(socket.room_id);
        io.to(socket.room_id).emit("displayUsers", { users });
    });
    socket.on("message", data => {
        io.to(data.roomId).emit("message", data);
    });
    // listens for user leaving room, but not disconnected from browser or socket
    socket.on("leaveRoom", ({ userName, roomId }) => {
        if (users.includes(userName))
            users.splice(users.indexOf(userName), 1);
        io.to(socket.room_id).emit("displayUsers", { users });
        socket.leave(socket.room_id);
    });
    // listens for socket disconnect (when browser is closed or refreshed)
    socket.on("disconnect", () => {
        io.to(socket.room_id).emit("displayUsers", { users });
    });
    socket.on("IDE", data => {
        io.to(data.roomId).emit("IDE", data);
    });
});
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
//# sourceMappingURL=server.js.map