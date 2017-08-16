const handlers = require('./handler.js');

const router = (req, res) => {
  // const url = req.url.split('/')[0];
  const url = '/' + req.url.split('/')[1];
  console.log(url);

let handle = {
    '/': handlers.home,
    '/public':handlers.publicHandler,
    '/login': handlers.login,
    '/newOrder': handlers.createOrder
  }[url];

 handle = handle ? handle : handlers.notFound;
 handle(req,res);
}

module.exports = router;
