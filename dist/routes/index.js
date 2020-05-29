"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexExpressRoutes = void 0;
const expressRoutes_1 = require("./expressRoutes");
const dbHelpersClass = require("./dbHelpers/dbHelpers");
class IndexExpressRoutes extends expressRoutes_1.AbstractExpressRoutes {
    constructor(baseEndpoint, db) {
        super(baseEndpoint);
        this.m_dbHelpers = dbHelpersClass;
        this.setupRouter();
    }
    get dbHelpers() {
        return this.m_dbHelpers;
    }
    setupRouter() {
        //returns data: {array<[group_id:interger, user_id:interger, data:string, created_at:time]>}
        this.router.get("/", (req, res) => {
            this.dbHelpers
                //get all groups posts
                .getAllGroups()
                .then((data) => {
                res.send(data);
            })
                .catch((e) => e.stack);
        });
    }
}
exports.IndexExpressRoutes = IndexExpressRoutes;
module.exports.IndexExpressRoutes = IndexExpressRoutes;
//# sourceMappingURL=index.js.map