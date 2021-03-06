import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        rating: { type: Number, min: 1, max: 5, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        content: { type: String, required: true }
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
//Weird export/import behaviour
