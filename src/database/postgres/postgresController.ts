const bcrypt = require("bcrypt");

import { IDatabaseController } from '../databaseController.interface';

export class postgresController implements IDatabaseController {
  private m_db: any;

  constructor(db: any) {
    if (db === null || db === void 0) {
      throw new Error('Cannot access db'); 
  }
    this.m_db = db;
  }

  public get db(): any {
    return this.m_db;
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
        [username, email, bcrypt.hashSync(password, 12), avatar_image] //removed bcrypt bcrypt.hashSync(password, 12)
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

  createPost(groupId: number, userId: number, data: any, image_url: string) {
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

  removeSubscription(userId: number, groupId: number) {
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

  addSubscription(groupId: number, userId: number, is_admin: boolean) {
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

  createGroupAndSubscription(userId: number, groupName: string) {
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

  getSubscriptionsWithUser(userId: number, groupId: number) {
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

  deleteGroup(groupId: number) {
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

  getUserRating(userId: number) {
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

  checkRatingExist(ratedId: number, raterId: number) {
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

  rateUser(ratedId: number, raterId: number, rating: number) {
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

  updateRating(ratedId: number, raterId: number, newRating: number) {
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
  }

  addGroup(name: string) {
    return this.db
      .query(
        `
      INSERT INTO groups
      (name)
      VALUES
      ($1)
      RETURNING *;
      `,
        [name]
      )
      .then(res => res.rows[0])
      .catch(e => null)
  }
}
/**
 * Let's talk about another fundamental pillar of OOP: Encapsulation.
 * Encapsulation is all about controlling who can access and change important data stored in your class.
 * This is essential for couple of reasons: 1) your class may be used by someone you don't trust. data within
 * your class may be secret. So you want to make sure noone can see it. 2) you want to minimize room for error
 * for whoever is using your class by preventing someone from modifying some data in your class in ways that
 * is incorrect.
 *
 * Three key words to remember for encapsulation: public, protected, private. Let's explore what they mean.
 *
 * export class HouseCat {
 *  // These are private member variables. Can only be accessed/written within this class.
 *  private m_furPattern: string;
 *  private m_meowSound: string;
 *  // This is a protected member variable. More on this later.
 *  protected m_scratchSize: string;
 *  // This is a public variable. Anyone can read/write this by doing housecat.currentWalkingSpeed. This is rarely used. More on this later.
 *  public currentWalkingSpeed: string;
 *  public m_lookingAt: IHuman;
 *
 *  // This is a constructor. It runs when you call new HouseCat()
 *  constructor() {
 *  }
 *
 *  // This is a public property. You can call it via housecat.meowSound
 *  public get meowSound(): string {
 *      return this.m_meowSound;
 *  }
 *
 *  // This is a public property. You can call it via housecat.lookingAt
 *  public get lookingAt(): IHuman {
 *      return this.m_lookingAt;
 *  }
 *  // This is a public property. You can set it via housecat.lookingAt = anotherHuman
 *  public set lookingAt(human: IHuman) {
 *      stopScratchingCurrent(); // You can do cool things like a side-effect of setting a property by calling some methods here.
 *      this.m_lookingAt = human;
 *  }
 *
 *  // This is a protected property
 *  protected set meowSound(sound: string) {
 *      this.m_meowSound = sound;
 *  }
 *
 *  // This is a provate property. Not used all that much, but you can do neat things with them. More on that later.
 *  private get furPattern(): string {
 *      return this.m_furPattern;
 *  }
 *  private set furPattern(fur: string) {
 *      this.m_furPattern = fur;
 *  }
 *
 *  // This is a public method. Anyone can call this.
 *  public scratch() {
 *      this.makeScratchOnSomeone();
 *  }
 *
 *  // This is a protected method.
 *  protected setScratchSize(size: string) {
 *      this.m_scratchSize = size;
 *  }
 *
 *  // This ia a private method. Can only be called within this class.
 *  private makeScratchOnSomeone(): void {
 *      this.m_lookingAt.makeScratch(this.m_scratchSize);
 *
 *      // Code waits for 2 seconds after making scratch to do the following
 *      setTimeout(() => {
 *      console.log('scratched' + this.m_lookingAt.name);
 *      this.m_lookingAt.recalculateHealth();
 *      }, 2000);
 *  }
 *
 *  private stopScratchingCurrent(): void {
 *      // something fancy to stop scratching happen
 *  }
 *
 * }
 *
 * public member variables, properties and methods can be accessed and called by anyone like this:
 * const houseCat: HouseCat = new HouseCat();
 * houseCat.currentWalkingSpeed = 10;
 * console.log(houseCat.meowSound);
 * houseCat.lookingAt = new Human();
 * houseCat.scratch();
 *
 * These are what you make available to outside world so that someone can make use of your helpful class.
 *
 * A word on public member variables: This is highly advised against. The reason is that we cannot control who
 * writes to the public member variables. Usually, classes hold important state information in member variables
 * and classes won't know if member variables are changed!! So the class can get into a bad state.
 *
 * To demonstrate, consider the following scenario:
 * const houseCat: HouseCat = new HouseCat();
 * houseCat.m_lookingAt = new Human();
 * houseCat.scratch();
 * houseCat.m_lookingAt = new Human();
 *
 * We make the housecat look at a human, scratch him/her. And then make it look at another human.
 * But we directly set its public member variable to make him look at these humans.
 *
 * See what's going on in scratch() method and makeScratchOnSomeone().
 * makeScratchOnSomeone uses m_lookingAt member variables to do the following:
 * 1) makeScratch on m_lookingAt
 * 2) after waiting for 2 seconds, output 'scratched human's name'
 * 3) recalculate human's (m_lookingAt) health after scratching
 *
 * Do you see if m_lookingAt is swapped out from below our feet while the housecat object is waiting for 2 seconds,
 * we are going to call recalculateHealth() on the wrong human and not the original human that was scratched?
 *
 * This is exactly what's happening with the above scenario. This is why encapsulation is important.
 *
 * Instead, we should make m_lookingAt private. And use the public properties get lookingAt() and set lookingAt()
 * to get and set who HouseCat object is looking at.
 *
 * Look at the public set lookingAt(human: IHuman). It sets m_lookingAt AND it goes and cancels the current scratch. This way
 * we have control over the state of the HouseCat object and we can prevent the object from getting into a bad state.
 *
 * So, safe and OOP way of re-writing the above scenario would be:
 * const houseCat: HouseCat = new HouseCat();
 * houseCat.lookingAt = new Human();
 * houseCat.scratch();
 * houseCat.lookingAt = new Human();
 *
 *
 * Moving on to public methods: public methods, like public member variables and public properties can be called
 * by anyone. These are what you choose to make available to the outside world.
 *
 * Private methods can be called only from within the class. These are very useful to share code within the class.
 * If you find that there are common code within the class, you can factor it out to a private "helper" method.
 *
 * This will give you an error:
 * const houseCat: HouseCat = new HouseCat();
 * houseCat.makeScratchSomeone(); // can't call private method from outside of the class!
 *
 *
 * This leaves us with protected member variables, properties, methods.
 *
 * Remember that classes can have inheritance? They can extend one another to functionalities?
 * Protected members, properties, methods are accessible to sub classes and their offsprings.
 *
 * Remember the protected variable m_scratchSize, protected method setScratchSize, protected property meowSound?
 * They can be used from the sub-class of the HouseCat. A friendly MaineCoon!
 *
 * export class MaineCoon extends HouseCat {
 *  // This is a constructor. It runs when you call new MaineCoon()
 *  constructor() {
 *    super();
 *  }
 *
 *  public beFriendly(): void {
 *    this.m_scratchSize = 'none';
 *    this.setScratchSize('none');
 *    this.meowSound = 'friendly';
 *
 *    // Also can't call superclass's private members!
 *    this.makeScratchOnSomeone(); // Not allowed!
   *  this.m_furPattern = 'beautiful'; // Not allowed!!
 *  }
 *
 * }
 *
 * Keep in mind that the protected members cannot be accessed from outside of the sub-class (MaineCoon) that inherit them from
 * superclass (HouseCat).
 *
 * So, we cannot do this:
 * const houseCat: HouseCat = new HouseCat();
 * houseCat.m_scratchSize = 'big';
 * houseCat.setScratchSize('big');
 * houseCat.meowSound = 'normal';
 *
 * We cannot do this either:
 * const maineCoon: MaineCoon = new MaineCoon();
 * maineCoon.m_scratchSize = 'big';
 * maineCoon.setScratchSize('big');
 * maineCoon.meowSound = 'normal';
 *
 * They can be called only from within the class that define them (HouseCat) and the classes the inherit it (MaineCoon). They do get passed down to offspring
 * classes. So if FatMaineCoon class extends MaineCoon, FatMaineCoon still has access to all of the protected members in HouseCat.
 *
 * See MaineCoon.beFriendly(). This is how protected members defined in HouseCat are accessed in subclasses!
 *
 *
 * Lastly, let's talk about overriding methods. This is another one of the fundamental OOP mechanism that we get from inheritance.
 * The proper term is to "Override" super class's methods in sub class.
 *
 * Let's add a method in MaineCoon class:
 *
 * export class MaineCoon extends HouseCat {
 *  // This is a constructor. It runs when you call new HouseCat()
 *  constructor() {
 *    super();
 *  }
 *
 *  public beFriendly(): void {
 *    this.m_scratchSize = 'none';
 *    this.setScratchSize('none');
 *    this.meowSound = 'friendly';
 *  }
 *
 *  public scratch() {
 *    console.log('Im MaineCoon and Im friendly. I do not scratch.);
 *  }
 *
 * }
 *
 * Take a look at MaineCoon's scratch() method. Do you remember HouseCat's scratch() method?
 * MaineCoon class inherits HouseCat's scratch() method. So what happens when MaineCoon also declared scratch() method of its own?
 *
 * MaineCoon.scratch() method then 'overrides' the superclass's scratch() method, meaning if someone calls MaineCoon's scratch method, it will be
 * calling MaineCoon class's scratch() and not HouseCat's scratch().
 *
 * This is really really useful and is one of the defining strength of OOP.
 *
 * Imagine we have some complex code that runs through HouseCat array and calls scratch() method on them. Remember how MaineCoon IS also considered HouseCat?
 * So we can use the same bit of code that is written only once whose behaviour changes based on which type of HouseCat is used in it!
 *
 * Check this out:
 * const cats: Array<HouseCat> = [new HouseCat(), new MaineCoon(), new HouseCat(), new MaineCoon()];
 * cats.forEach((cat: HouseCat) => {
 *    cat.scratch();
 * });
 *
 * In this loop, when cat is HouseCat object, it calls HouseCat scratch() method. When cat is MaineCoon object, it calls MaineCoon scratch() method.
 *
 * The mechanism that allows us to have a collection of superclass who are comprised of various subclasses whose methods are called depending on the
 * subclass type is called "Polymorphism". Now we know the final and perhaps the most important fundemantal mechanism of OOP. "Polymorphsm".
 *
 * Polymorphism allows us to reduce duplicating code and share a set of behaviour that can be used and modified based which class is being used in the code!
 *
 */

// Implement IDatabaseController here.