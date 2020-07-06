"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateExpressRoutes = void 0;
const expressRoutes_1 = require("./expressRoutes");
class RateExpressRoutes extends expressRoutes_1.AbstractExpressRoutes {
    constructor(baseEndpoint, db) {
        super(baseEndpoint);
        this.m_dbHelpers = db;
        this.setupRouter();
    }
    get dbHelpers() {
        return this.m_dbHelpers;
    }
    setupRouter() {
        this.router.get("/:user_id", (req, res) => {
            const ratedUserId = req.params.user_id;
            this.dbHelpers
                .getUserRating(ratedUserId)
                .then((data) => {
                res.send(data);
            })
                .catch((e) => e.stack);
        });
        this.router.post("/:rated_id", (req, res) => {
            const ratedId = req.params.rated_id;
            const raterId = 1;
            const rating = 5;
            // const { raterId, rating } = req.body;
            console.log("here");
            console.log(req.body);
            this.dbHelpers
                .checkRatingExist(ratedId, raterId)
                .then((data) => {
                //
                if (!data) {
                    //If rating doesnt exist create a rating
                    this.dbHelpers
                        .rateUser(ratedId, raterId, rating)
                        .then((data) => {
                        res.send(data);
                    })
                        .catch((e) => e.stack);
                }
                else {
                    //Change user rating if it does
                    this.dbHelpers
                        .updateRating(ratedId, raterId, rating)
                        .then((data) => {
                        res.send(data);
                    })
                        .catch((e) => e.stack);
                }
            })
                .catch((e) => e.stack);
        });
    }
}
exports.RateExpressRoutes = RateExpressRoutes;
exports.RateExpressRoutes = RateExpressRoutes;
//# sourceMappingURL=rate.js.map