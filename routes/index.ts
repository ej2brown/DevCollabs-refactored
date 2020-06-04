import { AbstractExpressRoutes } from "./expressRoutes";
import { IDatabaseController } from '../src/database/databaseController.interface';

export class IndexExpressRoutes extends AbstractExpressRoutes {
  private m_dbHelpers: IDatabaseController;

  constructor(baseEndpoint: string, db: IDatabaseController) {
    super(baseEndpoint);
    this.m_dbHelpers = db;
    this.setupRouter();
  }

  private get dbHelpers(): any {
    return this.m_dbHelpers;
  }

  private setupRouter(): void {
    //returns data: {array<[group_id:interger, user_id:interger, data:string, created_at:time]>}
    this.router.get("/", (req: any, res: { send: (arg0: any) => void; }) => {
       this.dbHelpers
        //get all groups posts
        .getAllGroups()
        .then((data: any) => {
          console.log(data);
          res.send(data);
        }) 
        .catch((e: { stack: any; }) => e.stack);
    });
  }
}
module.exports.IndexExpressRoutes = IndexExpressRoutes;