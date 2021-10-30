"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const php = require("gulp-connect-php");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// Load package.json for banner
const pkg = require("./package.json");

// Set the banner content
const banner = [
    "/*!\n",
    " * Symfony Website Base Template - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
    " * Copyright 2020-" + new Date().getFullYear(),
    " <%= pkg.author %>\n",
    " * Licensed under <%= pkg.license %> (https://github.com/rcostapr/<%= pkg.name %>/blob/master/LICENSE)\n",
    " */\n",
    "\n",
].join("");

// BrowserSync
function browserSync(done) {
    browsersync.init({
        proxy: "localhost:3003",
        baseDir: "./public",
        open: true,
        notify: false,
    });

    done();
}

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// BrowserSync php
function phpServer(done) {
    php.server({
        base: "./public",
        port: 3003,
        keepalive: true,
    });
    done();
}

// Clean vendor
function clean() {
    return del(["./public/js/vendor/", "./public/css/vendor/", "./css/vendor/", "./js/vendor/", "./scss/vendor/", "./css/*.min.css", "./public/css/*.min.css"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {

    // jQuery
    var jquery = gulp
        .src([
            "./node_modules/jquery/dist/*",
            "!./node_modules/jquery/dist/core.js",
            "!./node_modules/jquery/dist/*.slim.*",
            "!./node_modules/jquery/dist/*.min.*",
        ])
        .pipe(gulp.dest("./js/vendor/jquery"));

    // jQuery UI
    var jqueryui = gulp
        .src([
            "./node_modules/jquery-ui-dist/jquery-ui.js",
        ])
        .pipe(gulp.dest("./js/vendor/jqueryui"));
    // jQuery UI CSS
    var jqueryuiCss = gulp
        .src([
            "./node_modules/jquery-ui-dist/jquery-ui.css",
            "./node_modules/jquery-ui-dist/jquery-ui.theme.css",
        ])
        .pipe(gulp.dest("./css/vendor/jqueryui"));
    // jQuery UI IMAGES
    var jqueryuiImage = gulp
        .src(["./node_modules/jquery-ui-dist/images/*"])
        .pipe(gulp.dest("./public/css/vendor/images"));


    // Bootstrap JS
    var bootstrapJS = gulp
        .src("./node_modules/bootstrap/dist/js/bootstrap.bundle.js")
        .pipe(gulp.dest("./js/vendor/bootstrap"));

    var bootstrapCSS = gulp
        .src("./node_modules/bootstrap/scss/**/*")
        .pipe(gulp.dest("./scss/vendor/bootstrap"));

    // Font Awesome
    var fontAwesomeCSS = gulp
        .src("./node_modules/@fortawesome/fontawesome-free/css/*")
        .pipe(gulp.dest("./css/vendor/fortawesome"));
    var fontAwesomeWebFonts = gulp
        .src("./node_modules/@fortawesome/fontawesome-free/webfonts/*")
        .pipe(gulp.dest("./public/css/webfonts"));

    // ChartJS
    var chartJS = gulp
        .src(["./node_modules/chart.js/dist/Chart.bundle.js", "./node_modules/chartjs-plugin-annotation-fix/chartjs-plugin-annotation.js"])
        .pipe(gulp.dest("./js/vendor/chartjs"));

    var chartCSS = gulp
        .src("./node_modules/chart.js/dist/Chart.css")
        .pipe(gulp.dest("./js/vendor/chartjs"));

    // Toastr
    var toastrJS = gulp
        .src("./node_modules/toastr/toastr.js")
        .pipe(gulp.dest("./js/vendor/toastr"));
    var toastrCSS = gulp
        .src("./node_modules/toastr/toastr.scss")
        .pipe(gulp.dest("./scss/vendor/toastr"));

    // Sweetalert2
    var sweetalert2JS = gulp
        .src("./node_modules/sweetalert2/dist/sweetalert2.all.js")
        .pipe(gulp.dest("./js/vendor/sweetalert2"));
    var sweetalert2CSS1 = gulp
        .src("./node_modules/sweetalert2/src/*.scss")
        .pipe(gulp.dest("./scss/vendor/sweetalert2"));
    var sweetalert2CSS2 = gulp
        .src("./node_modules/sweetalert2/src/scss/*")
        .pipe(gulp.dest("./scss/vendor/sweetalert2/scss"));

    // Select2
    var select2JS = gulp
        .src("./node_modules/select2/dist/js/select2.full.js")
        .pipe(gulp.dest("./js/vendor/select2"));
    var select2CSS1 = gulp
        .src("./node_modules/select2/src/scss/**/*")
        .pipe(gulp.dest("./scss/vendor/select2"));
    var select2CSS2 = gulp
        .src(
            "./node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css"
        )
        .pipe(gulp.dest("./css/vendor/select2"));

    // Perfect Scrollbar
    var perfectScrollbarJS = gulp
        .src("./node_modules/perfect-scrollbar/dist/perfect-scrollbar.js")
        .pipe(gulp.dest("./js/vendor/perfect-scrollbar"));
    var perfectScrollbarCSS = gulp
        .src("./node_modules/perfect-scrollbar/css/perfect-scrollbar.css")
        .pipe(gulp.dest("./css/vendor/perfectScrollbar"));

    // DROPZONE
    var dropzoneJS = gulp
        .src("./node_modules/dropzone/dist/dropzone.js")
        .pipe(gulp.dest("./js/vendor/dropzone"));
    var dropzoneCSS = gulp
        .src("./node_modules/dropzone/dist/dropzone.css")
        .pipe(gulp.dest("./css/vendor/dropzone"));

    // dataTables
    var datatablesJS = gulp
        .src([
            "./node_modules/datatables.net/js/*.js",
            "!./node_modules/datatables.net/js/*min*",
            "./node_modules/datatables.net-bs4/js/*.js",
            "!./node_modules/datatables.net-bs4/js/*min*",
        ])
        .pipe(gulp.dest("./js/vendor/datatables"));
    var datatablesCSS = gulp
        .src([
            "./node_modules/datatables.net-bs4/css/*.css",
        ])
        .pipe(gulp.dest("./css/vendor/datatables"));


    return merge(
        jquery,
        jqueryui,
        jqueryuiCss,
        jqueryuiImage,
        bootstrapJS,
        bootstrapCSS,
        fontAwesomeCSS,
        fontAwesomeWebFonts,
        chartJS,
        chartCSS,
        toastrJS,
        toastrCSS,
        sweetalert2JS,
        sweetalert2CSS1,
        sweetalert2CSS2,
        select2JS,
        select2CSS1,
        select2CSS2,
        perfectScrollbarJS,
        perfectScrollbarCSS,
        dropzoneJS,
        dropzoneCSS,
        datatablesJS,
        datatablesCSS
    );
}

// JS Vendor Concat task ORDERED
function concatJsVendor() {
    return gulp
        .src([
            "./js/vendor/jquery/jquery.js",
            "./js/vendor/jqueryui/jquery-ui.js",
            "./js/vendor/bootstrap/bootstrap.bundle.js",
            "./js/vendor/toastr/toastr.js",
            "./js/vendor/sweetalert2/sweetalert2.all.js",
            "./js/vendor/select2/select2.full.js",
            "./js/vendor/perfect-scrollbar/perfect-scrollbar.js",
            "./js/vendor/dropzone/dropzone.js",
            "./js/vendor/datatables/dataTables.bootstrap4.js",
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('blundle.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./public/js/vendor"));
}

// SCSS task
function compileScssVendor() {
    return gulp
        .src(["./scss/vendor/**/*.scss"])
        .pipe(plumber())
        .pipe(
            sass({
                outputStyle: "expanded",
                includePaths: "./node_modules",
            })
        )
        .on("error", sass.logError)
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(gulp.dest("./css/vendor"));
}

// CSS concat task
function concatCssVendor() {
    return gulp
        .src([
            "./css/vendor/**/*.css",
            "!./css/vendor/**/*.min.css",
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('blundle.css'))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css/vendor'));
}

// SCSS Website Style
function compileScssSytle() {
    return gulp
        .src(["./scss/*.scss"])
        .pipe(plumber())
        .pipe(
            sass({
                outputStyle: "expanded",
                includePaths: "./node_modules",
            })
        )
        .on("error", sass.logError)
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(gulp.dest("./css"))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(cleanCSS())
        .pipe(gulp.dest("./public/css"))
        .pipe(browsersync.stream());
}


// JS task
function compileLibrary() {
    return gulp
        .src(["./js/library.js"])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(
            header(banner, {
                pkg: pkg,
            })
        )
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./public/js"))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch("./scss/*", gulp.series(compileScssSytle));
    gulp.watch(["./js/*"], gulp.series(compileLibrary));
    gulp.watch("./src/**/*", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(modules, concatJsVendor, compileScssVendor, concatCssVendor);
const build = gulp.series(compileScssSytle, compileLibrary);
const compile = gulp.series(clean, gulp.parallel(vendor, build));
const watch = gulp.parallel(watchFiles, phpServer, browserSync);


// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.compile = compile;
exports.watch = watch;
exports.default = build;


