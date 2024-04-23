 "use strict"
 
 const express = require("express")
 const app = express()

 const cors = require("cors")

 require("dotenv").config()

 const HOST = process.env.HOST
 const PORT = process.env.PORT

 require("express-async-errors")  //* async-errors to errorHandler

 //* MONGODB Connection
 const { dbConnection } = require("./src/configs/dbConnection")
 dbConnection()

 //* JSON for data interchange
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cors())


app.all("/", (req, res) => {
  res.send({
    error: false,
    message: `<h1 style={color:blueviolet; text-align: center; font-size: 2rem; margin: 1rem}>Welcome to Blog API</h1>`,
    user: req.user
  })
})

//* Routes:
app.use(require("./src/routes"))

 //*error handler
 require("./src/middlewares/errorHandler")

 app.listen(PORT, () => console.log(`Server is running on http://${process.env.HOST}:${PORT}`))

//  require("./src/helpers/sync")()  //! it clears the whole database
