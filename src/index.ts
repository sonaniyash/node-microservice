// -------------------- Packages -----------------
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import * as tq from "type-graphql";
// import { resolvers } from "@generated/type-graphql";

// --------------------- Models ------------------
import { ErrorType } from "../models/error/error-type.model";
import { resolvers } from "../models/gql/gql.resolvers";
import { typeDefs } from "../models/gql/gql.types";

// ------------------- Components ----------------
import { ErrorComponent } from "./components/error/error.component";

// -------------------- Services -----------------
import { LoggerService } from "./services/logger/logger.service";
import { DatabaseService } from "./services/database/database.service";

// --------------------- Routes ------------------
import * as routes from "./routes/index";
import { exit } from "process";

dotenv.config();
const loggerService: LoggerService = LoggerService.Instance;
const databaseService: DatabaseService = DatabaseService.Instance;

const app = express();
const isProduction: boolean = process.env.NODE_ENV === "production";
const port: string = process.env.PORT ? process.env.PORT : "8080";

const allowedOrigins: string[] = JSON.parse(process.env.ALLOWED_ORIGINS);

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin: string, callback: any) => {
    if (allowedOrigins.indexOf(origin) >= 0 || allowedOrigins[0] === "*") {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

const main = async () => {
  databaseService
    .initDatabaseConnection()
    .then(() => {
      console.log("MongoDB connected via Prisma.");
    })
    .catch((err) => {
      console.error(err);
      exit(1);
    });

  // const schema = await tq.buildSchema({
  //   resolvers,
  // });

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ prisma: DatabaseService.Instance.connection }),
  });

  app.use(bodyParser.json());

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(cors(corsOptions));

  app.use("/", routes.router);

  app.use(express.static(__dirname + "/public"));

  // Start Apollo Server
  apolloServer
    .start()
    .then(() => {
      apolloServer.applyMiddleware({ app, path: "/api/nfts/graphql" });
      // start the Express server
      app.use((req: any, res: any, next: any) => {
        console.log("req", req);

        const err = new ErrorComponent(
          "Route not found: " + req.path,
          ErrorType.no_data
        );
        next(err);
      });
      app.listen(port, () => {
        loggerService.logInfo(
          `SUCCESS: ${process.env.TITLE} running at http://localhost:${port}`
        );
      });
    })
    .catch((err) => {
      console.error(err);
      exit(1);
    });
};

main();
