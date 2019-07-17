const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: "@import '~@/styles/mixins', '~@/styles/variables';"
            }
        }
    },
    assetsDir: 'static',
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@core', resolve('src/components'))
            .set('services', resolve('src/services'));
    },
    devServer: {
        after: require('./mock/server.js'),
        proxy: {
            // '/game': {
            //     target: 'http://120.197.130.114:8889',
            //     ws: false,
            //     changeOrigin: false
            // }
            '/game': {
                target: 'http://w8gbyz.natappfree.cc'
            },
            '/WebGL': {
                target: 'http://172.16.9.110:8082'
            }
        }
    }
};
