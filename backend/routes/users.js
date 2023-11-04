const router = require('express').Router();
const {User, validate} = require("../models/user")
const bcrypt = require("bcrypt")


router.post("/",async(req,res)=>{
    try{
        const {error} = validate(req.body)
        if(erro)
            return res.status(400).send({message: error.details[0].message})


        //checking if the email id already exists
        const user = await User.findOne({email:req.body.email})
        if(user)
            return res.send(409).send({message:"User with given email already exists"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)



        //save user to the database
        await new User({...req.body, password:hashPassword}).save()
        res.status(201).send({message:"User created successfully"})
    } catch(error){
        res.status(500).send({message:"Internal server error"})
    }
})

module.exports = router