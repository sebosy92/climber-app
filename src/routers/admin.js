const express = require('express')
const router = express.Router()
const User = require ('../models/user')
const auth = require ('../middleware/auth')
const multer = require ('multer')
const sharp = require ('sharp')
const Rock = require ('../models/rock')
const isAdmin = require ('../middleware/is_admin')


const topo = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error ('File must be in following format: JPG, JPEG, PNG.'))
        }

        cb(undefined, true)

    }
})

router.post('/admin/newrock', auth, isAdmin, async (req, res) => {
    const rock = new Rock (req.body)
        try {
            await rock.save()
            res.status(201).send(rock)
        } catch (e) {
            res.status(400).send(e)
        }
})


router.post('/admin/newrock/:rockName', auth, isAdmin, topo.single('topo'), async (req, res) => {
    const rock = await Rock.findOne({ name: req.params.rockName})
    try {
        const bufer = await sharp(req.file.buffer).resize(650).png().toBuffer()
        rock.topo = bufer
        await rock.save()
        res.status(200).send(rock)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/newroute', auth, isAdmin, async (req, res) => {
    console.log(req.body)
    try {
        const rock = Rock.findOne({name: req.body.name})
        if (!rock) {
            return status(404).send('Rock must be valid!')
        }
        rock.routes = rock.routes.concat( req.body.routes )
        await rock.save()
        res.status(201).send(rock)
    } catch (e) {
        res.status(400).send()
    }
    res.send()
})



router.get('/admin/rock/:rockName/topo', async (req, res) => {
    const rock = await Rock.findOne({ name: req.params.rockName})
    res.set('Content-Type', 'image/png')
    res.send(rock.topo)

})


router.get('/admin/rock/:rockName', async (req, res) => {
    const rock = await Rock.findOne({ name: req.params.rockName})
    res.send(rock)

})

module.exports = router