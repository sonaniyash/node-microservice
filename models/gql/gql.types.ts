import { gql } from "apollo-server-express";
// import { gqlArtworkSchema } from "../mongoose/artworks.model";

export const typeDefs = gql`
  type Owner {
    firstName: String
    lastName: String
  }
  type Attribute {
    trait_type: String
    value: String
  }
  type Artwork {
    id: ID
    title: String
    description: String
    attributes: [Attribute]
    image: String
    imageUrl: String
    owner: Owner
    price: Int
    like: Int
  }

  type Query {
    hello: String
    getAllArtworks: [Artwork]
  }

  type Mutation {
    deleteNFTData(id: String): Artwork
  }

  type Mutation {
    insertNFTData: Artwork
  }
`;
