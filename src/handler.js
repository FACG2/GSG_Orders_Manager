const fs = require('fs');
const path = require('path');
const {checkMemberCredits}=require('./functions.js')
const home = (req,res) => {
      fs.readFile(path.join(__dirname,'..','public','index.html'),(err,data) =>{
        if(err){
          res.writeHead(404, {'content-type':'text/plain'});
          res.end('Page Not Found');
        }
        else {
          res.writeHead(200, {'content-type': 'text/html'});
          res.end(data);
        }
      });
}

const publicHandler = (req, res) => {
    let ext = req.url.split('.')[1];
    console.log(path.join(__dirname, '..', req.url));
    fs.readFile(path.join(__dirname, '..', req.url), (error, data) => {
        if (error) {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('Page Not Found');
        } else {
            res.writeHead(200, {'content-type': 'text/' + ext});
            res.end(data);
        }
    });
}

const login=(req ,res)=>{
    //checkMemberCredits a function inside function.js file the make aquire to
    //checke if the member exist and return true or fals
    checkMemberCredits(email, (isExist)=>{
      if(isExist){
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({ state : isExist}));
      }
      else {
        res.writeHead(404, {'content-type': 'application/json'});
        res.end(JSON.stringify({ state : isExist}));
      }
    });

  }

const notFound = (req,res) => {
  res.writeHead(404, {'content-type': 'text/plain'});
  res.end('Page Not Found');
}
// const login = (req,res) => {
//
// }



module.exports = {
  home:home,
  publicHandler:publicHandler,
  notFound:notFound
// login:login,
// addOrder:addOrder,
};
