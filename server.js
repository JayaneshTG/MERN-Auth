const express = require('express');

var app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const userroute = require('./routes/userroute')

app.use('/api/user', userroute)

app.get('/', (req,res)=> {
	res.send('This is the backend')
});

app.listen(5000,() => {
	console.log('Server started on port 5000');
})