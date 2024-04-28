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

    author: {
     type: String,
     trim: true,
     required: true,
    },
   
    comments: [],

    totalNumberOfComments: {
        type: Number,
        default: function() { return this.comments.length },
        transform: function() { return this.comments.length}
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    image: [],

    isPublish: {
        type: Boolean,
        default: true
    },

    likes: [],

    totalNumberOfLikes: {
        type: Number,
        default: function() { return this.likes.length},
        transform: function() { return this.likes.length}
    },

    views: [{
        type: Schema.Types.ObjectId,
        ref: "View",
        index: true
    }],

    countOfViews: {
        type: Number,
        default: 0
    },

    totalLikes: {
        type: Number,
        default: 0
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    collection: "blogs",
    timestamps: true
})



module.exports = model("Blog", BlogSchema)