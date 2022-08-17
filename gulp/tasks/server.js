export const server  = (done) => {
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.build.pug}`
        },
        notyfi: false,
        port: 3000,
    })
}