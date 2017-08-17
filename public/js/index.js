(function(){
  //{state:true ,orderlist_id:33 , loginState:true, total : 2 , Dman:'Mahmoud' , orders:[ order ,order ,order ... order ] , error=true , error_message: 'Wrong User Name'}



document.getElementById('login').addEventListener('click', (event) => {

  // expected data shap;
  // responce = { login : true ,
    //resBody: { } ,
    //message: 'Successfull login' }
    var x = document.getElementById("usersName");
    const name_email={
      email:document.getElementById('email').value,
      name:x.options[x.selectedIndex].textContent
    }

    login(name_email ,(err, responce) => {
      if (err) {
        //handle the error - Print it to the user
        errorHandler(err, 'login state');
      } else {
        //dom the data
        responce = JSON.parse(responce);
        if(responce.loginState === true){
          //on Login Success
          renderOrderList(responce);
        }else{
          //on Login Fails
          loginError(err ,responce.error_message);
        }

      }
    })
  })


function loginError(err , message){
  var login_state=document.getElementById('loginState');
  login_state.textContent=message;
}

function renderOrderList(responce){
    var state=document.getElementById('oState');
    var DeleveryMan=document.getElementById('DMan');
    var ordersTable=document.getElementById('ordersTable');
    state.textContent=responce.resBody.state ? 'Active' : 'Finshed';
    DeleveryMan.textContent=responce.resBody.Dman;

    var total = 0 ;
    var NameRow=document.createElement('tr');
    var TypeRow=document.createElement('tr');
    var PriceRow=document.createElement('tr');
    var totalval= document.createElement('span');

    responce.resBody.orders.forEach(function(order){
        NameRow.textContent = order.name;
        TypeRow.textContent = order.type;
        PriceRow.textContent = order.price;
        total += order.price;
        totalval.textContent = total;
        ordersTable.appendChild(NameRow);
        ordersTable.appendChild(TypeRow);
        ordersTable.appendChild(PriceRow);
        ordersTable.appendChild(totalval);
  });

}
function errorHandler(err, mag) {
  alert('error from index.js' + err + mag)
}

// //check state every 5 minutes
// setInterval(function(){
// checkState(function(err ,state){
//   if(err){
//     console.log('Something went Wrong!')
//   }else{
//     updateState(state);
//   }
// })
// } , 5000);

// function updateState(state){
//   document.getElementById('oState').textContent =state ? 'Active' : 'Finshed';
// }


})()
