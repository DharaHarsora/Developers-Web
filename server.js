const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/apis/users');
const profile = require('./routes/apis/profile');
const posts = require('./routes/apis/posts');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
     .then(()=>console.log('mongoDB Connected'))
     .catch((err)=>console.log(err));


app.get('/',(req,res)=> res.send('hello world') );

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})