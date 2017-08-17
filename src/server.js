const http = require('http')
const router = require('./router.js')
const env=require('env2');
var port = process.env.PORT || 4000
var host = process.env.HOST || 'localhost'

const server = http.createServer(router);
server.listen(port, function(){
console.log(`Server running on: http://${host}:${port}`);
});
