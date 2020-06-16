const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

const env = process.env.NODE_ENV
console.info(`env: ${env}`)
// const publicPath = env === 'production' ? '/vr' : '/'
const publicPath = '/'
const proxyTarget = process.env.VUE_APP_BASE_API

module.exports = {
    assetsDir: 'assets',
    publicPath,
    chainWebpack: config => {
        config.resolve.alias
            .set('@less', path.resolve(__dirname, 'src/assets/less/'))
            .set('@images', path.resolve(__dirname, 'src/assets/images/'))
            .set('@fonts', path.resolve(__dirname, 'src/assets/fonts/'))
            .set('@com', path.resolve(__dirname, 'src/components'))
    },
    configureWebpack: config => {
        // const plugins = [
        //     new webpack.ProvidePlugin({
        //         FroalaEditor: 'froala_editor.min.js'
        //     })
        // ]
        if (process.env.NODE_ENV === 'production') {
            // plugins.push(
            //     new CompressionPlugin({
            //         test: /\.js$|\.html$|\.css/,
            //         threshold: 10240,
            //         deleteOriginalAssets: false
            //     })
            // )
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
        // return plugins
    },
    css: {
        loaderOptions: {
            less: {
                // data: `@import "@less/_variables.less";@import "@less/_mixins.less";`,
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        // host: '127.0.0.1',
        port: 6010,
        proxy: {
            '/apiv1': {
                target: proxyTarget,
                changeOrigin: true,
                secure: false,
                onProxyReq: request => {
                    request.setHeader('origin', proxyTarget)
                }
            }
        }
    }
}
