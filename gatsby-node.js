require('ts-node').register({
    compilerOptions: {
        esModuleInterop: true,
        module: 'commonjs',
        target: 'esnext'
    }
})

exports.createPages = (...args) => require('./gatsby-node/index').createPages(...args)