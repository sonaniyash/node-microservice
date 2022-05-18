// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();

// --------------------- Models ------------------
import { ErrorType } from '../../../models/error/error-type.model';

// --------------------- Errors ------------------
import  { InvalideWorldError } from '../../services/hello-world/hello-world.errors';

// ------------------- Components ----------------
import { ErrorComponent } from '../../components/error/error.component';

// -------------------- Services -----------------
import { DummyDataService } from "../../services/dummy-data/dummy-data.service";
import { LoggerService } from "../../services/logger/logger.service";

// --------------------- Types -------------------

// -------------------- Globals ------------------
const dummyDataService: DummyDataService = DummyDataService.Instance;
const loggerService: LoggerService = LoggerService.Instance;

router.get("/insert/nfts", (req: express.Request, res: express.Response) => {
    try {
        dummyDataService.insertDummyNFTData();
        res.status(200);
        res.send("OK");
    } catch (err) {
        loggerService.logError(err);
        const error = new ErrorComponent('Unable to insert Data into mongo db', ErrorType.system);
        res.status(error.status);
        res.send(error);
    }
});

router.get("/insert/users", (req: express.Request, res: express.Response) => {
    try {
        dummyDataService.insertDummyUserData();
        res.status(200);
        res.send("OK");
    } catch (err) {
        loggerService.logError(err);
        const error = new ErrorComponent('Unable to insert Data into mongo db', ErrorType.system);
        res.status(error.status);
        res.send(error);
    }
});

export { router };
