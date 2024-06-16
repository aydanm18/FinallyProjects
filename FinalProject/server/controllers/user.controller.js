const UserModel = require('../models/user.model')

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
    post: async (req, res) => {
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
                const newUser = new UserModel(req.body)
                await newUser.save();
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
}
module.exports = user_controller;