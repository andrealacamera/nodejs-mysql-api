const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const dotenv=require('dotenv');
const Validator = require("fastest-validator");

//
dotenv.config();

function signUp(req,res) {

    // data validation
    //validation schema
    const schema = {
        name: {
            type : "string",
            optional: true,
        },
        email: {
            type: "email",
            optional: false
        },
        password: {
            type: "string", 
            optional: false,
            min: "8"
        }
    }

    //validate the data 
    const v = new Validator();
    const validation = v.validate({
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password
            }, 
            schema);

    //set error response
    if (validation !== true) {
        return res.status(400).json({
            message: "data validation failed, check again",
            errors: validation
        });
    }

    //mail duplication check
    models.User.findOne({where: {email: req.body.email}})
        .then(result => {
            //email already exists!
            if (result) {
                res.status(409).json({
                    message: "email already exists!"
                });
            } else {
                // ok no email -> new user
                bcrypt.genSalt(10, (err, salt) => {
                    //salt generated
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        // hash generated 
                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash //hash the password!
                        }
                        models.User.create(user)
                            .then(result => {
                                res.status(201).json({
                                    message: "user created!",
                                })
                            })
                            .catch(error => {
                                res.status(500).json({
                                    message: "user error"
                                })
                            });
                    })
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "user error"
            })
        });    
}

function login(req,res) {

    // data validation
    //validation schema
    const schema = {
        name: {
            type : "string",
            optional: true,
        },
        email: {
            type: "email",
            optional: false
        },
        password: {
            type: "string", 
            optional: false,
            min: "8"
        }
    }

    //validate the data 
    const v = new Validator();
    const validation = v.validate({
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password
            }, 
            schema);

    //set error response
    if (validation !== true) {
        return res.status(400).json({
            message: "data validation failed, check again",
            errors: validation
        });
    }

    //check the email
    models.User.findOne({where: {email: req.body.email}})
    .then(user => {
        //user is the result of the search
        //user.passoword contains the stored passwd
        if (user === null) {
            //unauthorized user!
            res.status(401).json({
                message: "invalid credentials!"
            });
        } else {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if (success) {
                    // ok user, create JWT and send
                    const token = jwt.sign(
                    {
                        //details included into the token
                        email: user.email,
                        userId: user.id
                    }, 
                    process.env.JWT_SECRET,  //secret
                    (err, token) => {
                        res.status(201).json({
                            message: "Auth ok",
                            token: token
                        })
                    });
                } else {
                   //unauthorized user!
                    res.status(401).json({
                        message: "invalid credentials!"
                    }); 
                }
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "login error"
        })
    })
}



module.exports = { signUp, login }