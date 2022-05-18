// -------------------- Packages -----------------

// --------------------- Models ------------------

// ------------------- Errors --------------------
import { InvalideWorldError } from "./hello-world.errors";

// ------------------- Components ----------------

// -------------------- Services -----------------
import { DatabaseService } from "../../services/database/database.service";

// -------------------- Types --------------------

export class HelloWorldService {
  private static _instance: HelloWorldService;
  private error = false;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}

  public async getHelloWorld(): Promise<String> {
    try {
      return "Hello World!";
    } catch (error) {
      throw new InvalideWorldError("Im a custom error");
    }
  }
}
