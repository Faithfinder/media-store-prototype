import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

export const Item = require("./item");
export const ItemCategory = require("./itemCategory");
export const Bundle = require("./bundle");
//Weird export/import behaviour