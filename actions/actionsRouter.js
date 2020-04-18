const express = require('express')
const actionsdb = require('../data/helpers/actionModel')

const router = express.Router()

// router.get('/', (req,res) => {

// })

router.get('/:id', (req,res) => {
    actionsdb.get(req.params.id)
    .then ((proj) => {
        if (proj) {
            res.status(200).json(proj)
        } else {
            res.status(404).json({
                message: "The action Id does not exist"
            })
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

router.delete('/:id', (req,res) => {
    actionsdb.remove(req.params.id)
    .then((proj) => {
        if (proj) {
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