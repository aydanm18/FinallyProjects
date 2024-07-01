const MessageModel = require('../models/message.model')

const message_controller = {
    getAll: async (req, res) => {
        const messages = await MessageModel.find()
        try {
            if (messages.length > 0) {
                res.status(200).send({
                    message: 'success',
                    data: messages
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
            const message = await MessageModel.findById(id)
            if (menu) {
                res.status(200).send({
                    message: 'success',
                    data: message
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
            let response = await MessageModel.findByIdAndDelete(id);
            let allMessage = await MessageModel.find({})
            res.send({
                message: 'deleted',
                response: response,
                allBloks: allMessage
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
            await MessageModel.findByIdAndUpdate(id, req.body);
            const updated = await MessageModel.findById(id)
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

        const newMessage = new MessageModel(req.body)
        await newMessage.save();
        res.send({
            message: 'posted',
            response: newMessage,
        })
    },
}
module.exports = message_controller;