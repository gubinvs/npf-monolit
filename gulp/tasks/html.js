// плагин для сборки html файлов
import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";       // плагин преобразовывает картинки в формат webp (делает их маленькими)
import versionNumber from "gulp-version-number";        // плагин для сброса кеширования файлов браузером
import pug from "gulp-pug";                             // импортируем плагин pug

// Создаю Task для копирования файлов при сборке проекта в папку для продакшена
export const html = () => {
    return app.gulp.src(app.path.src.pug)
        .pipe(app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "HTML",
                    massege: "Error: <%= error.massege %"
                }))
        )
        // .pipe(fileinclude())                             // Если работаем с pug файлами, то этот плагин не нужен
        .pipe(pug({
            // Сжатие  HTML файлов
            pretty: true,
            // Показывать в терминале какой файл обработан
            verbose: true
        }))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))       // Меняем на @img на img/
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )                                  
        )
        .pipe(app.gulp.dest(app.path.build.pug))         // переносим готовый html файл в папку с проектом
        .pipe(app.plugins.browsersync.stream())           // подключаем плагин для отслеживания изменений в файле
} 