const adminModel = require("../model/adminModel")
const userModel = require("../model/userModel")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')

const  adminRegister =async(req,res)=>{
     
    const {username,email,password,}=req.body

       console.log('first', req.body)

        const vendor=await adminModel.findOne({email:email})

        if(!vendor){
            const hashedPassword=await bcrypt.hash(password,10)
            const VENDOR=new adminModel({
                username:username,
                email:email,
                password:hashedPassword,
            })
            VENDOR.save()

            return res.status(201).json({
                status:"success",
                message:"vendor registration successfull",
                data:email
            })

        }
        return res.status(301).json({
            message:"vendor already registered ,please login",

        })
    }

    const getAllUsers = async (req,res) => {

        const users = await userModel.find().select('-password');

        return res.status(201).json({
            status:"success",
            message:"users fetching successfull",
            data:users
        })
    }

    const setUserMode = async(req,res) => {

        const userId = req.params.userId;

        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(404).json('User not found');
        }
        
        user.isDisabled = !user.isDisabled;

        await user.save();
        
        res.json({ 
            status:"success",
            message: user.isDisabled ? 'User account disabled' : 'User account enabled',
        });
    }

    module.exports = {adminRegister,getAllUsers,setUserMode}
