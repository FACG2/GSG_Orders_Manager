const client=require('../database/db_connection.js');
//modify the require statment to correctly require the connection

const checkMemberCredits=(email , cb)=>{
  const sql = {
    text: 'SELECT * FROM members where email= $1',
    values: [email]
  }
client.query(sql , (err ,res)=>{
  if(err){
    cb(err)
  }else{
    cb(null , res.rows)
  }
})
//closing the pool after finshing
client.end();
}

module.exports={
  checkMemberCredits:checkMemberCredits
}
