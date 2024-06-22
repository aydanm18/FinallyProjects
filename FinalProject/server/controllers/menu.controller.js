const MenuModel=require('../models/menu.model')

const menu_controller={
    getAll: async (req, res) => {
        const menues = await MenuModel.find()
        try {
            if (menues.length > 0) {
                res.status(200).send({
                    message: 'success',
                    data: menues
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
            const menu = await MenuModel.findById(id)
            if (menu) {
                res.status(200).send({
                    message: 'success',
                    data: menu
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
            let response = await MenuModel.findByIdAndDelete(id);
            let allMenues = await MenuModel.find({})
            res.send({
                message: 'deleted',
                response: response,
                allBloks: allMenues
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
            await MenuModel.findByIdAndUpdate(id, req.body);
            const updated = await MenuModel.findById(id)
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

        const newMenu = new MenuModel(req.body)
        await newBloks.save();
        res.send({
            message: 'posted',
            response: newMenu,
        })
    },
}
module.exports=menu_controller;