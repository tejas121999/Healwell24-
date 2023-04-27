const { User } = require("../models")
const bcrypt = require("bcrypt")
const { createTokens, validateToken } = require("../middleware/JWT")

exports.registerUser = async (req, res) => {
    try {
        const { user } = req.body
        const find_user = await User.findOne({
            where: {
                email: user.email
            }
        })
        if (find_user) {
            return res.status(400).json({ message: "User already exists" })
        } else {
            bcrypt.hash(user.password, 10).then((hash) => {
                user.password = hash
                User.create(user).then((createUser) => {
                    const accessToken = createTokens(createUser)
                    return res.status(200).json({
                        message: "User register successful",
                        createUser,
                        accessToken
                    })
                })
                    .catch((err) => {
                        if (err) {
                            res.status(400).json({ error: err })
                        }
                    })
            })
        }
    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { login } = req.body
        const user = await User.findOne({
            where: {
                email: login.email
            }
        })
        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        } else {
            const dbPassword = user.password
            bcrypt.compare(login.password, dbPassword).then((match) => {
                if (!match) {
                    res.status(400).json({
                        error: "Wrong Credential!"
                    })
                } else {
                    const accessToken = createTokens(user)
                    if (accessToken) {
                        return res.status(200).json({
                            message: "User login successful",
                            user: user,
                            accessToken
                        })
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}