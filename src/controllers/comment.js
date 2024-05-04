"use strict"

const Comment = require("../models/comment")
const Blog = require("../models/blog")

module.exports = {
    list: async (req, res) => {
      
        const data = await Comment.find({ isDeleted: false })

        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {
        
         req.body.userId = req.user._id
           const data = await Comment.create(req.body)
           const comments = await Comment.find({blogId: data.blogId})
           await Blog.updateOne({_id: data.blogId, userId: data.userId}, {comments})
           
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
      
        const data = await Comment.findOne({ _id: req.params.commentId, isDeleted: false })

        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
      
        const data = await Comment.updateOne({ _id: req.params.commentId, isDeleted: false }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            updatedData: await Comment.findOne({ _id: req.params.commentId })
        })
    },

    delete: async (req, res) => {
      
        const { deletedCount } = await Comment.updateOne({ _id: req.params.commentId }, { isDeleted: true })

        res.status(deletedCount ? 204 : 404).send({
            error: !(!!deletedCount)
        })
    },
}