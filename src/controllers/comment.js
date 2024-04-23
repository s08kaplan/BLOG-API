"use strict"

const Comment = require("../models/comment")

module.exports = {
    list: async (req, res) => {
      
        const data = await Comment.find()

        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {
     
           const data = await Comment.create(req.body)
    
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
      
        const data = await Comment.findOne({ _id: req.params.commentId })

        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
      
        const data = await Comment.updateOne({ _id: req.params.commentId}, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            updatedData: await Comment.findOne({ _id: req.params.commentId })
        })
    },

    delete: async (req, res) => {
      
        const { deletedCount } = await Comment.deleteOne({ _id: req.params.commentId })

        res.status(deletedCount ? 204 : 404).send({
            error: !(!!deletedCount)
        })
    },
}