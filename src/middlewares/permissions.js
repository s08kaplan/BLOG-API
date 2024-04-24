"use strict"

function getUserInfo(req){
    let user = req.user
    let isActive = req.user?.isActive
    let userId = req.user?.id
    let userRole = req.user?.role

    return { user, isActive, userId, userRole }
}

module.exports = {
    isLogin: (req, res, next) => {
      const { user, isActive } = getUserInfo(req)
      if(user && isActive) next()
      else throw new Error("You must log in to continue")
    },


    //! COMMENT

//! create => Admin, Staff, Group_Manager, Member
CC_ASGM: (req, res, next) => {
  const { userRole } = getUserInfo(req)
  if([1, 2, 3, 4].includes(userRole)) next()
  else throw new Error("You must have sufficient role for this situation")
  
}
}

