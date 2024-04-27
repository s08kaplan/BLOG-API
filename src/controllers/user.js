"use strict"

const { encryptFunc } = require("../helpers/validationHelpers")
const User = require("../models/user")

module.exports = {
    list: async (req, res) => {

        const data = await User.find({isDeleted: false})
 
        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {

        req.body.isAdmin = false //* if user sends isAdmin = true it would be accepted as false
        req.body.isStaff = false //* if user sends isStaff = true it would be accepted as false
        const data = await User.create(req.body)

        //! AUTO LOGIN:

        const tokenData = await Token.create({
            userId: data._id,
            token: encryptFunc(data._id + Date.now())
        })
        
        res.status(201).send({
            error: false,
            token: tokenData.token,
            data
        })
    },

    read: async (req, res) => {

        const customFilters = req.user?.isAdmin ? { _id: req.params.userId } : { _id: req.user._id,  } //! if the user is not Admin only his/her own record he/she could see

        const data = await User.findOne({ _id: req.params.userId, isDeleted: false })
       
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {


        if(!req.user?.isAdmin) { //! if the user is not Admin, he/she cannot change isActive and isAdmin 
            delete req.body.isActive
            delete req.body.isAdmin
        }
        const data = await User.updateOne({ _id: req.params.userId, isDeleted: false}, req.body, { runValidators: true })
        

        res.status(202).send({
            error: false,
            data,
            updatedData: await User.findOne({ _id: req.params.userId })
            
        })
    },

    delete: async (req, res) => {
        // const data = await User.deleteOne({ _id: req.params.userId})
        const data = await User.updateOne({ _id: req.params.userId}, { isDeleted: true })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !(!!data.deletedCount),
            data
        })
    }
}