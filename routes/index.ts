import { AbstractExpressRoutes } from "./expressRoutes";
const dbHelpersClass = require("./dbHelpers/dbHelpers");

export class IndexExpressRoutes extends AbstractExpressRoutes {
  private m_dbHelpers: any;

  constructor(baseEndpoint: string, db: any) {
    super(baseEndpoint);
    this.m_dbHelpers = dbHelpersClass(db);
    this.setupRouter();
  }

  private get dbHelpers(): any {
    return this.m_dbHelpers;
  }

  private setupRouter(): void {
    //returns data: {array<[group_id:interger, user_id:interger, data:string, created_at:time]>}
    this.router.get("/", (req: any, res: { send: (arg0: any) => void; }) => {
      console.log('here')
       this.dbHelpers
        //get all groups posts
        .getAllGroups()
        .then((data: any) => {
          res.send(data);
        }) 
        .catch((e: { stack: any; }) => e.stack);
       
    });
  }
}
module.exports.IndexExpressRoutes = IndexExpressRoutes;