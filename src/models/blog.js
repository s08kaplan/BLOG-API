"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const BlogSchema = new Schema({

  
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

  
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true
    },

   
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
        index: true
    },

    title: {
        type: String,
        trim: true,
        required: true,
        index: true,
        set: (email) => emailValidate(email) 
    },

    password: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        set: (password) => passwordEncrypt(password)
    },

    biography: {
        type: String,
        trim: true
    },

    image: [],

    isActive: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    collection: "users",
    timestamps: true
})

module.exports = model("Blog", BlogSchema)