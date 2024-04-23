"use strict"

const Category = require("../models/category")

module.exports = {
    list: async (req, res) => {
      
        const data = await Category.find()

        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {
       
        const data = await Category.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
      
        const data = await Category.findOne({ _id: req.params.categoryId })

        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
      
        const data = await Category.updateOne({ _id: req.params.categoryId}, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            updatedData: await Category.findOne({ _id: req.params.categoryId })
        })
    },

    delete: async (req, res) => {
      
        const { deletedCount } = await Category.deleteOne({ _id: req.params.categoryId })

        res.status(deletedCount ? 204 : 404).send({
            error: !(!!deletedCount)
        })
    },
}