const express=require("express")
const router=express.Router()
const Admin=require("../controller/adminController")
const tryCatch=require("../middlewares/tryCatch")


router.post("/adminRegister",tryCatch(Admin.adminRegister))

router.get("/getusers",tryCatch(Admin.getAllUsers))

router.put('/setusermode/:userId',tryCatch(Admin.setUserMode))


module.exports = router