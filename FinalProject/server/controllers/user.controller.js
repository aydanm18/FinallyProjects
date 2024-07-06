const sendVerifyEmail = require('../helpers/sendMail');
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
// require("dotenv").config();

const user_controller = {
    getAll: async (req, res) => {
        const users = await UserModel.find()
        try {
            if (users.length > 0) {
                res.status(200).send({
                    message: 'success',
                    data: users
                })
            } else {
                res.send({
                    message: 'data is empty',
                    data: null
                })
            }

        } catch (error) {
            res.status(500).send({
                message: error,
                error: true
            })
        }
    },
    getOne: async (req, res) => {
        const { id } = req.params
        try {
            const user = await UserModel.findById(id)
            if (user) {
                res.status(200).send({
                    message: 'success',
                    data: user
                })
            } else {
                res.send({
                    message: 'data is empty',
                    data: null
                })
            }

        } catch (error) {
            res.status(500).send({
                message: error,
                error: true
            })
        }
    },
    delete: async (req, res) => {
        const { id } = req.params
        try {
            let response = await UserModel.findByIdAndDelete(id);
            let allUsers = await UserModel.find({})
            res.send({
                message: 'deleted',
                response: response,
                allUsers: allUsers
            })
        } catch (error) {
            res.status(500).send({
                message: error,
                error: true
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        try {
            await UserModel.findByIdAndUpdate(id, req.body);
            const updated = await UserModel.findById(id)
            res.send({
                message: 'updated',
                response: updated,
            })
        } catch (error) {
            res.status(500).send({
                message: error,
                error: true
            })
        }
    },
    register: async (req, res) => {
        try {
            const dublicateUsername = await UserModel.find({ username: req.body.username });
            const dublicateEmail = await UserModel.find({ email: req.body.email });
            let message = '';
            if (dublicateUsername.length > 0) {
                message = 'username already in use'
            }
            if (dublicateEmail.length > 0) {
                message = 'email already in use'
            }
            if (message.length > 0) {
                res.send({
                    error: true,
                    message: message,
                })
            }
            else {
                const saltRounds = 10;
                const newUser = { ...req.body }
                bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                    newUser.password = hash;
                    newUser.src = `http://localhost:8080/uploads/${req.file.filename}`;
                    const user = new UserModel(newUser);
                    await user.save();
                    //send email
                    //token
                    const token = jwt.sign({ email: user.email, id: user._id }, process.env.PRIVATE_TOKEN_KEY, { expiresIn: '1h' });
                    sendVerifyEmail(newUser.email, token)

                });
                res.send({
                    message: 'posted',
                    response: newUser,
                    error: false
                })
            }
        } catch (error) {
            res.status(500).send({
                message: error,
                error: true
            })
        }
    },

    user_login: async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email, role: 'client' });
        if (user) {
            console.log(user);
            const decryptedPass = await bcrypt.compare(password, user.password);
            if (decryptedPass) {
                if (user.isVerified) {
                    const token = jwt.sign({ id: user._id, role: user.role }, process.env.PRIVATE_TOKEN_KEY, { expiresIn: '1d' })
                    res.send({
                        message: 'successfully signed in',
                        user: user,
                        auth: true,
                        token: token
                    })
                }
                else {
                    res.send({
                        message: 'verify your email',
                        auth: false
                    })
                }
            }
            else {
                res.send({
                    message: 'email or password is incorrent ',
                    auth: false
                })
            }
        }
        else {
            res.send({
                message: 'no such user',
                auth: false
            })
        }
    },
    admin_login: async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email, role: 'admin' });
        if (user) {
            // console.log(user);
            const decryptedPass = await bcrypt.compare(password, user.password);
            if (decryptedPass) {

                const token = jwt.sign({ id: user._id, role: user.role }, process.env.PRIVATE_TOKEN_KEY, { expiresIn: '1d' })
                res.send({
                    message: 'successfully signed in',
                    auth:true,
                    user: user,
                    token: token
                })

            }
            else {
                res.send({
                    message: 'email or password is incorrent ',
                    auth:false,
                })
            }
        }
        else {
            res.send({
                message: 'no such user',
                auth:false,

            })
        }
    },
    verify: async (req, res) => {
        const { token } = req.params;
        try {
            const validToken = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);
            if (validToken) {
                await UserModel.findByIdAndUpdate(validToken.id, { isVerified: true });
                res.redirect("http://localhost:5173/login");
            } else {
                res.send({
                    message: "invalid token",
                });
            }
        } catch (error) {
            res.send({
                error: error,
            });
        }
    },
}
module.exports = user_controller;