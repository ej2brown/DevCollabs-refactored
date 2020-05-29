import {IRoutes} from '../routes/routes.interface';
import {IndexExpressRoutes} from '../routes/index';
import {GroupExpressRoutes} from '../routes/group';
import {UserExpressRoutes} from '../routes/user';
import {RateExpressRoutes} from '../routes/rate';

require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const http = require("http")

app.use(bodyParser.json())
app.use(cors())

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


const indexRoutes: IRoutes = new IndexExpressRoutes('/', db);
const groupRoutes: IRoutes = new GroupExpressRoutes('/group', db);
const userRoutes: IRoutes = new UserExpressRoutes('/user', db);
const rateRoutes: IRoutes = new RateExpressRoutes('/rate', db);

app.use(indexRoutes.baseEndpoint, indexRoutes.router)
app.use(groupRoutes.baseEndpoint, groupRoutes.router)
app.use(userRoutes.baseEndpoint, userRoutes.router)
app.use(rateRoutes.baseEndpoint, rateRoutes.router)

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
