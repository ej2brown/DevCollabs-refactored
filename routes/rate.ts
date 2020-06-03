import { AbstractExpressRoutes } from "./expressRoutes";
const dbHelpersClass = require("./dbHelpers/dbHelpers");

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
    this.router.get("/:user_id", (req: { params: { user_id: any; }; }, res: { send: (arg0: any) => void; }) => {
      const ratedUserId = req.params.user_id;
      this.dbHelpers
        .getUserRating(ratedUserId)
        .then((data: any) => {
          res.send(data);
        })
        .catch((e: { stack: any; }) => e.stack);
    });

    this.router.post("/:rated_id", (req: { params: { rated_id: any; }; body: { raterId: any; rating: any; }; }, res: { send: (arg0: any) => void; }) => {
      const ratedId = req.params.rated_id;
      const raterId = 1;
      const rating = 5;

      // const { raterId, rating } = req.body;
      console.log('here')

      console.log(req.body)
      this.dbHelpers
        .checkRatingExist(ratedId, raterId)
        .then((data: any) => {
          //
          if (!data) {
            //If rating doesnt exist create a rating
            this.dbHelpers
              .rateUser(ratedId, raterId, rating)
              .then((data: any) => {
                res.send(data);
              })
              .catch((e: { stack: any; }) => e.stack);
          } else {
            //Change user rating if it does
            this.dbHelpers
              .updateRating(ratedId, raterId, rating)
              .then((data: any) => {
                res.send(data);
              })
              .catch((e: { stack: any; }) => e.stack);
          }
        })
        .catch((e: { stack: any; }) => e.stack);
    });
  }
}



exports.RateExpressRoutes = RateExpressRoutes;