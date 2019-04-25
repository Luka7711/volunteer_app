const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const Event = require('../models/event')
const User = require('../models/user')

router.get('/', (req, res)=>{
	res.render('home.ejs')
})


router.get('/login', (req, res) => {
	res.render('users/login.ejs')
})


router.get('/register', (req, res) => {

//   const msg = req.session.message
//   req.session.message = ""
//   res.render('users/register.ejs', {
//     message: msg
//   });
res.render('users/register.ejs')

})

router.post('/login', (req, res, next) => {
  res.send(req.body)
})

//Create Register Route
router.post('/register', async (req, res) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	console.log(passwordHash);
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;
	userDbEntry.dateOfBirth = req.body.dateOfBirth;

  try {

      const createdUser = await User.create(userDbEntry)
      req.session.logged = true 
      req.session.usersDbId = createdUser._id;
      // console.log("Made user, now redirect: ")
      res.redirect('/users')

  } catch(err) {
  	console.log("ERROR: ", err)
    res.send(err)
  }

})





module.exports = router;