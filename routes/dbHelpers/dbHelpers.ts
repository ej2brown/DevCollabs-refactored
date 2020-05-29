// const bcrypt = require("bcrypt");
import type IQuery from "./interface"

export class dbHelpersClass implements IQuery {
  db: any;

  constructor(db: any) {
    this.db = db;
  }

  /* For ../user.ts */
  addUser(user: any) {
    const { username, email, password, avatar_image } = user;
    return this.db
      .query(
        `
        INSERT INTO users
        (username, email, password, avatar_image)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *;
        `,
        [username, email, password, avatar_image] //removed bcrypt bcrypt.hashSync(password, 12)
      )
      .then((res: { rows: string | any[]; }) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((e: any) => null);
  }

  getGroupsNames(userId: number) {
    return this.db
      .query(
        `
        SELECT groups.id, groups.name
        FROM subscriptions
        JOIN groups ON group_id = groups.id 
        WHERE user_id = $1;
        `,
        [userId]
      )
      .then((res: { rows: string | any[]; }) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  }

  /* For ../group.ts */
  getAllGroups() {
    return this.db
      .query(
        `
        SELECT * FROM groups;
        `
      )
      .then((res: { rows: string | any[]; }) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  }

  getGroupsPosts(groupId: number) {
    return this.db
      .query(
        `
        SELECT posts.*, username
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE group_id = $1
        ORDER BY id DESC;
        `,
        [groupId]
      )
      .then((res: { rows: string | any[]; }) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  }

  createPost = (groupId: number, userId: number, data: any, image_url: string) => {
    return this.db
      .query(
        `
      INSERT INTO posts 
      (group_id, user_id, data, image_url, created_at)
      VALUES
      ($1 , $2, $3, $4, NOW()::TIMESTAMP)
      RETURNING *;
      `,
        [groupId, userId, data, image_url]
      )
      .then((res: { rows: any[]; }) => res.rows[0])
      .catch((e: { stack: any; }) => e.stack);
  };

  removeSubscription = (userId: number, groupId: number) => {
    return this.db
      .query(
        `
        DELETE FROM subscriptions
        WHERE user_id = $1
        AND group_id = $2; 
      `,
        [userId, groupId]
      )
      .then((res: { rows: any[]; }) => res.rows[0])
      .catch((e: { stack: any; }) => e.stack);
  };

  checkUserSubscription(userId: number, groupId: number) {
    return this.db
      .query(
        `
        SELECT * FROM subscriptions 
        WHERE user_id = $1 
        AND group_id = $2;
        `,
        [userId, groupId]
      )
      .then((res: { rows: string | any[]; }) => {
        if (res.rows.length === 0) {
          return false;
        }
        return true;
      })
      .catch((e: { stack: any; }) => e.stack);
  }

  addSubscription(groupId :number, userId: number, is_admin: boolean) {
    return this.db
      .query(
        `
    INSERT INTO subscriptions
    (group_id, user_id, is_admin)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `,
        [groupId, userId, is_admin]
      )
      .then((res: { rows: any[]; }) => res.rows[0])
      .catch((e: any) => null);
  }

  createGroupAndSubscription(userId :number, groupName :string) {
    return this.db
      .query(
        `
        INSERT INTO groups
        (name)
        VALUES
        ($1)
        RETURNING *;
        `,
        [groupName]
      )
      .then((res: { rows: { id: any; }[]; }) => res.rows[0].id)
      .then((groupId: any) => {
        return this.db
          .query(
            `
          INSERT INTO subscriptions
          (group_id, user_id, is_admin)
          VALUES
          ($1, $2, $3)
          RETURNING *;
          `,
            [groupId, userId, true]
          )
          .then((res: { rows: any[]; }) => {
            return res.rows[0];
          })
          .catch((e: any) => e);
      });
  }

  getSubscriptionsWithUser = (userId :number, groupId :number) => {
    return this.db
      .query(
        `
        SELECT * FROM subscriptions
        WHERE user_id = $1 
        AND group_id = $2
        LIMIT 1;
          `,
        [userId, groupId]
      )
      .then((res: { rows: any[]; }) => res.rows[0])
      .catch((e: { stack: any; }) => e.stack);
  };

  deleteGroup = (groupId :number) => {
    return this.db
      .query(
        `
        DELETE FROM groups
        WHERE id = $1;
        `,
        [groupId]
      )
      .then((res: { rows: any[]; }) => res.rows[0])
      .catch((e: { stack: any; }) => e.stack);
  };

  /* For ../rate.ts */

  getUserRating = (userId :number) => {
    return this.db
      .query(
        `
          SELECT AVG(rating)
          FROM ratings
          WHERE rated_user_id = $1;
        `,
        [userId]
      )
      .then((res: { rows: any[]; }) => res.rows[0])
      .catch((e: any) => e);
  };

  checkRatingExist = (ratedId :number, raterId :number) => {
    return this.db
      .query(
        `
        SELECT * FROM ratings
        WHERE rated_user_id = $1
        AND rater_user_id = $2;
      `,
        [ratedId, raterId]
      )
      .then((res: { rows: any[]; }) => res.rows[0] || null)
      .catch((e: any) => e);
  };

  rateUser = (ratedId :number, raterId :number, rating :number) => {
    return this.db
      .query(
        `
      INSERT INTO ratings
      (rater_user_id, rated_user_id, rating)
      VALUES
      ($1, $2, $3)
      RETURNING *;
      `,
        [raterId, ratedId, rating]
      )
      .then((res: { rows: any[]; }) => res.rows[0] || null)
      .catch((e: any) => e);
  };

  updateRating = (ratedId :number, raterId :number, newRating :number) => {
    return this.db
      .query(
        `
      UPDATE ratings
      SET rating = $3
      WHERE rated_user_id = $1
      AND rater_user_id = $2
      RETURNING *;
      `,
        [ratedId, raterId, newRating]
      )
      .then((res: { rows: any[]; }) => res.rows[0] || null)
      .catch((e: any) => e);
  };
}


module.exports.dbHelpersClass = dbHelpersClass;