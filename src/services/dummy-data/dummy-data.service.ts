// -------------------- Packages -----------------

// --------------------- Models ------------------

// --------------------- Errors ------------------
// import { CustomError } from './DummyData.errors';

// ------------------- Components ----------------

// -------------------- Services -----------------
//import { ImportedService } from './imported.service';
import { prisma } from "@prisma/client";
import { collectFields } from "graphql/execution/execute";
import { DatabaseService } from "../../services/database/database.service";

// --------------------- Types -------------------

export class DummyDataService {
  private static _instance: DummyDataService;
  private databaseService = DatabaseService.Instance;
  //private importedService: ImportedService;

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    //this.importedService = ImportedService.Instance;
  }

  public async insertDummyNFTData(): Promise<any> {
    const prisma = this.databaseService.connection; // This gets you a PrismaClient connected to the database

    /*  return await prisma.artwork.create({
      data:       {
        attributes: {
          create: {
            traitType: "Monkey",
            value: "New Gen 2",
          },
        },
        description: "New Generation Nft",
        image: "ipfs://QmZ5bs4BKfqs6792wWeks5oJfTorTZpBjdSmZAUbT8SqPF",
        imageUrl:
          "https://gateway.pinata.cloud/ipfs/QmZ5bs4BKfqs6792wWeks5oJfTorTZpBjdSmZAUbT8SqPF",
        title: "Guilty Monkey #2 -Gen 06",
        owner: {
          create: {
            firstName: "Yash",
            lastName: "Sonani",
          },
        },
        price: 30000,
        like: 400,
      },
    }); */
  }

  public async insertDummyUserData(): Promise<void> {
    this.databaseService.connection; // This gets you a PrismaClient connected to the database
    //TODO Generate dummy data for a user and add him to the database
  }

  public async fetchNFTData(): Promise<any> {
    const prisma = this.databaseService.connection; // This gets you a PrismaClient connected to the database
    try {
      const nftData = await prisma.artwork.findMany({
        include: { attributes: true, owner: true },
      });
      return nftData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async deleteNFTData(args: any): Promise<any> {
    const prisma = this.databaseService.connection; // This gets you a PrismaClient connected to the database
    console.log(args.id)
    try {
      const nftData = await prisma.artwork.delete({
        where: { id: args.id },
      });
      return nftData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
