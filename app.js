const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config()

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

//Connect to db
mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
})
.catch( function(err) {
  console.log(err);
});

// Routes
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')

// MIDDLEWARES
app.use(express.json())
app.use(morgan('combined'))

//Routes
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)

app.listen(8080, () => 'Server is up and running!')
