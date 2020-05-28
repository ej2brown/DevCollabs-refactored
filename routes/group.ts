import { AbstractExpressRoutes } from "./expressRoutes";
const dbHelpersClass = require("./dbHelpers/dbHelpers.ts");

export class GroupExpressRoutes extends AbstractExpressRoutes {
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

    this.router.get("/:group_id", (req, res) => {
      const selectedGroupId = req.params.group_id;
      this.dbHelpers
        //gets the posts of a group
        .getGroupsPosts(selectedGroupId)
        .then((data) => {
          res.send(data);
        })
        .catch((e) => e.stack);
    });

    this.router.post("/:group_id/post/create", (req, res) => {
      const groupId = req.params.group_id;
      const { userId, data, image_url } = req.body;

      this.dbHelpers
        .getSubscriptionsWithUser(userId, groupId)
        .then((subscription) => {
          //
          if (subscription) {
            //If subscription does exist create a post
            this.dbHelpers
              .createPost(groupId, userId, data, image_url)
              .then((data) => {
                res.send(data);
              })
              .catch((e) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e) => e.stack);
    });

    this.router.delete("/:group_id/subscription", (req, res) => {
      const groupId = req.params.group_id;
      const userId = req.body.id;

      this.dbHelpers
        .checkUserSubscription(userId, groupId)
        .then((subscription) => {
          //If user is admin of the group they're subscribed to
          if (subscription === true) {
            this.dbHelpers
              .removeSubscription(userId, groupId)
              .then((data) => res.send(data))
              .catch((e) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e) => e.stack);
    });

    this.router.post("/:group_id/subscription", (req, res) => {
      const groupId = req.params.group_id;
      const userId = req.body.id;

      this.dbHelpers
        .checkUserSubscription(userId, groupId)
        .then((subscription) => {
          //If user is admin of the group they're subscribed to
          if (!subscription) {
            this.dbHelpers
              .addSubscription(groupId, userId, false)
              .then((data) => {
                res.send(data);
              })
              .catch((e) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e) => e.stack);
    });

    this.router.post("/create", (req, res) => {
      const { userId, groupName } = req.body;

      this.dbHelpers
        .createGroupAndSubscription(userId, groupName)
        .then((data) => res.send(data))
        .catch((e) => e.stack);
    });

    this.router.delete("/:group_id/delete", (req, res) => {
      const groupId = req.params.group_id;
      const userId = req.body.id;

      this.dbHelpers
        .getSubscriptionsWithUser(userId, groupId)
        .then((subscription) => {
          //If user is admin of the group they're subscribed to
          if (subscription && subscription.is_admin) {
            this.dbHelpers
              .deleteGroup(groupId)
              .then((data) => {
                res.send(data);
              })
              .catch((e) => e.stack);
          } else {
            res.send(null);
          }
        })
        .catch((e) => e.stack);
    });
  }
}
