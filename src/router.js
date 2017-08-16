const handlers = require('./handler.js');

const router = (req, res) => {
  // const url = req.url.split('/')[0];
  const url = '/' + req.url.split('/')[1];
let handle = {
    '/': handlers.home,
    '/public':handlers.publicHandler,
    '/login': handlers.login,
    '/newOrder': handlers.addOrder
  }[url];

 handle = handle ? handle : handlers.notFound;
 handle(req,res);
}

module.exports = router;
