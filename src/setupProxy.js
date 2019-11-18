const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/webservice', {
            target: 'https://pimcore.idvxlab.com:7000',
            changeOrigin: true,
            // pathRewrite: {   
            //     '^/api': ''
            // }
        })
    )
}
