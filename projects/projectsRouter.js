const express = require('express')
const projectdb = require('../data/helpers/projectModel')
const actionsdb = require('../actions/actionsRouter')

const router = express.Router()

router.get("/", (req, res) => {
    projectdb.get()
      .then((proj) => {
        console.log(proj);
        res.status(200).json(proj);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "There was an error while getting the projects"
      })
     })
})

router.get('/:id', (req,res) => {
    projectdb.get(req.params.id)
    .then ((proj) => {
        if (proj) {
            res.status(200).json(proj)
        } else {
            res.status(404).json({
                message: "The project Id does not exist"
            })
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/:id/actions', (req,res) => {
    projectdb.getProjectActions(req.params.id)
    .then((proj) => {
        res.status(200).json(proj)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "There was an error while getting the actions"
         })
    })
})



router.post('/', (req,res) => {
    if (!req.body.name || !req.body.description ) {
        return res.status(400).json({
            message: "Please provide description and notes for the project"
        })
    }
    projectdb.insert(req.body)
    .then((proj) => {
        res.status(201).json(proj)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "There was an error while saving the project to the database"
        })
    })
})


router.put('/:id', (req,res) => {
    if(!req.body.name || !req.body.description) {
        res.status(400).json({
            message: "Please include both a name and description for the project"
        })
    }
    projectdb.get(req.params.id)
    .then((proj) => {
        if (!proj) {
            res.status(404).json({
                message: "The project that that id was not found"
            })
        } else {
            projectdb.update(req.params.id, req.body)
            .then((proj) => {
                res.status(200).json(proj)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: "Failed to update the project"
                })
            })
        }
    })
})

router.delete('/:id', (req,res) => {
    projectdb.remove(req.params.id)
    .then((proj) => {
        if (proj) {
            res.status(200).json({
                message: "successfully deleted"
            })
        } else {
            res.status(404).json({
                message: "There was an error deleting the project or the project doesn't exist"
            })
        }
    })
})

module.exports = router