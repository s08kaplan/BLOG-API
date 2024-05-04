"use strict"

const Blog = require("../models/blog")
const User = require("../models/user")

module.exports = {
    list: async (req, res) => {
       
        // const data = await Blog.find()
        const data = await res.getModelList(Blog)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Blog),
            data
        })
    },

    create: async (req, res) => {
         req.body.userId = req.user._id
        const data = await Blog.create(req.body)
        
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
       
        const data = await Blog.findOne({ _id: req.params.blogId })
        data.countOfViews++
        await data.save()

       console.log("countOfViews",data.countOfViews);
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
      
        const data = await Blog.updateOne({ _id: req.params.blogId}, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            updatedData: await Blog.findOne({ _id: req.params.blogId })
        })
    },

    delete: async (req, res) => {
      
        const { deletedCount } = await Blog.deleteOne({ _id: req.params.blogId })

        res.status(deletedCount ? 204 : 404).send({
            error: !(!!deletedCount)
        })
    },
}