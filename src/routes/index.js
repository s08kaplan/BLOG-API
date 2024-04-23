"use strict"


const router = require("express").Router()

//* auth:
router.use("/auth", require("./auth"))

//* user:
router.use("/users", require("./user"))

//* category:
router.use("/categories", require("./category"))

module.exports = router