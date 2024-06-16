const TeamModel = require('../models/team.model');

const team_controller = {
    getAll: async (req, res) => {
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
    },
    getOne: async (req, res) => {
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
    },
    delete: async (req, res) => {
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
    },
    update: async (req, res) => {
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
    },
    post: async (req, res) => {
        const newTeam = new TeamModel(req.body)
        await newTeam.save();
        res.send({
            message: 'posted',
            response: newTeam,
        })
    },
}
module.exports = team_controller