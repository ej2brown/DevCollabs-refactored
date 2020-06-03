import { AbstractExpressRoutes } from "./expressRoutes";
// const IDatabaseController = require("./dbHelpers/dbHelpers");

export class GroupExpressRoutes extends AbstractExpressRoutes {
  private m_dbHelpers: any;

  constructor(baseEndpoint: string, db: any) {
    super(baseEndpoint);
    this.m_dbHelpers = db;
    this.setupRouter();
  }

  private get dbHelpers(): any {
    return this.m_dbHelpers;
  }

  private setupRouter(): void {
    this.router.get("/:group_id", (req: { params: { group_id: any; }; }, res: { send: (arg0: any) => void; }) => {
      const selectedGroupId = req.params.group_id;
      this.dbHelpers
        //gets the posts of a group
        .getGroupsPosts(selectedGroupId)
        .then((data: any) => {
          res.send(data);
        })
        .catch((e: { stack: any; }) => e.stack);
    });

    this.router.post("/:group_id/post/create", (req: { params: { group_id: any; }; body: { userId: any; data: any; image_url: any; }; }, res: { send: (arg0: null) => void; }) => {
      const groupId = req.params.group_id;
      const { userId, data, image_url } = req.body;

      this.dbHelpers
        .getSubscriptionsWithUser(userId, groupId)
        .then((subscription: any) => {
          //
          if (subscription) {
            //If subscription does exist create a post
            this.dbHelpers
              .createPost(groupId, userId, data, image_url)
              .then((data: any) => {
                res.send(data);
              })
              .catch((e: { stack: any; }) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e: { stack: any; }) => e.stack);
    });

    this.router.delete("/:group_id/subscription", (req: { params: { group_id: any; }; body: { id: any; }; }, res: { send: (arg0: null) => void; }) => {
      const groupId = req.params.group_id;
      const userId = req.body.id;

      this.dbHelpers
        .checkUserSubscription(userId, groupId)
        .then((subscription: boolean) => {
          //If user is admin of the group they're subscribed to
          if (subscription === true) {
            this.dbHelpers
              .removeSubscription(userId, groupId)
              .then((data: any) => res.send(data))
              .catch((e: { stack: any; }) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e: { stack: any; }) => e.stack);
    });

    this.router.post("/:group_id/subscription", (req: { params: { group_id: any; }; body: { id: any; }; }, res: { send: (arg0: null) => void; }) => {
      const groupId = req.params.group_id;
      const userId = req.body.id;

      this.dbHelpers
        .checkUserSubscription(userId, groupId)
        .then((subscription: any) => {
          //If user is admin of the group they're subscribed to
          if (!subscription) {
            this.dbHelpers
              .addSubscription(groupId, userId, false)
              .then((data: any) => {
                res.send(data);
              })
              .catch((e: { stack: any; }) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e: { stack: any; }) => e.stack);
    });

    this.router.post("/create", (req: { body: { userId: any; groupName: any; }; }, res: { send: (arg0: any) => any; }) => {
      const { userId, groupName } = req.body;

      this.dbHelpers
        .createGroupAndSubscription(userId, groupName)
        .then((data: any) => res.send(data))
        .catch((e: { stack: any; }) => e.stack);
    });

    this.router.delete("/:group_id/delete", (req: { params: { group_id: any; }; body: { id: any; }; }, res: { send: (arg0: null) => void; }) => {
      const groupId = req.params.group_id;
      const userId = req.body.id;

      this.dbHelpers
        .getSubscriptionsWithUser(userId, groupId)
        .then((subscription: { is_admin: any; }) => {
          //If user is admin of the group they're subscribed to
          if (subscription && subscription.is_admin) {
            this.dbHelpers
              .deleteGroup(groupId)
              .then((data: any) => {
                res.send(data);
              })
              .catch((e: { stack: any; }) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e: { stack: any; }) => e.stack);
    });
  }
}

module.exports.GroupExpressRoutes = GroupExpressRoutes;