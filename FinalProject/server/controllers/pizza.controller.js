const PizzaModel=require('../models/pizza.model')

const pizza_controller={
    getAll: async (req, res) => {
        const pizzas = await PizzaModel.find()
        try {
            if (pizzas.length > 0) {
                res.status(200).send({
                    message: 'success',
                    data: pizzas
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
            const pizza = await PizzaModel.findById(id)
            if (pizza) {
                res.status(200).send({
                    message: 'success',
                    data: pizza
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
            let response = await PizzaModel.findByIdAndDelete(id);
            let allPizzas = await PizzaModel.find({})
            res.send({
                message: 'deleted',
                response: response,
                allBloks: allPizzas
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
            await PizzaModel.findByIdAndUpdate(id, req.body);
            const updated = await PizzaModel.findById(id)
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

        const newPizza = new PizzaModel(req.body)
        await newPizza.save();
        res.send({
            message: 'posted',
            response: newPizza,
        })
    },
}
module.exports=pizza_controller;