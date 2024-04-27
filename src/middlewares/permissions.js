"use strict"


module.exports = {
    isLogin: (req, res, next) => {
      const { user, isActive } = getUserInfo(req)
      if(user && isActive) next()
      else throw new Error("You must log in to continue")
    }

}

