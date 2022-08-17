import replace from "gulp-replace";
import plumber from "gulp-plumber";                 // Обработчик ошибок
import notify from "gulp-notify";                   // Подсказчик об ошибках
import browsersync from "browser-sync";             // Встроеннай сервер
import newer from "gulp-newer";                     // Плагин проверяет обновления картинок
import ifPlagin from "gulp-if";                           // Плагин условного ветвления

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlagin
}