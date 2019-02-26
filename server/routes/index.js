/***********************************/
/* Routes - Index Java Script File */
/*      Bhavna Pulliahgari         */
/*          300931671              */
/*       Favourite Books           */
/***********************************/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define user module
let userModel = require('../models/users');
let User = userModel.User;

// define the book model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: '',
    displayName: req.user ? req.user.displayName : ''
   });
});

/* GET Login page  - Display */
router.get('/login', (req, res, next) => {
      if(!req.user)
      {
        res.render('auth/login', {
          title: "Login",
          //messages: req.flash('loginMessage', 'test message'),
          message: 'Login Failed',
          displayName: req.user ? req.user.displayName : ''
        })
      }else{
        return res.redirect('/');
      }
});

/* POST Login page - Process */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: 'loginMessage',
  failureMessage: 'Please check user id and password'

})
);

/* GET Register page - Display */
router.get('/register', (req, res, next) => {
  if(!req.user)
      {
        res.render('auth/register', {
          title: "Register",
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
        })
      }else{
        return res.redirect('/');
      }
});

/* POST Register page - Process */
router.post('/register', (req, res, next) => {
  let newUser =  new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password, (err) => {
      if(err)
      {
        console.log('Error: Inserting New User');
            if(err.name == "UserExistsError"){
              req.flash('registerMessage', 'Registration Unsuccessful - User Already Exists, Please try again');
              console.log('Error: User Already Exists!');
            }
            return res.render('auth/register', {
              title: "Register",
              messages: req.flash('registerMessage'),
              displayName: req.user ? req.user.displayName : ''
            })
      } 
      else{
        return passport.authenticate('local')(req, res, ()=>{
          res.redirect('/books');
          })
      }    
    }
  )

});

/* GET Logout page - Perform */
router.get('/logout', (req, res, next) => {
  req.logout(0);
  res.redirect('/');
});


module.exports = router;
