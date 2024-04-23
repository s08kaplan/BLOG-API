"use strict"


const router = require("express").Router()

//* auth:
router.use("/auth", require("./auth"))

//* user:
router.use("/users", require("./user"))

//* category:
router.use("/categories", require("./category"))

//* comment:
router.use("/comments", require("./comment"))

//* blog:
router.use("/blogs", require("./blog"))

module.exports = router