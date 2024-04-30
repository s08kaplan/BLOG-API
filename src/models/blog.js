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
    
    title: {
        type: String,
        trim: true,
        required: true
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

    

    content: {
        type: String,
        trim: true,
        required: true
    },

    image: [],

    likes: {
        type: Array,
        default: function(){ return likes},
        transform: function() {
            if(likes.includes(this.userId)){
           return likes.filter(like => like !== this.userId)
        }else {
          return  likes.push(this.userId)
        }
        }
    },

    totalLikes: {
        type: Number,
        default: function() { return this.likes.length},
        transform: function() { return this.likes.length}
    },

    countOfViews: {
        type: Number,
        default: 0,
        transform: function(userId){
            if(userId !== this.userId) { return countOfViews++}
            else { return countOfViews}
        }
    },


    isPublish: {
        type: Boolean,
        default: true
    }
  
   
}, {
    collection: "blogs",
    timestamps: true
})



module.exports = model("Blog", BlogSchema)