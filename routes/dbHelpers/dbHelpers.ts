const bcrypt = require("bcrypt");
import type IQuery from "./interface";

// export class dbHelpersClass implements IQuery {
module.exports = db => {
  // db: any;

  // constructor(db: any) {
  //   this.db = db;
  // }

  /* For ../user.ts */
  const addUser = function (user: any) {
    const { username, email, password, avatar_image } = user;
    return db
      .query(
        `
        INSERT INTO users
        (username, email, password, avatar_image)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *;
        `,
        [username, email, bcrypt.hashSync(password, 12), avatar_image] //removed bcrypt bcrypt.hashSync(password, 12)
      )
      .then((res: { rows: string | any[]; }) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((e: any) => null);
  };

  const getGroupsNames = function (userId: number) {
    return db
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
  };

  /* For ../group.ts */
  const getAllGroups = function () {
    return db
      .query(
        `
        SELECT * FROM groups;
        `
      )
      .then((res: { rows: string | any[]; }) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  };

  const getGroupsPosts = function (groupId: number) {
    return db
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
  };

  const createPost = function (groupId: number, userId: number, data: any, image_url: string) {
    return db
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

  const removeSubscription = function (userId: number, groupId: number) {
    return db
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

  const checkUserSubscription = function (userId: number, groupId: number) {
    return db
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
  };

  const addSubscription = function (groupId: number, userId: number, is_admin: boolean) {
    return db
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
  };

  const createGroupAndSubscription = function (userId: number, groupName: string) {
    return db
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
        return db
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
  };

  const getSubscriptionsWithUser = function (userId: number, groupId: number) {
    return db
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

  const deleteGroup = function (groupId: number) {
    return db
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

  const getUserRating = function (userId: number) {
    return db
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

  const checkRatingExist = function (ratedId: number, raterId: number) {
    return db
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

  const rateUser = (ratedId: number, raterId: number, rating: number) => {
    return db
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

  const updateRating = (ratedId: number, raterId: number, newRating: number) => {
    return db
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

  return {
    addUser,
    getGroupsNames,
    createGroupAndSubscription,
    deleteGroup,
    getSubscriptionsWithUser,
    addSubscription,
    createPost,
    removeSubscription,
    getGroupsPosts,
    getAllGroups,
    checkUserSubscription,
    getUserRating,
    checkRatingExist,
    rateUser,
    updateRating
  };
};
// module.exports.dbHelpersClass = dbHelpersClass;