const express = require('express');

var app = express()

const bodyparser = require('body-parser')
const port = process.env.PORT || 5000;
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const userroute = require('./routes/userroute')

app.use('/api/user', userroute)

app.get('/', (req,res)=> {
	res.send('This is the backend')
});

app.listen(port,() => {
	console.log('Server started on port 5000');
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}