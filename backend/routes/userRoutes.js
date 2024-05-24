const express=require("express")
const router=express.Router()
const User=require("../controller/userController")
const tryCatch=require("../middlewares/tryCatch")
const userAuth = require("../middlewares/authUser")


router.post("/userRegister",tryCatch(User.userRegister))

router.post("/depositamount/:userId",userAuth,tryCatch(User.depositAmount))

router.post("/withdrawamount/:userId",userAuth,tryCatch(User.withdrawAmount))

router.get("/fetchbalance/:userId",userAuth,tryCatch(User.viewBalance))

router.get("/transactions/:userId",userAuth,tryCatch(User.fetchTransactions))



module.exports = router