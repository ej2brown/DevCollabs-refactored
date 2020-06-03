export interface IDatabaseController {
  
    /**
     * Add a new user to the database.
     * @param {{first_name: string, last_name:string, password: string, email: string}} user
     * @return {Promise<{}>} A promise to the user.
     */
    addUser(user: any): Promise<any>; // TODO Let's make a user model class later
   
    /**
    * Get all groups data from db using userId.
    * @param {{integer}} userId
    * @return {array<[id:interger, name:string]>}
    */
    getGroupsNames(userId: number): Array<any>; // TODO let's make a model class out of what gets returned later
    
    getAllGroups(): any; // TODO Let's figure out the return type

    /**
     * @param {{integer}} groupId
     * @return {array<[group_id:interger, user_id:interger, data:string, created_at:time]>}
     */
    getGroupsPosts(groupId: number): Array<any>; // TODO Let's make a model class for return type later

    createPost(group_id: number, user_id: number, data: any, image_url: string): Promise<any>; // TODO Let's figure out what type data should be

    removeSubscription(user_id: number, group_id: number): Promise<any>;

    checkUserSubscription(user_id: number, group_id: number): boolean;

    /**
     * Add a subscription to db using localstorage session to get userId.
     * @param {{group_id: integer, user_id:interger}} subscription
     * @return {Promise<{}>} A promise to the user.
     */
    addSubscription(groupId: number, userId: number, is_admin: boolean): Promise<any>;

    createGroupAndSubscription(userId: number, groupName: string): any; // TODO Let's figure out return type later

    getSubscriptionsWithUser(user_id: number, group_id: number): Promise<any>;

    /**
     * Delete a group using groupId.
     * @param {{interger}} group_id
     * @return {Promise<{}>} A promise to the user.
     */
    deleteGroup(group_id: number): Promise<any>;

    getUserRating(userID: number): Promise<any>;

    checkRatingExist(ratedId: number, raterId: number): Promise<any>;

    rateUser(ratedId: number, raterId: number, rating: number): Promise<any>;

    updateRating(ratedId: number, raterId: number, newRating: number): Promise<any>;

    /**
     * Add a group to db.
     * @param {{string}} name
     * @return {Promise<{}>} A promise to the user.
     */
    addGroup(name: string): Promise<any>;

    // checkForUser(username: string): any; // TODO Let's figure out return type for this and make a model class out of it if necessary.

    // changeUserInfo(user: any): Promise<any>; // TODO Let's make a model class for user. Also is this return type correct?

    // /**
    //  * Get a subscription of a user using userId and groupId.
    //  * @param {{interger}} user_id
    //  * @param {{interger}} group_id
    //  * @return {Promise<{}>} A promise to the user.
    //  */

    // getUserPostsCount(user_id: number): Promise<any>;

    // getAllUserSubscriptions(user_id: number): Promise<any>;

    // getAllUsers(): Promise<any>;


}