const fs = require('fs');
const path = require('path');
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
