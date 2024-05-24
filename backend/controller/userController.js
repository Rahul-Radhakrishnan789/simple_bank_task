const userModel = require("../model/userModel");
const transactionModel = require("../model/transactionModel")
const transactionsModel = require("../model/transactionModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("first,", req.body);

  const user = await userModel.findOne({ email: email });

  if (user) {
    return res.status(301).json({
      message: "user already registered ,please login",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const USER = new userModel({
    username: username,
    email: email,
    password: hashedPassword,
  });
  await USER.save();

  return res.status(201).json({
    status: "success",
    message: "user registration successfull",
    data: email,
  });
};

const depositAmount = async (req, res) => {

  const { amount } = req.body;

  const userId = req.params.userId;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json("User not found");
  }

  const transaction = new transactionsModel({
    userId: userId,
    type: "deposit",
    amount,
  });
  user.balance += amount;
  user.transactions.push(transaction);
  await transaction.save();
  await user.save();

  res.status(200).json({
    status: "success",
    message: "amount deposited successfuly",
    data: { transaction, user },
  });
};

const withdrawAmount = async (req, res) => {

  const { amount } = req.body;

  const userId = req.params.userId;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json("User not found");
  }

  if (user.balance < amount) {
    return res.status(400).json({ msg: "Insufficient funds" });
  }

  const transaction = new transactionsModel({
    userId: user.id,
    type: "withdrawal",
    amount,
  });
  user.balance -= amount;
  user.transactions.push(transaction);
  await transaction.save();
  await user.save();

  res.status(200).json({
    status: "success",
    message: "amount withdrawed successfuly",
    data:  transaction ,
  });
};

const viewBalance = async (req,res) => {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);

    if(!user){
        return res.status(400).json('user not found');
    }

    const balance =  user.balance

    res.status(200).json({
        status: "success",
        message: "balance fetched successfuly",
        data:  balance ,
      });
}

const fetchTransactions  = async (req,res) => {

    const userId = req.params.userId;

    const userTransactions = await transactionModel.find({userId : userId})

    res.status(200).json({
        status: "success",
        message: "transactions fetched successfuly",
        data:  userTransactions ,
      });
}

module.exports = { userRegister, depositAmount, withdrawAmount,viewBalance,fetchTransactions };
