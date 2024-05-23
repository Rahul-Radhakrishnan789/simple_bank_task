const express=require("express")
const router=express.Router()
const commonRoute =require("../controller/commonController")
const tryCatch=require("../middlewares/tryCatch")


router.post("/commonlogin",tryCatch(commonRoute.commonLogin))


module.exports = router