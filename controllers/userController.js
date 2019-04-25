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

//Create Register Route
router.post('/register', async (req, res) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	console.log(passwordHash);
	
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;
	userDbEntry.dateOfBirth = req.body.dateOfBirth;
	userDbEntry.img = req.body.img;

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

//Login Route

router.post('/login', async (req, res) => {
	try{
		const foundUser = await User.findOne({'username': req.body.username});
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
				req.session.logged = true;
				req.session.userDbId = foundUser._id;
				console.log(req.session, 'login successful');
				res.redirect('/users')

		}else{
			req.session.message = "Username or password incorrect"
			req.redirect('/users/login')
		}
		}else {
			req.session.message = "Username or password incorrect"
			res.redirect('/users/login')
		}

	}catch(err) {
		res.send(err)
	}
})


router.get('/login', (req, res) => {
	res.render('users/login.ejs', {
		message: req.session.message
	})
})



router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.send(err);
			console.log(err);
		}else {
			res.redirect('/users/login')
		}
	})
	
})









module.exports = router;