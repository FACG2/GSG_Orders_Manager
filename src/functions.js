const dateFormat = require('x-date');

const client = require('../database/db_connection.js');
//modify the require statment to correctly require the connection

const checkMemberCredits = (email, cb) => {
  const sql = {
    text: 'SELECT * FROM members where email= $1',
    values: [email]
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
const orderListObject=(today, cb)=>{
  let orderlistObj={};
  getOrderList(today , (err , res)=>{
    if(err){
      cb(err);
    }else{
        orderlistObj.state=res[0].state;
        orderlistObj.total=res[0].total;
        orderlistObj.id=res[0].id;
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
                cb(orderlistObj);
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
  genarateDmanId((err ,id)=>{
    if(err){

    }else {
      const sql = {
        text: 'INSERT INTO order_list (state, total, dman_id, dateorder) VALUES ($1, $2, $3, $4);',
        values: [true, 0, id, today]
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
  });
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
const getOrders=(orderListId , cb)=>{
  const sql = {
    text: 'SELECT name,foodtype, price, user_id FROM order_pp  JOIN members ON members.id = order_pp.user_id where orderlist=$1',
    values: [orderListId]
  }
  client.query(sql, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows)
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
const genarateDmanId = (cb)=> {
  const sql = {
    text: 'SELECT * FROM (SELECT * FROM members ORDER BY id LIMIT 9) AS random9 ORDER BY random() LIMIT 1;'
  }
  client.query(sql.text, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null ,res.rows[0].id)
    }
  })
}

genarateDmanId((err ,res)=>{
  console.log(res);
})
module.exports = {
  checkMemberCredits: checkMemberCredits,
  orderListObject: orderListObject
}
