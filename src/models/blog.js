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
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: true
    },

    image: [],

    isPublish: {
        type: Boolean,
        default: true
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Like",
        index: true
    }],

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

BlogSchema.pre("save",function(next){
    if(!this.likes.includes(this.userId)){
        this.likes.push(this.userId)
        this.likes.length
        this.save()
    }
    if(!this.views.includes(this.userId)){
        this.views.push(this.userId)
        this.views.length
        this.save()
    }
next()
})


module.exports = model("Blog", BlogSchema)