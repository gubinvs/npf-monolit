import webpack from "webpack-stream";



export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isBuild }) // { sourcemaps: true } - включаем карту исходников, для того чтобы понимать где ошибка
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                massege: "Error: <%= error.massege %"
            }))
        )
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))

        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
} 