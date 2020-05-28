import {IRoutes} from './routes/routes.interface';
import {IndexExpressRoutes} from './routes/index';
import {GroupExpressRoutes} from './routes/group';
import {UserExpressRoutes} from './routes/user';
import {RateExpressRoutes} from './routes/rate';

const indexRoutes: IRoutes = new IndexExpressRoutes('/', db);
const groupRoutes: IRoutes = new GroupExpressRoutes('/group', db);
const userRoutes: IRoutes = new UserExpressRoutes('/user', db);
const rateRoutes: IRoutes = new RateExpressRoutes('/rate', db);

app.use(indexRoutes.baseEndpoint, indexRoutes.router)
app.use(groupRoutes.baseEndpoint, groupRoutes.router)
app.use(userRoutes.baseEndpoint, userRoutes.router)
app.use(rateRoutes.baseEndpoint, rateRoutes.router)

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
