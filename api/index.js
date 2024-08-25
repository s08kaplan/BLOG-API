 "use strict"
 
 const express = require("express")
 const app = express()
 const path = require("path")
 const cors = require("cors")

 require("dotenv").config()

 const HOST = process.env.HOST || "127.0.0.1"
 const PORT = process.env.PORT || 8000 

 require("express-async-errors")  //* async-errors to errorHandler

 //* MONGODB Connection
 const { dbConnection } = require("./src/configs/dbConnection")
 dbConnection()

 //* JSON for data interchange
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cors())

 // Call static uploadFile:
app.use('/upload', express.static('./upload'))
app.use(express.static(path.join(__dirname, "public")))

// Run Logger:
// app.use(require('./src/middlewares/logger'))

 // Check Authentication:
app.use(require('./src/middlewares/authentication'))
app.use(require("./src/middlewares/queryHandler"))

app.all('/api', (req, res) => {
  res.send({
      error: false,
      message: 'Welcome to Blog API',
      documents: {
          swagger: '/api/documents/swagger',
          redoc: '/api/documents/redoc',
          json: '/api/documents/json',
      },
      user: req.user
  })
})

//* Routes:
app.use("/api",require("./src/routes"))

// !deploy-----------------------------------------
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./public", "index.html"))
})

app.use("*", (req, res) => {
  res.status(404).send({message: "Not Found"})
})

//! -----------------------------------------------


 //*error handler
 app.use(require("./src/middlewares/errorHandler"))

 app.listen(PORT, () => console.log(`Server is running on http://${process.env.HOST}:${PORT}`))

//  require("./src/helpers/sync")()  //! it clears the whole database
