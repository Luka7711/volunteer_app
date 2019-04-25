const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')

router.get('/', (req, res)=>{
	res.render('home.ejs')
})


router.get('/login', (req, res) => {
	res.render('users/login.ejs')
})

module.exports = router;