// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();

// --------------------- Models ------------------
import { ErrorType } from "../../../models/error/error-type.model";
// --------------------- Errors ------------------
import { InvalideWorldError } from "../../services/hello-world/hello-world.errors";

// ------------------- Components ----------------
import { ErrorComponent } from "../../components/error/error.component";

// -------------------- Services -----------------
import { HelloWorldService } from "../../services/hello-world/hello-world.service";
import { LoggerService } from "../../services/logger/logger.service";

// --------------------- Types -------------------

// -------------------- Globals ------------------
const helloWorldService: HelloWorldService = HelloWorldService.Instance;
const loggerService: LoggerService = LoggerService.Instance;

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const result = await helloWorldService.getHelloWorld();
    res.status(200);
    res.send(result);
  } catch (err) {
    if (err instanceof InvalideWorldError) {
      loggerService.logError(err);
      const error = new ErrorComponent(
        "This world is so crazy its invalid",
        ErrorType.invalid
      );
      res.status(error.status);
      res.send(error);
    }
  }
});

export { router };
