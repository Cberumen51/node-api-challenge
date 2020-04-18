const express = require('express')
const projectdb = require('../data/helpers/projectModel')

const router = express.Router()

// router.get('/', (req,res) => {

// })

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