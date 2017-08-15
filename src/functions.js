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
const getOrderList=(id , cb)=>{
  const sql = {
    text: 'SELECT state , total , name as member ,type, price ,dman_id  FROM order_pp join order_list ON order_pp.orderlist = order_list.id JOIN members ON members.id = order_pp.user_id  where order_list.id=$1',
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
const orderListObject=(res , cb)=>{
  // let result= {
  //   state: res.filter((one)=> return one.state),
  //   total:res.filter((one)=> return one.total) ,
  //   DelvMan_id:
  //   orders : res,
  //
  // };
  //
  // cb(result)
}
module.exports = {
  checkMemberCredits: checkMemberCredits,
  getOrderList: getOrderList
}
