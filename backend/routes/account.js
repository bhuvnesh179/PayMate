const express = require("express");
const authMiddleware = require("../middleware")
const {Account} = require("../db");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const amount = req.body.amount;
    const to = req.body.to;
    const account = await Account.findOne({
        userId: req.userId
    })
    const toAccount = await Account.findOne({
        userId: to
    })

    if(amount > account.balance){
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    if(!toAccount){
        return res.status(400).json({
            message: "Invalid account"
            })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })

})

module.exports = router;