import { AbstractExpressRoutes } from "./expressRoutes";
const dbHelpersClass = require("./dbHelpers/dbHelpers.ts");

export class RateExpressRoutes extends AbstractExpressRoutes {
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
      const { raterId, rating } = req.body;

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
          } else {
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
