"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractExpressRoutes = void 0;
const express = require("express");
class AbstractExpressRoutes {
    constructor(baseEndpoint) {
        if (baseEndpoint === null || baseEndpoint === void 0) {
            throw new Error("Cannot build routes with null or undefined base endpoint string");
        }
        this.m_baseEndpoint = baseEndpoint;
        this.m_router = express.Router();
    }
    get baseEndpoint() {
        return this.m_baseEndpoint;
    }
    get router() {
        return this.m_router;
    }
}
exports.AbstractExpressRoutes = AbstractExpressRoutes;
/**
 * This is an Abstract class. Abstract classes let you factor out common behaviours from multiple classes and share
 * the code among them. But unlike a regular class, Abstract classes cannot be instanciated - you can't create an instance
 * from it! This is useful if you want to share code using it but it's missing some critical details to make it work.
 *
 * Will elaborate using examples.
 *
 * Remember 3 types of cats from the interface? (see routes.interface.ts)
 * We've added a scratch method that will scratch a human! HouseCat can make small scratch,
 * Tiger can make medium scratch, Lion can make a large scratch.
 *
 * export class HouseCat implements ICat {
 *  constructor() {
 *  }
 *  public get furPattern(): string {
 *      return 'Solid-Brown';
 *  }
 *  public meow(): void {
 *      console.log('Cute meow');
 *  }
 *  public meowSound(): string {
 *      return 'Cute meow';
 *  }
 *  public scratch(): string {
 *      return 'Ouch';
 *  }
 *  public scratchTarget(someone: IHuman): void {
 *      someone.makeScratch('small');
 *  }
 * }
 *
 * export class Tiger implements ICat {
 *  constructor() {
 *  }
 *  public get furPattern(): string {
 *      return 'Striped-Orange';
 *  }
 *  public meow(): void {
 *      console.log('Scary meow');
 *  }
 *  public meowSound(): string {
 *      return 'Scary meow';
 *  }
 *  public scratch(): string {
 *      return 'Deadly';
 *  }
 *  public scratchTarget(someone: IHuman): void {
 *      someone.makeScratch('medium');
 *  }
 * }
 *
 * export class Lion implements ICat {
 *  constructor() {
 *  }
 *  public get furPattern(): string {
 *      return 'Solid-Blonde';
 *  }
 *  public meow(): void {
 *      console.log('Scary meow');
 *  }
 *  public meowSound(): string {
 *      return 'Scary meow';
 *  }
 *  public scratch(): string {
 *      return 'Deadly';
 *  }
 *  public scratchTarget(someone: IHuman): void {
 *      someone.makeScratch('large');
 *  }
 * }
 *
 * Notice how both Tiger and Lion have "Scary meow" meowSound and "Deadly" scratch methods.
 * Gee, it would great if we can share the common code.....
 *
 * Turns out, you can! Let's what in common with these "BigCats"
 *
 * export abstract class BigCat implements ICat {
 *  public meow(): void {
 *     console.log('Scary meow');
 *  }
 *  public meowSound(): string {
 *     return 'Scary meow';
 *  }
 *  public scratch(): string {
 *     return 'Deadly';
 *  }
 *
 *  public abstract get furPattern(): string;
 *  public abstract scratchTarget(someone: IHuman): void;
 * }
 *
 * This Abstract class called "BigCat" implements the ICat interface and factors out the common code between
 * Tiger and Lion like meow(), meowSound(), scratch().
 *
 * Pay close attention to "abstract get furPattern()" and "abstract scratchTarget(someone: IHuman)".
 * These are the "critical details" that are missing from BigCat that you need in order for it to be complete.
 * So BigCat cannot exist as an object: it doesn't know what 'furPattern' it has and how to 'scartchTarget'.
 *
 * You know who has these missing pieces? Lion and Tiger classes!
 *
 * So, What do Tiger and Lion classes look like now?
 *
 * export class Tiger extends BigCat {
 *  constructor() {
 *     super(); // This instantiates the BigCat 'super class' of this Tiger 'sub class'
 *  }
 *  public get furPattern(): string {
 *     return 'Striped-Orange';
 *  }
 *  public scratchTarget(someone: IHuman): void {
 *     someone.makeScratch('medium');
 *  }
 * }
 *
 * export class Lion extends BigCat {
 *  constructor() {
 *     super(); // This instantiates the BigCat 'super class' of this Lion 'sub class'
 *  }
 *  public get furPattern(): string {
 *     return 'Solid-Blonde';
 *  }
 *  public scratchTarget(someone: IHuman): void {
 *     someone.makeScratch('large');
 *  }
 * }
 *
 * Pay close attention to Tiger extends BigCat, Lion extends BigCat.
 * Tiger and Lion classes "extend" BigCat class. "Extension" is a fundamental OOP concept. You take an existing class
 * and "extend" it to add functionalities to it. In this case, we are extending BigCat abstract class to add "furPattern"
 * and "scratchTarget" functionalities to it.
 *
 * The terminology to remember is: BigCat class is a "super class" of Lion class. Lion class is a "sub class" of BigCat class
 * when Lion class extends BigCat.
 *
 * The beauty is both Tiger and Lion classes still have meow(), meowSound(), scratch() methods that you can call!
 *
 * Check this out:
 *
 * const tiger: ICat = new Tiger();
 * const lion: ICat = new Lion();
 * console.log(tiger.meowSound()); // meowSound() comes from BigCat class.
 * console.log(lion.meowSound()); // meowSound() comes from BigCat class.
 * console.log(tiger.furPattern); // furPattern comes from Tiger class
 * console.log(lion.furPattern); // furPattern comes from Lion class
 *
 * YAY! Software Engineering! We just got rid of ugly code duplicates!
 *
 * Notice how tiger and lion objects are still of type ICat? That's because of the beauty of OOP inheritance.
 * This is because Tiger IS a BigCat. BigCat IS an ICat. So, Any tiger is considered as Tiger, BigCat and ICat.
 * This means that any of the following code is correct:
 * const tiger1: Tiger = new Tiger();
 * const tiger2: BigCat = new Tiger();
 * const tiger3: ICat = new Tiger();
 *
 * tiger3 can be mixed in with any ICat instances like HouseCat and treated as one for all intents and purposes.
 * But tiger2 cannot be mixed in with other ICat because we've identified it as more restrictive BigCat.
 * tiger3 cannot be mixed in with other ICat or BigCat because we've identified it as more restrictive Tiger.
 *
 * You can do:
 * const cats: Array<ICat> = [new HouseCat(), new Tiger(), new Lion()];
 * const bigCats: Array<BigCat> = [new Tiger(), new Lion()];
 * const tigers: Array<Tiger> = [new Tiger()];
 *
 * You cannot do:
 * const tigers: Array<Tiger> = [new Tiger(), new Lion()];
 *
 * This is because both while Tiger and Lion are BigCats and ICat, Lion is not a Tiger based on the way their inheritance.
 *
 *
 * Keep in mind that this will throw error because BigCat is an abstract class!
 * const bigCat: ICat = new BigCat();
 *
 *
 * Lastly, you can extend any class, not just abstract class.
 * Let's say we want to differentiate Tiger species:
 * BengalTiger, SiberianTiger
 *
 * export class BengalTiger extends Tiger {
 *  constructor() {
 *      super();
 *  }
 *  public meow(): void {
 *      console.log('Bengal meow');
 *  }
 * }
 *
 * export class SiberianTiger extends Tiger {
 *  constructor() {
 *      super();
 *  }
 *  public meow(): void {
 *      console.log('Siberian meow');
 *  }
 * }
 *
 * Here, BengalTiger and SiberianTiger classes extend Tiger class and "override" meow() method.
 * For all intents and purposes both BengalTiger and SiberianTiger are considered as Tiger, BigCat and ICat and has
 * all of the code, method that Tiger class has.
 *
 * You can do:
 * const tigers: Array<Tiger> = [new Tiger(), new BengalTiger(), new SiberianTiger()]
 * const tigers: Array<BigCat> = [new Tiger(), new BengalTiger(), new SiberianTiger(), new Lion()]
 * const tigers: Array<ICat> = [new Tiger(), new BengalTiger(), new SiberianTiger(), new Lion(), new HouseCat()]
 *
 */
//# sourceMappingURL=expressRoutes.js.map