const dateFormat = require('x-date');

const client = require('../database/db_connection.js');
//modify the require statment to correctly require the connection

const checkMemberCredits = (body, cb) => {
  const sql = {
    text: 'SELECT * FROM members where email= $1 and name=$2',
    values: [body.email,body.name ]
  }
  client.query(sql, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows)
    }
  })
  //closing the pool after finshing
}


const getOrders=(orderListId , cb)=>{
  const sql = {
    text: 'SELECT * FROM order_pp WHERE orderlist=$1',
    values: [orderListId]
  }
  client.query(sql, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null,res.rows)
    }
  })
}
const getDeleverManName=(DmanId ,cb)=>{
  const sql = {
    text: 'SELECT * FROM members WHERE id=$1',
    values: [DmanId]
  }
  client.query(sql, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows)
    }
  })
}


const getOrderList=(today , cb)=>{
  const sql = {
    //SELECT state , total , name as member ,type, price ,dman_id  FROM order_pp join order_list ON order_pp.orderlist = order_list.id JOIN members ON members.id = order_pp.user_id  where order_list.id
    text: 'SELECT * FROM order_list WHERE DateOrder=$1',
    values: [today]
  }
  client.query(sql, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows)
    }
  })
}




const orderListObject=(today, cb)=>{
  let orderlistObj={};
  getOrderList(today , (err , res)=>{
    if(err){
      cb(err);
    }else{
        orderlistObj.state=res[0].state;
        orderlistObj.total=res[0].total;

        getDeleverManName(res[0].dman_id ,(err , name)=>{
          if(err){
            cb(err)
          }else{
            orderlistObj.Dman=name[0].name;
            getOrders(res[0].id, (err ,olist)=>{
              if(err){
                cb(err)
              }else{
                orderlistObj.orders=olist;
                cb(null,orderlistObj);
              }
            })
          }
        })
    }
  })
}


const checkOrderList = (today, cb) =>{
  getOrderList(today, (err, res) =>{
    if (err){
      cb(err)
    } else {
      if (res[0] !== null) {
        orderListObject(today, (err, object)=>{
          if(err){
            cb(err)
          }else{
            cb(null, object);
          }
        })
      } else {
        createOrderList(today, (err, object)=>{
          if(err){
            cb(err)
          }else{
            cb(null, object)
          }
        })
      }
    }
  })
}

const createOrderList = (today, cb) =>{
  const sql = {
    text: 'INSERT INTO order_list (state, total, dman_id, dateorder) VALUES ($1, $2, $3, $4);',
    values: [true, 0, genarateDmanId(), today]
  }
  client.query(sql ,(err ,data)=>{
    if (err) {
      cb(err)
    } else {
      orderListObject(today, (err, object) =>{
        if (err) {
          cb(err)
        } else {
          cb(null, object)
        }
      })
    }
  })
}



const addOrder =(listId , newType, userID, newPrice, cb) => {
  const sql = {
    text : 'INSERT INTO  order_pp (type, price,user_id, orderlist) VALUES ($1, $2,$3, $4)',
    values: [newType , newPrice, userID,listId]
  }
  client.query(sql, (err, res) => {
    if (err){
      cb(err)
    }
    else {
      const check =res ? true :false;
      cb(null,{state:[check]})
    }
      // console.log(res.rows);
    });
}
module.exports = {
  checkMemberCredits: checkMemberCredits,
  orderListObject: orderListObject,
  getOrderList:getOrderList,
  getDeleverManName:getDeleverManName,
  getOrders:getOrders,
  addOrder:addOrder
}
