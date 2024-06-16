const BlokModel=require('../models/blok.model')

const blok_controller={
    getAll: async (req, res) => {
        const bloks = await BlokModel.find()
        try {
            if (bloks.length > 0) {
                res.status(200).send({
                    message: 'success',
                    data: bloks
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
            const blok = await BlokModel.findById(id)
            if (blok) {
                res.status(200).send({
                    message: 'success',
                    data: blok
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
            let response = await BlokModel.findByIdAndDelete(id);
            let allBloks = await BlokModel.find({})
            res.send({
                message: 'deleted',
                response: response,
                allBloks: allBloks
            })
        } catch (error) {
            res.status(500).send({
                message: error,
                error: true
            })
        }
    },
    update:  async (req, res) => {
        const { id } = req.params
        try {
            await BlokModel.findByIdAndUpdate(id, req.body);
            const updated = await BlokModel.findById(id)
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

        const newBloks = new BlokModel(req.body)
        await newBloks.save();
        res.send({
            message: 'posted',
            response: newBloks,
        })
    },
}
module.exports=blok_controller;