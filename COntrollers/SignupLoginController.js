const User = require("../Schema/SignupLoginSchema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const key = process.env.SECURITYKEY

const SignupLoginCOntroller = {
    signup: async (req, res) => {
        try {
            const findUser = await User.findOne({ mail: req.body.mail });
            if (findUser) {
                res.status(400).json({ message: 'User is Registed with this email' })
            } else {
                const newPassword = await bcrypt.hash(req.body.password, 10);
                const newobj = {
                    ...req.body,
                    password: newPassword
                }
                const user = await User.create(newobj);
                res.status(201).send({ message: 'SignUp successfully' })
            }
        } catch (er) {
            res.status(400).send(er)
        }
    },


    login: async (req, res) => {
        try {
            const finduser = await User.findOne({ mail: req.body.mail });
            if (!finduser) {
                res.status(401).send({ message: 'Wrong email Address' })
            } else {
                const checkPassword = await bcrypt.compare(req.body.password, finduser.password);
                if (!checkPassword) {
                    res.status(400).send({ message: "wrong password" })
                } else {
                    const token = await jwt.sign({ finduser }, key)
                    res.status(201).send({user:finduser, usertoken: token })
                }
            }

        } catch (er) { throw er }
    },

    autenticate: async (req, res, next) => {
        try {
            const token = req.header("Authorization")
            const jwToken = await token.replace("Bearer ", "").trim();
          
            const verify = await jwt.verify(jwToken, key)
            req.user = verify

            next()

        } catch (er) {
            throw er
        }
    },

    home: async (req, res) => {
        try {
            res.status(201).send({ user: req.user })
        } catch (er) { throw er }
    }






}

module.exports = SignupLoginCOntroller