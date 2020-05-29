"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbHelpersClass = void 0;
// const bcrypt = require("bcrypt");
class dbHelpersClass {
    constructor(db) {
        this.createPost = (groupId, userId, data, image_url) => {
            return this.db
                .query(`
      INSERT INTO posts 
      (group_id, user_id, data, image_url, created_at)
      VALUES
      ($1 , $2, $3, $4, NOW()::TIMESTAMP)
      RETURNING *;
      `, [groupId, userId, data, image_url])
                .then((res) => res.rows[0])
                .catch((e) => e.stack);
        };
        this.removeSubscription = (userId, groupId) => {
            return this.db
                .query(`
        DELETE FROM subscriptions
        WHERE user_id = $1
        AND group_id = $2; 
      `, [userId, groupId])
                .then((res) => res.rows[0])
                .catch((e) => e.stack);
        };
        this.getSubscriptionsWithUser = (userId, groupId) => {
            return this.db
                .query(`
        SELECT * FROM subscriptions
        WHERE user_id = $1 
        AND group_id = $2
        LIMIT 1;
          `, [userId, groupId])
                .then((res) => res.rows[0])
                .catch((e) => e.stack);
        };
        this.deleteGroup = (groupId) => {
            return this.db
                .query(`
        DELETE FROM groups
        WHERE id = $1;
        `, [groupId])
                .then((res) => res.rows[0])
                .catch((e) => e.stack);
        };
        /* For ../rate.ts */
        this.getUserRating = (userId) => {
            return this.db
                .query(`
          SELECT AVG(rating)
          FROM ratings
          WHERE rated_user_id = $1;
        `, [userId])
                .then((res) => res.rows[0])
                .catch((e) => e);
        };
        this.checkRatingExist = (ratedId, raterId) => {
            return this.db
                .query(`
        SELECT * FROM ratings
        WHERE rated_user_id = $1
        AND rater_user_id = $2;
      `, [ratedId, raterId])
                .then((res) => res.rows[0] || null)
                .catch((e) => e);
        };
        this.rateUser = (ratedId, raterId, rating) => {
            return this.db
                .query(`
      INSERT INTO ratings
      (rater_user_id, rated_user_id, rating)
      VALUES
      ($1, $2, $3)
      RETURNING *;
      `, [raterId, ratedId, rating])
                .then((res) => res.rows[0] || null)
                .catch((e) => e);
        };
        this.updateRating = (ratedId, raterId, newRating) => {
            return this.db
                .query(`
      UPDATE ratings
      SET rating = $3
      WHERE rated_user_id = $1
      AND rater_user_id = $2
      RETURNING *;
      `, [ratedId, raterId, newRating])
                .then((res) => res.rows[0] || null)
                .catch((e) => e);
        };
        this.db = db;
    }
    /* For ../user.ts */
    addUser(user) {
        const { username, email, password, avatar_image } = user;
        return this.db
            .query(`
        INSERT INTO users
        (username, email, password, avatar_image)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *;
        `, [username, email, bcrypt.hashSync(password, 12), avatar_image])
            .then((res) => {
            if (res.rows.length === 0)
                return null;
            return res.rows[0];
        })
            .catch((e) => null);
    }
    getGroupsNames(userId) {
        return this.db
            .query(`
        SELECT groups.id, groups.name
        FROM subscriptions
        JOIN groups ON group_id = groups.id 
        WHERE user_id = $1;
        `, [userId])
            .then((res) => {
            if (res.rows.length === 0)
                return null;
            return res.rows;
        });
    }
    /* For ../group.ts */
    getAllGroups() {
        return this.db
            .query(`
        SELECT * FROM groups;
        `)
            .then((res) => {
            if (res.rows.length === 0)
                return null;
            return res.rows;
        });
    }
    getGroupsPosts(groupId) {
        return this.db
            .query(`
        SELECT posts.*, username
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE group_id = $1
        ORDER BY id DESC;
        `, [groupId])
            .then((res) => {
            if (res.rows.length === 0)
                return null;
            return res.rows;
        });
    }
    checkUserSubscription(userId, groupId) {
        return this.db
            .query(`
        SELECT * FROM subscriptions 
        WHERE user_id = $1 
        AND group_id = $2;
        `, [userId, groupId])
            .then((res) => {
            if (res.rows.length === 0) {
                return false;
            }
            return true;
        })
            .catch((e) => e.stack);
    }
    addSubscription(groupId, userId, is_admin) {
        return this.db
            .query(`
    INSERT INTO subscriptions
    (group_id, user_id, is_admin)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `, [groupId, userId, is_admin])
            .then((res) => res.rows[0])
            .catch((e) => null);
    }
    createGroupAndSubscription(userId, groupName) {
        return this.db
            .query(`
        INSERT INTO groups
        (name)
        VALUES
        ($1)
        RETURNING *;
        `, [groupName])
            .then((res) => res.rows[0].id)
            .then((groupId) => {
            return this.db
                .query(`
          INSERT INTO subscriptions
          (group_id, user_id, is_admin)
          VALUES
          ($1, $2, $3)
          RETURNING *;
          `, [groupId, userId, true])
                .then((res) => {
                return res.rows[0];
            })
                .catch((e) => e);
        });
    }
}
exports.dbHelpersClass = dbHelpersClass;
module.exports.dbHelpersClass = dbHelpersClass;
//# sourceMappingURL=dbHelpers.js.map