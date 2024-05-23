const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    balance: {
        type: Number,
        default: 0,
      },
      transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transactions',
      }],
      isDisabled: {
        type: Boolean,
        default: false,
      },
})

const User = mongoose.model("User",userSchema)

module.exports = User