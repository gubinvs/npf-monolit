import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';                                       // плагин для переименования файлов
import cleanCss from 'gulp-clean-css';                                  // плагин сжимает файлы  css
import webpcss from 'gulp-webpcss';                                     // вывод webp изображений
import autoprefixer from 'gulp-autoprefixer';                           // плагин добавляет вендерные префиксы
import groupCssMediaQueries from 'gulp-group-css-media-queries';        // группировка медиа запросов



const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isBuild }) // { sourcemaps: true } - включаем карту исходников, для того чтобы понимать где ошибка
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                massege: "Error: <%= error.massege %"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/'))       // Меняем на @img на img/
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
        )
        .pipe(                              // группировка медиа запросов для корректной работы необходимо установить  webp-converter@2.2.3
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )                           
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })               
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,            
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(                                                  // выгружаем не сжатый файл
            app.gulp.dest(app.path.build.css)
        )                
        .pipe(                                                  // сжимаем файл
            app.plugins.if(
                app.isBuild,        
                cleanCss()
            )
        )
        .pipe(                                                  // переименовываем сжатый файл css
            app.plugins.if(
                app.isBuild,            
                rename({                                          
                    extname: ".min.css"
                })
            )

        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());

}   