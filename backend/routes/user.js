const express = require("express");
const zod = require("zod");
const {User} = require("../db");
const {Account} = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");

const router = express.Router();

const signupschema = zod.object({
    userName : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password: zod.string()
});

const singinschema = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

const updateschema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
})

router.post("/signup", async (req, res) => {
    const response = signupschema.safeParse(req.body);

    if(!response.success){  
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        userName: req.body.userName
    })

    if(user){
        return res.json({
           message: "Email already taken / Incorrect inputs"
        })
    }
    const dbUser = await User.create(req.body); 
    
    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({userId: dbUser._id}, JWT_SECRET);
    
    res.json({
        message: "User created successfully",
        token: token
    })


})

router.post("/signin", async (req, res) => {
    const response = singinschema.safeParse(req.body);
    if(!response.success){
        res.status(411).json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne(req.body);

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.json({
            token: token
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })


})


    router.put("/", authMiddleware, async (req, res) => {
        const response = updateschema.safeParse(req.body);
        if(!response.success){
            res.status(411).json({
                message: "Error while updating information"
            })
        }

        await User.updateOne({_id: req.userId}, req.body);
        res.json({
            message: "Updated successfully"
        })
    })  


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router; 