const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8080

const bodyParser = require("body-parser");
const cors = require("cors");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: "",
        },
        description: String,
        src: String,
        comments: Array,
    },
    { timestamps: true, versionKey: false }
);

const BlokModel = mongoose.model('Blok', BlogSchema);

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalPrice: Number,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

const OrderModel = mongoose.model('Order', OrderSchema);

const TeamSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
}, { timestamps: true });

const TeamModel = mongoose.model('Team', TeamSchema);

//orders
app.get('/orders', async (req, res) => {
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
})

app.get('/orders/:id', async (req, res) => {
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
})

app.delete('/orders/:id', async (req, res) => {
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
})

app.post('/orders', async (req, res) => {

    const newOrder = new OrderModel(req.body)
    await newOrder.save();
    res.send({
        message: 'posted',
        response: newOrder,
    })
})

app.patch('/orders/:id', async (req, res) => {
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
})

//Teams
app.get('/teams', async (req, res) => {
    const teams = await TeamModel.find()
    try {
        if (teams.length > 0) {
            res.status(200).send({
                message: 'success',
                data: teams
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
})

app.get('/teams/:id', async (req, res) => {
    const { id } = req.params
    try {
        const team = await TeamModel.findById(id)
        if (team) {
            res.status(200).send({
                message: 'success',
                data: team
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
})

app.delete('/teams/:id', async (req, res) => {
    const { id } = req.params
    try {
        let response = await TeamModel.findByIdAndDelete(id);
        let allTeams = await TeamModel.find({})
        res.send({
            message: 'deleted',
            response: response,
            allOrders: allTeams
        })
    } catch (error) {
        res.status(500).send({
            message: error,
            error: true
        })
    }
})

app.post('/teams', async (req, res) => {

    const newTeam = new TeamModel(req.body)
    await newTeam.save();
    res.send({
        message: 'posted',
        response: newTeam,
    })
})

app.patch('/teams/:id', async (req, res) => {
    const { id } = req.params
    try {
        await TeamModel.findByIdAndUpdate(id, req.body);
        const updated = await TeamModel.findById(id)
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
})

//Bloks
app.get('/bloks', async (req, res) => {
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
})

app.get('/bloks/:id', async (req, res) => {
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
})

app.delete('/bloks/:id', async (req, res) => {
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
})

app.post('/bloks', async (req, res) => {

    const newBloks = new BlokModel(req.body)
    await newBloks.save();
    res.send({
        message: 'posted',
        response: newBloks,
    })
})

app.patch('/bloks/:id', async (req, res) => {
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
})

mongoose.connect('mongodb+srv://aydanbabayeva:aydan1809@products.3f7najz.mongodb.net/products?retryWrites=true&w=majority&appName=Products')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})