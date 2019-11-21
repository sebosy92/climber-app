const express = require('express')
const router = express.Router()
const User = require ('../models/user')
const auth = require ('../middleware/auth')
const multer = require ('multer')
const sharp = require ('sharp')


router.post('/users', async (req, res) => {
    const user = new User (req.body)
        try {
            user.type = 'user'
            await user.save()
           const token = await user.createLoginToken()
            res.status(201).send({user, token})
        } catch (e) {
            res.status(400).send(e)
        }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCedentials(req.body.email, req.body.password)
        const token = await user.createLoginToken()
        res.send( {user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth,  async (req, res) => {
   try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.send()
   }
   catch(e) {
    res.status(500).send()
   }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        send()
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


const avatar = multer({
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


router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res) => {

        const bufer = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
        req.user.avatar = bufer
        await req.user.save()
        res.send()

})


router.get('/users/me/avatar',auth, async (req, res) => {
    try {
        res.set('Content-Type', 'image/png')
        res.send(req.user.avatar)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/me/avatar', auth, async (req, res, next) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.patch('/users/me', auth, async (req, res) => {
    const keys = Object.keys(req.body)
    const allowToUpdate = ['username', 'email', 'password', 'sex']
    const isAllowedToUpdate = keys.every((key) => allowToUpdate.includes(key) )

    if (!isAllowedToUpdate) {
        return res.status(400).send('Invalid update data')
    }

    try {
    keys.forEach((key) => req.user[key] = req.body[key])
    await req.user.save()
    res.send()
    } catch (e) {
    res.status(400).send()
    }

})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router