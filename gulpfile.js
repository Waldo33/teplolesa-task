const {src, dest, series, watch} = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);
const csso = require('gulp-csso')
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

const del = require('del');

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function images() {
    return src('src/images/**')
        .pipe(dest('dist/images'))
}

function fonts() {
    return src('src/fonts/**')
        .pipe(dest('dist/fonts'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/images/**', series(images)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, images, fonts)
exports.serve = series(clear, scss, html, images, fonts, serve)
exports.clear = clear