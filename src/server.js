const http = require('http')
const router = require('./router.js')

var port = process.env.PORT || 4000
var host = process.env.HOST || 'localhost'


const server = http.createServer(router);
server.listen(port, function(){
console.log(`Server running on: http://${host}:${port}`);
});



switch (process.env.NODE_ENV) {
  case 'production':
    env={
      DB_URL='akjdhjaskdhkjasdsadkaskdnsadnkas';

    }
    break;
  default:
    require(env2)(env)
}
