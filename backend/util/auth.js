const jwt = require('jsonwebtoken');


module.exports = function auth(req, res, next) {
     let token = req.get('Authorization') || req.query.token || req.body.token;
     if (token) {
         token = token.replace('Bearer ', '');
         jwt.verify(token, 'ohhimark', (err, decoded) => {
             if (err) {
                 req.error = err
                 next();
             } else {
                 req.user = decoded.user;
                 next();
             }
         })
     } else {
         next();
     }
 }