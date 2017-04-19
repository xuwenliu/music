var express = require('express');

var app = express();

app.get('/api/list',function(req,res){
   res.json({"code":0,lists:[
		{img:"../img/indexImg/1.jpg",title:"Sara"},
		{img:"../img/indexImg/2.jpg",title:"Kiki"}, 
		{img:"../img/indexImg/3.jpg",title:"Nancy.z"},                  
		{img:"../img/indexImg/4.jpg",title:"Moon.z"},
		{img:"../img/indexImg/5.jpg",title:"叶子子"},
		{img:"../img/indexImg/6.jpg",title:"Bread"},
		{img:"../img/indexImg/7.jpg",title:"Dane Ram"}
       
  ]})
})


app.listen('8080');