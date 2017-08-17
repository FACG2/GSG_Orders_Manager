const fs = require('fs');
const path = require('path');
const {checkMemberCredits,
getOrderList,
getDeleverManName,
getOrders,
orderListObject,
addOrder}=require('./functions.js')
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
    //checke if the member exist and return true or false
    let data='';
    req.on('data', function(chunk) {
        data+=chunk;
    });
    req.on('end',() => {

      if(data){
      data=JSON.parse(data);
    const today= new Date().format('mm-dd');
    checkMemberCredits(data, (isExist)=>{
      if(isExist){
        checkOrderList(today, (err ,list)=>{
          if(err){
              res.writeHead(500, {'content-type': 'text/plain'});
              res.end('NOT Found');
          }else {
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(list));
            }
        });}
      else {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('User Not Found');
      }
    });

  }
    else {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('Page Not Found');
    }
});}

const notFound = (req,res) => {
  res.writeHead(404, {'content-type': 'text/plain'});
  res.end('Page Not Found');
}
// (listId , newType, userID, newPrice, cb) =>
const createOrder = (req,res) =>{
    let orderData=  '';
    req.on('data', function(dataChunks){
      orderData+= dataChunks;
    });
    if(orderData){
    req.on('end', ()=>{
      orderData=JSON.parse(orderData);
      addOrder(orderData.orderlist, orderData.foodtype, orderData.user_id , orderData.price, (err,res) =>{
        if(err){
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        }else {
          if(res.check){
            res.writeHead(200, {'content-type': 'application/json'});
            res.end('Added successfully');
          }
          else{
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('Adding failed');
          }

        }

      });
    })}
    else {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('Page Not Found');
    }
}


module.exports = {
  home:home,
  publicHandler:publicHandler,
  notFound:notFound,
  login:login
  createOrder:createOrder,
};
