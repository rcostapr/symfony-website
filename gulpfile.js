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
    return del(["./public/js/vendor/", "./public/css/vendor/", "./css/vendor/", "./js/vendor/", "./scss/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
    // Bootstrap JS
    var bootstrapJS = gulp
        .src("./node_modules/bootstrap/dist/js/*")
        .pipe(gulp.dest("./js/vendor/bootstrap"));
    // Bootstrap SCSS
    var bootstrapSCSS = gulp
        .src("./node_modules/bootstrap/scss/**/*")
        .pipe(gulp.dest("./scss/vendor/bootstrap"));

    // ChartJS
    var chartJS = gulp
        .src("./node_modules/chart.js/dist/*.js")
        .pipe(gulp.dest("./js/vendor/chartjs/chart.js"));

    // Toastr
    var toastr = gulp
        .src("./node_modules/toastr/build/*.js")
        .pipe(gulp.dest("./js/vendor/toastr"));
    // Toastr SCSS
    var toastrSCSS = gulp
        .src("./node_modules/toastr/*.scss")
        .pipe(gulp.dest("./scss/vendor/toastr"));

    // Sweetalert2
    var sweetalert2 = gulp
        .src("./node_modules/sweetalert2/dist/*.js")
        .pipe(gulp.dest("./js/vendor/sweetalert2"));
    // Sweetalert SCSS
    var sweetalertSCSS = gulp
        .src("./node_modules/sweetalert2/src/*.scss")
        .pipe(gulp.dest("./scss/vendor/sweetalert2"));
    // Sweetalert2 SCSS
    var sweetalert2SCSS = gulp
        .src("./node_modules/sweetalert2/src/scss/*")
        .pipe(gulp.dest("./scss/vendor/sweetalert2/scss"));

    // Select2
    var select2 = gulp
        .src("./node_modules/select2/dist/js/*.js")
        .pipe(gulp.dest("./js/vendor/select2/select2"));
    // Select2 SCSS
    var select2SCSS = gulp
        .src("./node_modules/select2/src/scss/**/*")
        .pipe(gulp.dest("./scss/vendor/select2/scss"));
    // Select2 css
    var select2CSS = gulp
        .src(
            "./node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"
        )
        .pipe(gulp.dest("./css/vendor/select2"));

    // Perfect Scrollbar
    var perfectScrollbarCSS = gulp
        .src("./node_modules/perfect-scrollbar/css/perfect-scrollbar.css")
        .pipe(gulp.dest("./css/vendor/perfectScrollbar"));
    var perfectScrollbar = gulp
        .src("./node_modules/perfect-scrollbar/dist/*")
        .pipe(gulp.dest("./js/vendor/perfect-scrollbar"));

    // DROPZONE
    var dropzoneCSS = gulp
        .src("./node_modules/dropzone/dist/min/dropzone.min.css")
        .pipe(gulp.dest("./css/vendor/dropzone"));

    var dropzone = gulp
        .src("./node_modules/dropzone/dist/min/dropzone.min.js")
        .pipe(gulp.dest("./js/vendor/dropzone"));

    // dataTables
    var dataTables = gulp
        .src([
            "./node_modules/datatables.net/js/*.js",
            "./node_modules/datatables.net-bs4/js/*.js",
        ])
        .pipe(gulp.dest("./js/vendor/datatables"));

    // dataTables CSS
    var dataTablesCss = gulp
        .src([
            "./node_modules/datatables.net-bs4/css/*.css",
        ])
        .pipe(gulp.dest("./css/vendor/datatables"));

    // Font Awesome
    var fontAwesome = gulp
        .src("./node_modules/@fortawesome/fontawesome-free/css/*")
        .pipe(gulp.dest("./css/vendor/fortawesome"));

    // Font Awesome WebFont
    var fontAwesomeWebFont = gulp
        .src("./node_modules/@fortawesome/fontawesome-free/webfonts/*")
        .pipe(gulp.dest("./public/css/webfonts"));

    // jQuery
    var jquery = gulp
        .src([
            "./node_modules/jquery/dist/*",
            "!./node_modules/jquery/dist/core.js",
        ])
        .pipe(gulp.dest("./js/vendor/jquery"));

    // jQuery UI
    var jqueryui = gulp
        .src([
            "./node_modules/jquery-ui-dist/jquery-ui.min.js",
        ])
        .pipe(gulp.dest("./js/vendor/jqueryui"));
    // jQuery UI CSS
    var jqueryuiCss = gulp
        .src([
            "./node_modules/jquery-ui-dist/jquery-ui.min.css",
            "./node_modules/jquery-ui-dist/jquery-ui.theme.min.css",
        ])
        .pipe(gulp.dest("./css/vendor/jqueryui"));
    // jQuery UI IMAGES
    var jqueryuimage = gulp
        .src(["./node_modules/jquery-ui-dist/images/*"])
        .pipe(gulp.dest("./public/css/vendor/images"));


    return merge(
        bootstrapJS,
        bootstrapSCSS,
        chartJS,
        dataTables,
        dataTablesCss,
        fontAwesome,
        fontAwesomeWebFont,
        jquery,
        jqueryui,
        jqueryuiCss,
        jqueryuimage,
        toastr,
        toastrSCSS,
        sweetalert2,
        sweetalertSCSS,
        sweetalert2SCSS,
        select2,
        select2SCSS,
        select2CSS,
        dropzone,
        dropzoneCSS,
        perfectScrollbarCSS,
        perfectScrollbar,
    );
}

// SCSS task
function scss() {
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
        .pipe(gulp.dest("./css/vendor"))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(cleanCSS())
        .pipe(gulp.dest("./css/vendor"))
        .pipe(browsersync.stream());
}

// TODO
// SCSS Website Style
function style() {
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

// CSS concat task
function css() {
    return gulp
        .src([
            "./css/vendor/jqueryui/jquery-ui.min.css",
            "./css/vendor/jqueryui/jquery-ui.theme.min.css",
            "./css/vendor/bootstrap/bootstrap.min.css",
            "./css/vendor/fortawesome/all.min.css",
            "./css/vendor/toastr/toastr.min.css",
            "./css/vendor/sweetalert2/sweetalert2.min.css",
            "./css/vendor/select2/select2-bootstrap4.min.css",
            "./css/vendor/perfectScrollbar/perfect-scrollbar.css",
            "./css/vendor/dropzone/dropzone.min.css",
            "./css/vendor/datatables/dataTables.bootstrap4.min.css"

        ])
        .pipe(sourcemaps.init())
        .pipe(concat('blundle.css'))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css/vendor'))
        .pipe(browsersync.stream());
}


// JS task
function js() {
    return gulp
        .src(["./js/library.js"])
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
        .pipe(gulp.dest("./public/js"))
        .pipe(browsersync.stream());
}


// JS Vendor Concat task
function vendorjs() {
    return gulp
        .src([
            "./js/vendor/jquery/jquery.min.js",
            "./js/vendor/jqueryui/jquery-ui.min.js",
            "./js/vendor/bootstrap/bootstrap.bundle.min.js",
            "./js/vendor/toastr/toastr.min.js",
            "./js/vendor/sweetalert2/sweetalert2.all.min.js",
            "./js/vendor/select2/select2/select2.full.min.js",
            "./js/vendor/perfect-scrollbar/perfect-scrollbar.min.js",
            "./js/vendor/dropzone/dropzone.min.js",
            //"./js/vendor/datatables/dataTables.bootstrap4.min.js",
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('blundle.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./public/js/vendor"))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch("./scss/*", gulp.series(gulp.parallel(scss, style)));
    gulp.watch(["./js/*"], gulp.series("js"));
    gulp.watch("./src/**/*", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const compile = gulp.series(gulp.parallel(scss, style));
const build = gulp.series(vendor, compile, gulp.parallel(css, js, vendorjs));
const watch = gulp.series(build, gulp.parallel(watchFiles, phpServer, browserSync));


// Export tasks
exports.scss = scss;
//exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
