"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const CategorySchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    categoryName: {
        type: String,
        trim: true,
        required: true,
        index: true,
        set: (name) => name.toUpperCase()
    }
}, {
    collection: "categories",
    timestamps: true
})

module.exports = model("Category", CategorySchema)