// -------------------- Packages -----------------

// --------------------- Models ------------------

// -------------------- Services -----------------
import { DummyDataService } from "../../src/services/dummy-data/dummy-data.service";
// -------------------- Globals ------------------
const dummyDataService: DummyDataService = DummyDataService.Instance;
//import { Artwork } from '../mongoose/artworks.model';

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAllArtworks: async () => {
      return await dummyDataService.fetchNFTData();
    },
  },
  Mutation: {
    deleteNFTData: async (parent: any, args: any) => {
      return await dummyDataService.deleteNFTData(args);
    },
    insertNFTData: async () => {
      return await dummyDataService.insertDummyNFTData();
    },
  },
};
