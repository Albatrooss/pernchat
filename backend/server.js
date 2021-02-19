const express = require('express');
const cors =require('cors');
const auth = require('./util/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/friends', auth, require('./routes/friends'));

app.listen(3001, console.log('sever running on port 3001...'))