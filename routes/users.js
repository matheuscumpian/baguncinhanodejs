const express = require('express');
const router = express.Router();
const User = require('../models/user');
const validation = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {

  const { error } = validation.registerValidation(req.body)
  if (error) res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).send('Email already exists');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    const URI = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + savedUser._id;
    res.set("Location", URI);
    res.status(201).send();
  } catch (err) {
    res.status(400).send(err);
  }

})

module.exports = router;
