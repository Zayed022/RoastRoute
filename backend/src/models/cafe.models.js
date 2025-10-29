import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    specialty: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Cafe = mongoose.model("Cafe", cafeSchema);
