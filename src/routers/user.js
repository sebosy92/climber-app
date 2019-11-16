const express = require('express')
const router = express.Router()
const User = require ('../models/user')

router.post('/users', async (req, res) => {
    const user = new User (req.body)
    console.log(req.body)
        try {
            await user.save()
            res.status(201).send()
        } catch (e) {
            res.status(400).send(e)
        }
})

module.exports = router