"use strict"

const Blog = require("../models/blog")
const User = require("../models/user")

module.exports = {
    list: async (req, res) => {
        const isAdmin = req.user?.isAdmin 
        const isStaff = req.user?.isStaff 

        const customFilters = (isAdmin || isStaff) ? {} : { _id: req.user?.id }
        const data = await Blog.find({...customFilters, isDeleted: false })

        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {

        const data = await Blog.create(req.body)
    
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
         
        const blog = req.params.blogId
         
        //  const customFilters = (user.isAdmin || user.isStaff) ? {} : { _id: req.params.userId }
        const data = await Blog.findOne({ _id: req.params.blogId, isDeleted: false })

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