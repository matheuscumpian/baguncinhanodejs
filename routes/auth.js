const express = require('express');
const router = express.Router();
const validation = require('../validation');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// User login
router.post('/', async (req, res) => {

  const { error } = validation.loginValidation(req.body)
  if (error) res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email or password is invalid');


  // Hash password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json(
    {
      error: 'E-mail or password is wrong'
    }
  );

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).json(
    {
      status: 'Success',
      access_token: token
    }
  );
})


module.exports = router;
