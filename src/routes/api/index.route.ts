// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();
// --------------------- Models ------------------

// ------------------- Components ----------------

// -------------------- Services -----------------

// --------------------- Routes ------------------
import * as helloworldRoute from "./helloworld.route";
import * as dummyRoute from "./dummy.route";

router.use("/helloworld", helloworldRoute.router);
router.use("/dummy", dummyRoute.router);

router.get('/healthy', (req: express.Request, res: express.Response) => {
    res.status(200);
    res.send('OK');
});

router.get('/', (req: express.Request, res: express.Response) => {
    res.status(200);
    res.send('OK');
});
export {router};
