const bcrypt = require("bcrypt");
import { IQuery } from "./dbHelpers";

export class dbHelpersClass implements IQuery {
  constructor() {
    
  }

  /* For ../user.ts */
  addUser = function (user: any) {
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
        [username, email, bcrypt.hashSync(password, 12), avatar_image]
      )
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows[0];
      })
      .catch((e) => null);
  };

  getGroupsNames = function (userId: number) {
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
      .then((res) => {
        if (res.rows.length === 0) return null;
        return res.rows;
      });
  };

  /* For ../group.ts */
  getAllGroups = function() {
    return db
      .query(
        `
        SELECT * FROM groups;
        `
      )
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows
      })
  }

  getGroupsPosts = function(groupId) {
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
      .then(res => {
        if (res.rows.length === 0) return null
        return res.rows
      })
  }

  createPost = (group_id, user_id, data, image_url) => {
    return db
      .query(
        `
      INSERT INTO posts 
      (group_id, user_id, data, image_url, created_at)
      VALUES
      ($1 , $2, $3, $4, NOW()::TIMESTAMP)
      RETURNING *;
      `,
        [group_id, user_id, data, image_url]
        // [group_id, user_id, data, image_url | null]
      )
      .then(res => res.rows[0])
      .catch(e => e.stack)
  }

  removeSubscription = (userID, groupID) => {
    return db
      .query(
        `
        DELETE FROM subscriptions
        WHERE user_id = $1
        AND group_id = $2; 
      `,
        [userID, groupID]
      )
      .then(res => res.rows[0])
      .catch(e => e.stack)
  }

  checkUserSubscription = function(user_id, group_id) {
    return db
      .query(
        `
        SELECT * FROM subscriptions 
        WHERE user_id = $1 
        AND group_id = $2;
        `,
        [user_id, group_id]
      )
      .then(res => {
        if (res.rows.length === 0) {
          return false
        }
        return true
      })
      .catch(e => e.stack)
  }

  addSubscription = function(groupId, userId, is_admin) {
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
      .then(res => res.rows[0])
      .catch(e => null)
  }

  createGroupAndSubscription = function(userId, groupName) {
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
      .then(res => res.rows[0].id)
      .then(groupId => {
         return db.query(
          `
          INSERT INTO subscriptions
          (group_id, user_id, is_admin)
          VALUES
          ($1, $2, $3)
          RETURNING *;
          `,
          [groupId, userId, true]
        )
        .then(res => {
          return res.rows[0]
        })
        .catch(e => e)
      })
  }

  getSubscriptionsWithUser = (user_id, group_id) => {
    return db
      .query(
        `
        SELECT * FROM subscriptions
        WHERE user_id = $1 
        AND group_id = $2
        LIMIT 1;
          `,
        [user_id, group_id]
      )
      .then((res) => res.rows[0])
      .catch((e) => e.stack);
  };

  deleteGroup = group_id => {
    return db
      .query(
        `
        DELETE FROM groups
        WHERE id = $1;
        `,
        [group_id]
      )
      .then(res => res.rows[0])
      .catch(e => e.stack)
  }

  /* For ../rate.ts */

  getUserRating = (userID) => {
    return db
      .query(
        `
          SELECT AVG(rating)
          FROM ratings
          WHERE rated_user_id = $1;
        `,
        [userID]
      )
      .then((res) => res.rows[0])
      .catch((e) => e);
  };

  checkRatingExist = (ratedId, raterId) => {
    return db
      .query(
        `
        SELECT * FROM ratings
        WHERE rated_user_id = $1
        AND rater_user_id = $2;
      `,
        [ratedId, raterId]
      )
      .then((res) => res.rows[0] || null)
      .catch((e) => e);
  };

  rateUser = (ratedId, raterId, rating) => {
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
      .then((res) => res.rows[0] || null)
      .catch((e) => e);
  };

  updateRating = (ratedId, raterId, newRating) => {
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
      .then((res) => res.rows[0] || null)
      .catch((e) => e);
  };
}
