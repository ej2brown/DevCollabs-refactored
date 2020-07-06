"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExpressRoutes = void 0;
const expressRoutes_1 = require("./expressRoutes");
class UserExpressRoutes extends expressRoutes_1.AbstractExpressRoutes {
    constructor(baseEndpoint, db) {
        super(baseEndpoint);
        this.m_dbHelpers = db;
        this.setupRouter();
    }
    get dbHelpers() {
        return this.m_dbHelpers;
    }
    // get all groups ids and names the user belongs to. returns data: {array<[id:interger, name:string]>}
    setupRouter() {
        this.router.post("/register", (req, res) => {
            const currentUserId = req.body;
            this.dbHelpers
                .addUser(currentUserId)
                .then((data) => {
                res.send(data);
            })
                .catch((e) => e.stack);
        });
        this.router.get("/:user_id/groups", (req, res) => {
            const currentUserId = req.params.user_id;
            this.dbHelpers
                .getGroupsNames(currentUserId)
                .then((data) => {
                res.send(data);
            })
                .catch((e) => e.stack);
        });
    }
}
exports.UserExpressRoutes = UserExpressRoutes;
module.exports.UserExpressRoutes = UserExpressRoutes;
//# sourceMappingURL=user.js.map