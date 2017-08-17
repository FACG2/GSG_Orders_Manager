const util = require('util');
const test = require('tape');
const {
  checkMemberCredits,
  getOrderList,
  getDeleverManName,
  getOrders,
  orderListObject,
  addOrder
} = require('../src/functions.js');

test('Test login query', (t) => {
  const email = "iah-93@hotmail.com";
  checkMemberCredits(email, (err, data) => {
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data.length, 1, 'should return one row');
      t.equal(data[0].name,'Eslam Hugair', 'should return the name')
      t.end();
    }
  })
});

test('Testing the orderList Query',(t)=>{
  getOrderList(8,(err , data)=>{
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data.length , 3 , 'Object length Should be the same as queried ')
      t.end();
    }
  })
});
test('Testing the getDeleverManName function Query',(t)=>{
  getDeleverManName(3,(err , data)=>{
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data[0].name , 'Qamar Alfalojy' , 'Object id Should be the same as queried ')
      t.end();
    }
  })
});
//getOrders
test('Testing the getOrders function Query',(t)=>{
  getOrders(1,(err , data)=>{
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data.length ,21, 'Object length Should be the same as the number of the orders ')
      t.end();
    }
  })
});
///////Testing orderListObject
test('Testing the orderListObject function Query',(t)=>{
  orderListObject(8,(err , data) => {
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data.state ,false , 'should return an Object that contains Four orders in orders propartys')
      t.end();
    }
  })
});

///////////////// Testing addOrder
test('Testing the getOrders function Query',(t)=>{
  let dataLength=0;
  getOrders(2,(err , data)=>{
    if (err) {
      t.notOk(err);
    } else {
      dataLength=data.length;
    }
  addOrder(2,'sandwich',4,11, (err,res)=>{
    if(err){
      t.notOk(err);
    }
    else {
      getOrders(2,(err , data2)=>{
        if (err) {
          t.notOk(err);
        } else {
      t.equal(data2.length,dataLength+1,'The new length should be greater by 1');
      t.end();
    }
  });
}
});
  });
});
