require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'esnext'
    }
})

exports.createPages = (...args) => require('./gatsby-node/index').createPages(...args)