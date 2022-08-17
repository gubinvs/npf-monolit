//-- Импортируем модуль определения текущей папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve()); 

const buildFolder = `./Compiled`;
const srcFolder = `./src`;

//-- Массив с данными о путях
export const path = {
    build: {                                        // путь куда следует переносить:
        js: `${buildFolder}/js/`,                   // файлы js
        images: `${buildFolder}/img/`,              // файлы img
        css: `${buildFolder}/css/`,                 // файл style.css
        pug: `${buildFolder}/`,                    // файлы из под pug
        html: `${buildFolder}/`,                    // файлы html
        files: `${buildFolder}/files/`,              // остальные файлы
        fonts: `${buildFolder}/fonts/`
    },
    src: {                                          // какие файлы следует переносить при сборке проекта и куда
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/style.css`,
        pug: `${srcFolder}/*.pug`,                 
        // html: `${srcFolder}/*.html`,             // для работы без препроцессора pug
        files: `${srcFolder}/files/**/*.*`
    },
    watch: {                                        // изменение каких файлов следует отслеживать
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        scss: `${srcFolder}/scss/*.scss`,
        pug: `${srcFolder}/**/*.pug`,              
        // html: `${srcFolder}/**/*.html`,          // для работы без препроцессора pug 
        files: `${srcFolder}/files/**/*.*`  
    },
    clean: buildFolder,                             // какую папку следует удалять
    buildFolder: buildFolder,                       // переменная с путем к папке для переноса файлов
    srcFolder: srcFolder,                           // переменная с путем для отслеживания изменяемых файлов
    rootFolder: rootFolder,                         // переменная с путем основной папки проекта
}