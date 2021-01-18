const express = require('express')
var app = express()
const router = express.Router()

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rootuser:rootpassword@auth.agqhb.mongodb.net/auth?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
},function(err){
	if(err){
		console.log(err);
	}else{
		console.log('MongoDB connection successful')
	}
})
// mongoose.connection.on('connected',()=>{
// 	console.log('MongoDB connection is successful');
// })

var Usermodel = mongoose.model('users', {name:String, username:String, password:String})

router.post('/registeruser', (req, res)=> {
	var newuser = new Usermodel({name:req.body.name, username:req.body.username, password:req.body.password})
	newuser.save(function(err){
		if(err){
			res.send('Something went wrong');
		}
		else{
			res.send('User registeration successful')
		}
	})
})

router.post('/loginuser',(req,res)=>{
	Usermodel.find({
		username:req.body.username,
		password:req.body.password
	},(err,documents)=>{
		if(err){
			res.send('Something went wrong');
		}
		else{
			if(documents.length==0){
				res.send('Login failed');
			}
			else{
				res.send('Login successful');
			}
		}
	})
})

router.post('/getusers',(req,res)=>{
	Usermodel.find({},(err,documents)=>{
		if(err){
			res.send('Something went wrong');
		}
		else{
			res.send(documents);
		}
	})
})

module.exports = router