const express = require('express');
const cors =require('cors');
require('dotenv').config();
const auth = require('./util/auth');
console.log(process.env.ENV)

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/friends', auth, require('./routes/friends'));

app.listen(3001, console.log('sever running on port 3001...'))