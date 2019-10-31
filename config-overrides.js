const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require("path");

const enableRequireEnsure = () => config => {
    config.output.globalObject = 'this'
    //config.module.rules[0].parser.requireEnsure = true
    return config
}

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { 
            '@primary-color': '#F89F3C' 
        },
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, './src')
    }),
    enableRequireEnsure(),
);