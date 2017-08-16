const client = require('../database/db_connection.js');
//modify the require statment to correctly require the connection

const checkMemberCredits = (email,name ,cb) => {
  const sql = {
    text: 'SELECT * FROM members where email= $1 and name=$2',
    values: [email,name ]
  }
  client.query(sql, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows)
    }
  });
  //closing the pool after finshing

}
const orderListObject=(orderListId, cb)=>{
  let orderlistObj={};
  getOrderList(orderListId , (err , res)=>{
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
            getOrders(orderListId , (err ,olist)=>{ ////////
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
const getOrderList=(id , cb)=>{
  const sql = {
    //SELECT state , total , name as member ,type, price ,dman_id  FROM order_pp join order_list ON order_pp.orderlist = order_list.id JOIN members ON members.id = order_pp.user_id  where order_list.id
    text: 'SELECT * FROM order_list WHERE id=$1',
    values: [id]
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
    text: 'INSERT INTO order_list (state, total, dman_id, dateorder) VALUES ($1, $2, $3, $4);',
    values: [true, 0, genarateDmanId(), today]
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
module.exports = {
  checkMemberCredits: checkMemberCredits,
  orderListObject: orderListObject,
  getOrderList:getOrderList
}
