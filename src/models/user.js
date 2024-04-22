"use strict"

const { mongoose: { Schema, model }} = require("../config/dbConnection")
const { emailValidate, passwordEncrypt } = require("../helpers/validationHelpers")

const UserSchema = new Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        index: true,
        set: (email) => emailValidate(email) 
    },

    password: {
        type: String,
        trim: true,
        required: true,
        index: true,
        set: (password) => passwordEncrypt(password)
    },

    biography: {
        type: String,
        trim: true
    },

    image: [],

    isActive: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    collection: "users",
    timestamps: true
})

module.exports = model("User", UserSchema)