const userModel = require("../model/userModel")
const adminModel = require("../model/adminModel")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')





const commonLogin=async(req,res)=>{
    const {email,password,isAdmin}=req.body

    console.log(email,password,isAdmin);

    if(isAdmin){
        const admin=await adminModel.findOne({email:email})

        console.log("admin",admin);

        if(!admin){
            return res.status(301).json({
                message:"admin not registered,please Register"
            })
        }
        const comparePassword = bcrypt.compare(password, admin?.password)      
        if(comparePassword){
            const secret = process.env.SECRET_KEY_ADMIN;
            const token = jwt.sign({
                userId: admin?._id,
                
            },
                secret, { expiresIn: '72h' }
            );

            return res.status(200).json({
                message:"admin login successfull",
                data:token,
                Id: admin?._id,
                type:"admin"
            })
          
        }         

        return res.status(403).json({
            message:"invalid password",
          })
    
    }
    const user=await userModel.findOne({email:email})
    if(user){
        const comparePassword = bcrypt.compare(password, user?.password) 
        // console.log("pass",comparePassword);
        if(comparePassword){
            const secret = process.env.SECRET_KEY_USER;
            const token = jwt.sign({
                userId: user?._id,
                
            },
                secret, { expiresIn: '72h' }
            );

            return res.status(200).json({
                message:"user login successfull",
                data:token,
                Id: user?._id,
                type:"user"
            })

        }
        return res.status(403).json({
            message:"invalid password",
          })
    }
    return   res.status(301).json({
        message:"please  register your account"
    })


}


module.exports = {commonLogin}