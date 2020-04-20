const express = require('express')
const actionsdb = require('../data/helpers/actionModel')

const router = express.Router()

router.get("/", (req, res) => {
    console.log("req.query", req.query);
    actionsdb.get()
      .then((action) => {
        console.log(action);
        res.status(200).json(action);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "There was an error while getting the actions"
      })
     })
})

router.get('/:id', (req,res) => {
    actionsdb.get(req.params.id)
    .then ((action) => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({
                message: "The action Id does not exist"
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "There was a problem getting the action"
        })
    })
})

router.post('/', (req,res) => {
    if (!req.body.description || !req.body.notes ) {
        return res.status(400).json({
            message: "Please provide description and notes for the action"
        })
    }
    actionsdb.insert(req.body)
    .then((action) => {
        res.status(201).json(action)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "There was an error while saving the ation to the database"
        })
    })
})

router.put('/:id', (req,res) => {
    if(!req.body.description || !req.body.notes) {
        res.status(400).json({
            message: "Please include both a description and notes for the action"
        })
    }
    actionsdb.get(req.params.id)
    .then((action) => {
        if (!action) {
            res.status(404).json({
                message: "The ation that that id was not found"
            })
        } else {
            actionsdb.update(req.params.id, req.body)
            .then((action) => {
                res.status(200).json(action)
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Failed to update the action"
                })
            })
        }
    })
})

router.delete('/:id', (req,res) => {
    actionsdb.remove(req.params.id)
    .then((action) => {
        if (action) {
            res.status(200).json({
                message: "successfully deleted"
            })
        } else {
            res.status(404).json({
                message: "There was an error deleting the action or the action doesn't exist"
            })
        }
    })
})

module.exports = router