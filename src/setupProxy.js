const proxy = require('http-proxy-middleware');


module.exports = function (app) {
   app.use(proxy('/webservice/rest', {
      target: "https://pimcore.idvxlab.com:7000",
      changeOrigin: true,
   })
   );
   app.use(proxy('/users', {
      target: "https://pimcore.idvxlab.com:7000",
      changeOrigin: true,
   })
   );
};

