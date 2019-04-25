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


router.get('/register', (req, res) => {

  const msg = req.session.message
  req.session.message = ""
  res.render('users/register.ejs', {
    message: msg
  });

})

router.post('/login', (req, res, next) => {
  res.send(req.body)
})

router.post('/register', async (req, res, next) => {

  try {
    const found = await User.findOne({username: req.body.username})
    console.log(found);
    if(found !== null) {
      req.session.message = "Username already taken."
      res.redirect('/users/register')
    }
    else {
      const createdUser = await User.create(req.body)
      req.session.loggedIn = true 
      req.session.username = createdUser.username
      req.session.message = "Thank you for registering, " + createdUser.username
      res.redirect('/')
    }

  } catch(err) {
    next(err)
  }

})




module.exports = router;