// (function(){
//
//
// })()

// tow requests:
// 1- request('/login')= >checklogin => return orderList if login success or  return User Not Found Message
// {state:true , total : 2 , Dman:'Mahmoud' , orders:[ order ,order ,order ... order ]}
//2- request('/newOrder') => {state : true} or { state : false}

//login
// checkState()
//addOrder()


function login(credits , fitcher){
  // creditd = { name: 'any name' , email: 'aya email'}
  var url='./login';
  var payLoad = JSON.stringify(credits);
  _request(url , payLoad ,function(err , data){
    if(err){
      fitcher(err)
    }else{
      fitcher(null , data);
    }
  })
}

function addOrder(orderDetails , fitcher){
  // creditd = { name: 'any name' , email: 'aya email'}
  var url='./newOrder';
  var payLoad = JSON.stringify(orderDetails);
  _request(url , payLoad ,function(err , data){
    if(err){
      fitcher(err)
    }else{
      fitcher(null , data);
    }
  })
}


function  _request(url ,payLoad ,comingData){
  const xhr= new XMLHttpRequest();
  xhr.onreadystatechange =function(){
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText)
        comingData(null ,data);
      }else {
        comingData(xhr.status);
      }
      }
       xhr.open('POST',url,true)
       xhr.send(payLoad);
     }
