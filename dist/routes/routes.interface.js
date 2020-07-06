"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is an interface. Interfaces define a big picture commonalities among entities.
 * For example, we know all cats have fur (well, nearly all), and meows so we can have an interface:
 * export interface ICat {
 *  furPattern: string,
 *  meow(): void,
 *  meowSound(): string,
 *  scratch(): string
 * }
 *
 * here, furPattern is called a property. Its type is string. It's like a variable that holds string.
 * meow() is a public method. You can call it. All methods have return type. If a method doesn't return anything, we
 *  write void as return type.
 * meowSound() is also a public method. This one has string return type.
 *
 * Interfaces only define what Cats are expected to have/do. It's not an actual cat. For that, we will need a class that
 * "implement" the interface. This is basically saying, here's a class that knows how to actually do the things the
 * interface defines.
 *
 * export class Cat implements ICat {
 *  constructor() {
 *  }
 *  public get furPattern(): string { // This is how to implement a property. It can be accessed via cat.furPattern (with no brackets)
 *      return 'bald';
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
 * }
 *
 * Here, this Cat class defines a bald cat with a cute meow.
 * You can use this class by first "instantiating" an object (get it??? "object"-oriented programming!) from this class.
 *
 * const cat: ICat = new Cat(); // instantiate a cat object.
 * console.log(cat.furPattern);
 * cat.meow();
 * console.log(cat.meowSound());
 *
 * When you "instantiate" an object from a class, you are creating an "instance" of a class.
 * Think of a class as a cookie cutter. You can stamp out many same shaped cookies using the cookie cutter.
 * Likewise, you can create many "instances" of the same class.
 *
 * Let's make a happy cat family:
 * const cat1: ICat = new Cat();
 * const cat2: ICat = new Cat();
 * const cat3: ICat = new Cat();
 * cat1.meow();
 * cat2.meow();
 * cat3.meow();
 *
 * Have you also noticed how cat variables' types are ICat? This is because of the fundamental concept in OOP is inheritance.
 * When Cat class implements the interface ICat, it is considered to be both Cat and ICat. More explanation below!
 *
 *
 * Now, let's get into why we want an interface that define commonalities in cats.
 *
 * Let's say we have 3 types of cats.
 * HouseCat, Tiger, Lion
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
 * }
 *
 * Let's say we want to write a code that loops through all cat types and print out their meowSounds.
 * Without a common interface, you will have to write:
 *
 * const houseCat: HouseCat = new HouseCat();
 * console.log(houseCat.meowSound());
 *
 * const tiger: Tiger = new Tiger();
 * console.log(tiger.meowSound());
 *
 * const lion: Lion = new Lion();
 * console.log(lion.meowSound());
 *
 * Ugly!!! Right?
 *
 * Now, check this out:
 * const cats: Array<ICat> = [new HouseCat(), new Tiger(), new Lion()];
 * cats.forEach((cat: ICat) => {
 *  console.log(cat.meowSound());
 * });
 *
 * We are treating HouseCat, Tiger, Lion identically. We can do that because the ICat interface told us that all classes
 * that implement ICat has furPattern, meow(), meowSound() and scratch().
 *
 * This is why we use object oriented programming. It lets us re-use code. It lets us design software into chunks that are
 * interchangeable like cogs in a machine. We can add as many cat types as we want and we won't have to change the code
 * that goes through them and writes out their meow sounds!!
 *
 */ 
//# sourceMappingURL=routes.interface.js.map