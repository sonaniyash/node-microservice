import mongoose from "mongoose";

const ArtworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attributes: [
    {
      trait_type: String,
      value: String,
    },
  ],
  owner: {
    firstName: String,
    lastName: String,
  },
  image: String,
  imageUrl: String,
  price: Number,
  like: Number,
});

export const gqlArtworkSchema = `
    {
        id: ID
        title: String
        description: String

    }
    
`;

export const Artwork = mongoose.model("artwork", ArtworkSchema);
