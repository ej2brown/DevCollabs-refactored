"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
// export class dbHelpersClass implements IQuery {
module.exports = db => {
    // db: any;
    // constructor(db: any) {
    //   this.db = db;
    // }
    /* For ../user.ts */
    const addUser = function (user) {
        const { username, email, password, avatar_image } = user;
        return db
            .query(`
        INSERT INTO users
        (username, email, password, avatar_image)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *;
        `, [username, email, bcrypt.hashSync(password, 12), avatar_image] //removed bcrypt bcrypt.hashSync(password, 12)
        )
            .then((res) => {
            if (res.rows.length === 0)
                return null;
            return res.rows[0];
        })
            .catch((e) => null);
    };
    const getGroupsNames = function (userId) {
        return db
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
    };
    /* For ../group.ts */
    const getAllGroups = function () {
        return db
            .query(`
        SELECT * FROM groups;
        `)
            .then((res) => {
            if (res.rows.length === 0)
                return null;
            return res.rows;
        });
    };
    const getGroupsPosts = function (groupId) {
        return db
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
    };
    const createPost = function (groupId, userId, data, image_url) {
        return db
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
    const removeSubscription = function (userId, groupId) {
        return db
            .query(`
        DELETE FROM subscriptions
        WHERE user_id = $1
        AND group_id = $2; 
      `, [userId, groupId])
            .then((res) => res.rows[0])
            .catch((e) => e.stack);
    };
    const checkUserSubscription = function (userId, groupId) {
        return db
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
    };
    const addSubscription = function (groupId, userId, is_admin) {
        return db
            .query(`
    INSERT INTO subscriptions
    (group_id, user_id, is_admin)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `, [groupId, userId, is_admin])
            .then((res) => res.rows[0])
            .catch((e) => null);
    };
    const createGroupAndSubscription = function (userId, groupName) {
        return db
            .query(`
        INSERT INTO groups
        (name)
        VALUES
        ($1)
        RETURNING *;
        `, [groupName])
            .then((res) => res.rows[0].id)
            .then((groupId) => {
            return db
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
    };
    const getSubscriptionsWithUser = function (userId, groupId) {
        return db
            .query(`
        SELECT * FROM subscriptions
        WHERE user_id = $1 
        AND group_id = $2
        LIMIT 1;
          `, [userId, groupId])
            .then((res) => res.rows[0])
            .catch((e) => e.stack);
    };
    const deleteGroup = function (groupId) {
        return db
            .query(`
        DELETE FROM groups
        WHERE id = $1;
        `, [groupId])
            .then((res) => res.rows[0])
            .catch((e) => e.stack);
    };
    /* For ../rate.ts */
    const getUserRating = function (userId) {
        return db
            .query(`
          SELECT AVG(rating)
          FROM ratings
          WHERE rated_user_id = $1;
        `, [userId])
            .then((res) => res.rows[0])
            .catch((e) => e);
    };
    const checkRatingExist = function (ratedId, raterId) {
        return db
            .query(`
        SELECT * FROM ratings
        WHERE rated_user_id = $1
        AND rater_user_id = $2;
      `, [ratedId, raterId])
            .then((res) => res.rows[0] || null)
            .catch((e) => e);
    };
    const rateUser = (ratedId, raterId, rating) => {
        return db
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
    const updateRating = (ratedId, raterId, newRating) => {
        return db
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
//# sourceMappingURL=dbHelpers.js.map