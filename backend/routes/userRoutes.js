const express=require("express")
const router=express.Router()
const User=require("../controller/userController")
const tryCatch=require("../middlewares/tryCatch")


router.post("/userRegister",tryCatch(User.userRegister))

router.post("/depositamount/:userId",tryCatch(User.depositAmount))

router.post("/withdrawamount/:userId",tryCatch(User.withdrawAmount))



module.exports = router