(function(){
  //{state:true , total : 2 , Dman:'Mahmoud' , orders:[ order ,order ,order ... order ] , error=true , error_message: 'Wrong User Name'}
document.getElementById('login').addEventListner('click',(event)=>{
  var x = document.getElementById("usersName");
  const body={
    email:document.getElementById('email').value,
    name:x.options[x.selectedIndex].textContent
  }
  checklogin(body , function(err , orderList){
    if(err){
      console.log('error in connection');
    }else{
      renderOrderList(orderList);
    }
    })

})


function renderOrderList(orderList){
  //update the state
  //Delevery man
  //update the error state
  //update the order list

  //orders-list
  var orderL=document.getElementById('orders-list');
  var tr=document.createElement('tr');
  var td=document.createElement('td');

  orderList.orders.map((order)=>{
    tr
  })
}


})()
