const query=require('../database/db_connection.js');
//modify the require statment to correctly require the connection

const checkMemberCredits=(email , cb)=>{
  const sql=`SELECT * FROM members WHERE email = ${email}`;
  query(sql ,(data)=>{
    cb(data.rows);
  });

  


}
