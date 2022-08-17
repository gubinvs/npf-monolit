import webp from 'gulp-webp';           // плагин создает картинки в формате  webp
import imagemin from 'gulp-imagemin';   // плагин сжимает картинки


export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "IMAGES",
                    massege: "Error: <%= error.massege %"
                }))
        )
        
        .pipe(app.plugins.newer(app.path.build.images))     // Проверяем плагиным какие картинки есть в папке с результатом
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp()
            )
        )
        .pipe(                                              // выгружаем изображения в папку проекта
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )         
        .pipe(                                              // опять смотрим на файлы исходники
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)
            )
        )            
        .pipe(                                              // и опять проверяем их на изменение
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)
            )
        )     
        .pipe(                                              // сжимаем картинки
            app.plugins.if(
                app.isBuild,
                imagemin({                                    
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3 // 0 to 7
                })               
            )
        )
        .pipe(app.gulp.dest(app.path.build.images))         // переносим готовый файл в папку с проектом
        .pipe(app.gulp.src(app.path.src.svg))               // ищем в папке svg файлы
        .pipe(app.gulp.dest(app.path.build.images))         // переносим svg файлы в папку с проектом
        .pipe(app.plugins.browsersync.stream())             // подключаем плагин для отслеживания изменений в файле
} 