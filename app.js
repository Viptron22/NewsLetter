var express=require('express');
var sq=require('mysql');
const { faker } = require('@faker-js/faker');
var app=express();
var bodyparser=require('body-parser');
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));

//uses all content in directory
app.use(express.static(__dirname + "/public"));
var connection=sq.createConnection({
	
		host:'localhost',
		user:'root',
		password:'V24@root6113',
		database:'join_us'
		
});
connection.connect(function(err) {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	  return;
	}
  
	console.log('connected as id ' + connection.threadId);
  });
  
app.get("/",function(request,response){
	 var noOfUsers;
		 connection.query("SELECT COUNT(*) as total FROM users",function(error,result,field){
			if(error) throw error;
			 noOfUsers=result[0].total;
			 console.log(noOfUsers);
	
	//this will print incoming request data in console
	//console.log(request);
	//only have one response we send html files
	
		 response.render("home",{data:noOfUsers});
			  });
		 
		});

		app.get("/joke",function(req,res){
             res.send(faker.lorem.paragraph());
		});

     app.get("/users",function(request,response){
		 var noOfUsers;
		 connection.query("SELECT COUNT(*) as total FROM users",function(error,result,field){
			if(error) throw error;
			 noOfUsers=result[0].total;
			 console.log(noOfUsers);
			 response.send("Totla number of users in System is "+noOfUsers);
			
		 });
		 connection.end();
		
		 
	 });

  app.post("/register",function(req,res){
	  var person ={email: req.body.email};
	
	      connection.query("INSERT INTO users SET?",person,function(error,results){
			  if (error) throw error;
			  res.redirect("/");
		  });
  });

 app.listen(8080,function(){
			console.log("Server running on 8080...");
			});