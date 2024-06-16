const OrderModel=require('../models/order.model')

const order_controller={
    getAll: async (req, res) => {
        const orders = await OrderModel.find()
        try {
            if (orders.length > 0) {
                res.status(200).send({
                    message: 'success',
                    data: orders
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
            const order = await OrderModel.findById(id)
            if (order) {
                res.status(200).send({
                    message: 'success',
                    data: order
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
            let response = await OrderModel.findByIdAndDelete(id);
            let allOrders = await OrderModel.find({})
            res.send({
                message: 'deleted',
                response: response,
                allOrders: allOrders
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
            await OrderModel.findByIdAndUpdate(id, req.body);
            const updated = await OrderModel.findById(id)
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

        const newOrder = new OrderModel(req.body)
        await newOrder.save();
        res.send({
            message: 'posted',
            response: newOrder,
        })
    },
}

module.exports=order_controller