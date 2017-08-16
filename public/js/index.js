(function(){
  //{state:true , total : 2 , Dman:'Mahmoud' , orders:[ order ,order ,order ... order ] , error=true , error_message: 'Wrong User Name'}
document.getElementById('login').addEventListner('click',(event)=>{
  const body={
    email:document.getElementById('email').value,
    name:document.getElementById('name')
  }
  checklogin()

})


})()
