"use strict"

const Blog = require("../models/blog")

module.exports = {
    likeStatus: async (req, res) => {
        const userId = req.body.userId = req.user._id
         const blogId = req.body.userId = req.params.blogId

         const blog = await Blog.findOne({ blogId })
        if(blog.likes.includes(userId)){
             new Set(blog.likes).delete(userId)
        }else{
             blog.likes.push(userId)
        }
        
        blog.save()

           const data =  await Blog.find()

           res.status(200).send({
             error: false,
             like: data.likes
         })
            
 },

    
}




