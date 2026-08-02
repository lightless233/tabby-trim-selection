const path = require('node:path')

module.exports = {
    target: 'node',
    entry: './src/index.ts',
    context: __dirname,
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                },
            },
        ],
    },
    externals: [
        /^@angular\//,
        /^rxjs/,
        /^tabby-/,
    ],
}
