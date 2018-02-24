const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('copyrightDate',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('uppercase',(text)=>{
  return text.toUpperCase();
});

//middle ware
app.use((req,res,next)=>{
  console.log(`${req.method}`);
  var log = `method: ${req.method} request: ${req.url}`
  fs.appendFile('server.log',log+'\n');
  next();
});
//get request
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'This is about page',
    copyright:new Date().getFullYear()
  });
});
app.get('/about',(req,res)=>{
  res.send({
    ali:'working',
    saheb:[
      'he is not a good prrson',
      'only name is saheb'
    ]
  });
});
app.get('/abouts',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'This is about page',
    copyright:new Date().getFullYear()
  });
});
app.listen(port,()=>{
  console.log('server is up on the port 3000');
});
