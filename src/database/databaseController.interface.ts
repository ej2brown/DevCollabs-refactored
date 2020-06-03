export interface IDatabaseController {
    /**
     * Get a single user from the db given their email.
     * @param {String} user  The email of the user.
     * @return {Promise<{}>} A promise to the user.
     */
    getUserWithEmail(email: string): Promise<any>;

    /**
     * Add a new user to the database.
     * @param {{first_name: string, last_name:string, password: string, email: string}} user
     * @return {Promise<{}>} A promise to the user.
     */
    addUser(user: any): Promise<any>; // TODO Let's make a user model class later

    /**
     * Get a single user from the db given their email.
     * @param {Interger} group_id  group id
     * @return {Promise<{}>} A promise to the user.
     */
    getPostWithGroupID(group_id: number): Promise<any>;

    /**
     * Get a groups data from db using groupId.
     * @param {{integer}} groupId
     * @return {Promise<{}>} A promise to the user.
     */
    getGroup(groupId: number): Promise<any>

    /**
    * Get all groups data from db using userId.
    * @param {{integer}} userId
    * @return {array<[id:interger, name:string]>}
    */
    getGroupsNames(userId: number): Array<any>; // TODO let's make a model class out of what gets returned later

    /**
     * Add a group to db.
     * @param {{string}} name
     * @return {Promise<{}>} A promise to the user.
     */
    addGroup(name: string): Promise<any>;

    checkForUser(username: string): any; // TODO Let's figure out return type for this and make a model class out of it if necessary.

    createGroupAndSubscription(userId: number, groupName: string): any; // TODO Let's figure out return type later

    /**
     * Add a subscription to db using localstorage session to get userId.
     * @param {{group_id: integer, user_id:interger}} subscription
     * @return {Promise<{}>} A promise to the user.
     */
    addSubscription(groupId: number, userId: number, is_admin: boolean): Promise<any>;

    changeUserInfo(user: any): Promise<any>; // TODO Let's make a model class for user. Also is this return type correct?

    /**
     * Delete a group using groupId.
     * @param {{interger}} group_id
     * @return {Promise<{}>} A promise to the user.
     */
    deleteGroup(group_id: number): Promise<any>;

    /**
     * Get a subscription of a user using userId and groupId.
     * @param {{interger}} user_id
     * @param {{interger}} group_id
     * @return {Promise<{}>} A promise to the user.
     */
    getSubscriptionsWithUser(user_id: number, group_id: number): Promise<any>;

    createPost(group_id: number, user_id: number, data: any, image_url: string): Promise<any>; // TODO Let's figure out what type data should be

    /**
     * @param {{integer}} groupId
     * @return {array<[group_id:interger, user_id:interger, data:string, created_at:time]>}
     */
    getGroupsPosts(groupId: number): Array<any>; // TODO Let's make a model class for return type later

    getAllGroups(): any; // TODO Let's figure out the return type

    deleteSubscription(user_id: number, group_id: number): Promise<any>;

    checkUserSubscription(user_id: number, group_id: number): boolean;

    getUserPostsCount(user_id: number): Promise<any>;

    getAllUserSubscriptions(user_id: number): Promise<any>;

    getAllUsers(): Promise<any>;

    getUserRating(userID: number): Promise<any>;

    checkRatingExist(ratedId: number, raterId: number): Promise<any>;

    rateUser(ratedId: number, raterId: number, rating: number): Promise<any>;

    updateRating(ratedId: number, raterId: number, newRating: number): Promise<any>;
}