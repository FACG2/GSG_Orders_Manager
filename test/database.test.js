const test = require('tape');
const {
  checkMemberCredits
} = require('../src/functions.js');

test('Test login query', (t) => {
  const email = "iah-93@hotmail.com";
  checkMemberCredits(email, (err, data) => {
    if (err) {
      t.notOk(err);
    } else {

      t.equal(data.length, 1, 'should return one row');
      t.end();
    }
  })
});

// test('Testing the orderList Query',(t)=>{
//
// })
