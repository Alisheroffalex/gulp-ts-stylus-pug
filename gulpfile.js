const { src, dest, watch } = require('gulp')
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const typescript = require('gulp-typescript')

const browsersync = require('browser-sync').create()

const srcDir = './src'
const distDir = './dist'

const input = {
    pages: `${srcDir}/pages`,
    styles: `${srcDir}/styles`,
    scripts: `${srcDir}/scripts`
}

const output = {
    styles: `${distDir}/styles`,
    scripts: `${distDir}/scripts`
}

function pages() {
    return src(`${input.pages}/*.pug`)
        .pipe(pug({
            pretty: true
            
        }))
        .pipe(dest(distDir))
        .pipe(browsersync.stream())
}

function styles() {
    return src(`${input.styles}/*.styl`)
        .pipe(stylus())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true,
            flexbox: true
        }))
        .pipe(dest(output.styles))
        .pipe(browsersync.stream())
}

function scripts() {
    return src(`${input.scripts}/*.ts`)
        .pipe(typescript())
        .pipe(dest(output.scripts))
        .pipe(browsersync.stream())
}

function watching() {
    browsersync.init({
        server: {
            baseDir: distDir
        }
    })

    watch(`${input.pages}/**/*.pug`, pages)
    watch(`${input.styles}/**/*.styl`, styles)
    watch(`${input.scripts}/**/*.ts`, scripts)


    watch(`${input.pages}/**/*.pug`).on('change', browsersync.reload)
    watch(`${input.styles}/**/*.styl`).on('change', browsersync.reload)
    watch(`${input.scripts}/**/*.ts`).on('change', browsersync.reload)
}


exports.watch = watching
exports.default = watching