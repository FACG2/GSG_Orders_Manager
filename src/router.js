const handlers = require('./handler.js');

const router = (req, res) => {
  // const url = req.url.split('/')[0];
  const url = '/' + req.url.split('/')[1];
<<<<<<< HEAD
  console.log(url);

=======
>>>>>>> 6366cb51b763d32b1a3a9af8d1f0b5ad0d9e226d
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
