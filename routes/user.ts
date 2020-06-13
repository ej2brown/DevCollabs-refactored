import { AbstractExpressRoutes } from "./expressRoutes";
import type { IDatabaseController } from "../server-src/database/databaseController.interface";

export class UserExpressRoutes extends AbstractExpressRoutes {
  private m_dbHelpers: IDatabaseController;

  constructor(baseEndpoint: string, db: IDatabaseController) {
    super(baseEndpoint);
    this.m_dbHelpers = db;
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