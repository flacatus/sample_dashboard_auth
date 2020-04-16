'use strict';

const bcrypt                = require('bcryptjs');
const User                  = require('../../models/users');
const validateLoginInput    = require('../validator/login');
const validateRegisterInput = require('../validator/register');
const jwt                   = require('jsonwebtoken');
const logger                = require('../logger').info;

//Register a new user in MongoDB
const registerUsers         =  (req, res)=> {
  User.findOne({ email: req.body.email }).then(user => {
    console.log(req.body)
    if (user) {
      const error = 'Email already exists';
      return res.status(400).json({errors: error});
    } else {

      const newUser = new User({
        displayName       : req.body.displayName,
        email             : req.body.email,
        password          : req.body.password
      });
      //Encrypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          
          newUser.password = hash;
          logger.info("Storing user in database...  ")
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              logger.error("Error storing user in database")
              res.status(401).json(err)
            })
        });
      });
    }
  });
}

/*Functionality for user login
 * En case of successfully login user receive a new JWT token
*/
const loginUsers = (req, res)=> {
  const email = req.body.data.email;
  const password = req.body.data.password;
  console.log(req.body)
  // Check if user exist in BBDD 
  User.findOne({ email }).then(user => {
    console.log(email)
    if (!user) {
      return res.status(404).json({errors:"User not found"});
    }

    // Compare the password with pass stored in Mongo DB
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User logged correctly
        const payload = { id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
       }; // Sample key signed
        const secret  = "secretOrKey";
        // Signing the token
        const jwtBearerToken = jwt.sign(
          payload,
          secret,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              access_token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({errors:"Password incorrect"});
      }
    });
  });
}

module.exports = {
  registerUsers,
  loginUsers
}
