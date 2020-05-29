import { AbstractExpressRoutes } from "./expressRoutes";
const dbHelpersClass = require("./dbHelpers/dbHelpers.ts");

export class UserExpressRoutes extends AbstractExpressRoutes {
  private m_dbHelpers: any;

  constructor(baseEndpoint: string, db: any) {
    super(baseEndpoint);
    this.m_dbHelpers = dbHelpersClass(db);
    this.setupRouter();
  }

  private get dbHelpers(): any {
    return this.m_dbHelpers;
  }

  // get all groups ids and names the user belongs to. returns data: {array<[id:interger, name:string]>}
  private setupRouter(): void {
    this.router.post("/register", (req: { body: any; }, res: { send: (arg0: any) => void; }) => {
      const currentUserId = req.body;
      this.dbHelpers
        .addUser(currentUserId)
        .then((data: any) => {
          res.send(data);
        })
        .catch((e: { stack: any; }) => e.stack);
    });

    this.router.get("/:user_id/groups", (req: { params: { user_id: any; }; }, res: { send: (arg0: any) => void; }) => {
      const currentUserId = req.params.user_id;
      this.dbHelpers
        .getGroupsNames(currentUserId)
        .then((data: any) => {
          res.send(data);
        })
        .catch((e: { stack: any; }) => e.stack);
    });
  }
}

module.exports.UserExpressRoutes = UserExpressRoutes;