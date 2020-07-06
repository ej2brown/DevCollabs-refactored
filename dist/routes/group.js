"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupExpressRoutes = void 0;
const expressRoutes_1 = require("./expressRoutes");
class GroupExpressRoutes extends expressRoutes_1.AbstractExpressRoutes {
    constructor(baseEndpoint, db) {
        super(baseEndpoint);
        this.m_dbHelpers = db;
        this.setupRouter();
    }
    get dbHelpers() {
        return this.m_dbHelpers;
    }
    setupRouter() {
        this.router.get("/:group_id", (req, res) => {
            const selectedGroupId = req.params.group_id;
            console.log(typeof this.dbHelpers.getGroupsPosts);
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
                }
                else {
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
                }
                else {
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
                }
                else {
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
                }
                else {
                    res.send(null);
                }
            })
                .catch((e) => e.stack);
        });
    }
}
exports.GroupExpressRoutes = GroupExpressRoutes;
module.exports.GroupExpressRoutes = GroupExpressRoutes;
//# sourceMappingURL=group.js.map