// -------------------- Packages -----------------
import { PrismaClient } from "@prisma/client";

// --------------------- Models ------------------
//import {  } from './database.errors';

// ------------------- Components ----------------
import { PrismaClientInitializationError } from "@prisma/client/runtime";

// -------------------- Services -----------------

/**
 * A Service that should be used to get and inerst data into and from the database.
 * This service is an abstraction for the mysql connection to the database.
 * Use it for everything you have to do on the database. It takes care of some important convertions and structural conventions.
 *
 * @author: Kilian Mehringer
 */
export class DatabaseService {
  private static _instance: DatabaseService;
  public connection: PrismaClient;

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  /**
   * Private constructor. Used to generate a singelton pattern for this service.
   * It also starts the default connection to the default database.
   *
   * @constructor
   * @author: Kilian Mehringer
   */
  private constructor() {
  }

  public initDatabaseConnection(): Promise<void> {
    const prisma = new PrismaClient();
    return new Promise<void>((resolve, reject) => {
      prisma
        .$connect()
        .then(() => {
          resolve();
        })
        .catch((err: PrismaClientInitializationError) => {
          reject(err);
        });

      this.connection = prisma;
    });
  }
}
