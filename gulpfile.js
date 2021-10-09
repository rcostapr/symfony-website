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

/*
  browsersync.init({
    server: {
      baseDir: "./public"
    },
    port: 3000
  });
  done();
}
*/

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
    return del(["./public/js/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
    // Bootstrap JS
    var bootstrapJS = gulp
        .src("./node_modules/bootstrap/dist/js/*")
        .pipe(gulp.dest("./js/bootstrap"));
    // Bootstrap SCSS
    var bootstrapSCSS = gulp
        .src("./node_modules/bootstrap/scss/**/*")
        .pipe(gulp.dest("./scss/bootstrap"));

    // ChartJS
    var chartJS = gulp
        .src("./node_modules/chart.js/dist/*.js")
        .pipe(gulp.dest("./js/chartjs/chart.js"));

    // Toastr
    var toastr = gulp
        .src("./node_modules/toastr/build/*.js")
        .pipe(gulp.dest("./js/toastr"));
    // Toastr SCSS
    var toastrSCSS = gulp
        .src("./node_modules/toastr/*.scss")
        .pipe(gulp.dest("./scss/toastr"));

    // Sweetalert2
    var sweetalert2 = gulp
        .src("./node_modules/sweetalert2/dist/*.js")
        .pipe(gulp.dest("./js/sweetalert2"));
    // Sweetalert SCSS
    var sweetalertSCSS = gulp
        .src("./node_modules/sweetalert2/src/*.scss")
        .pipe(gulp.dest("./scss/sweetalert2"));
    // Sweetalert2 SCSS
    var sweetalert2SCSS = gulp
        .src("./node_modules/sweetalert2/src/scss/*")
        .pipe(gulp.dest("./scss/sweetalert2/scss"));

    // Select2
    var select2 = gulp
        .src("./node_modules/select2/dist/js/*.js")
        .pipe(gulp.dest("./js/select2/select2"));
    // Select2 SCSS
    var select2SCSS = gulp
        .src("./node_modules/select2/src/scss/**/*")
        .pipe(gulp.dest("./scss/select2/scss"));
    // Select2 css
    var select2CSS = gulp
        .src(
            "./node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"
        )
        .pipe(gulp.dest("./css/select2"));

    // Perfect Scrollbar
    var perfectScrollbarCSS = gulp
        .src("./node_modules/perfect-scrollbar/css/perfect-scrollbar.css")
        .pipe(gulp.dest("./css/perfectScrollbar"));
    var perfectScrollbar = gulp
        .src("./node_modules/perfect-scrollbar/dist/*")
        .pipe(gulp.dest("./js/perfect-scrollbar"));

    // DROPZONE
    var dropzoneCSS = gulp
        .src("./node_modules/dropzone/dist/min/dropzone.min.css")
        .pipe(gulp.dest("./css/dropzone"));

    var dropzone = gulp
        .src("./node_modules/dropzone/dist/min/dropzone.min.js")
        .pipe(gulp.dest("./js/dropzone"));

    // dataTables
    var dataTables = gulp
        .src([
            "./node_modules/datatables.net/js/*.js",
            "./node_modules/datatables.net-bs4/js/*.js",
        ])
        .pipe(gulp.dest("./js/datatables"));

    // dataTables CSS
    var dataTablesCss = gulp
        .src([
            "./node_modules/datatables.net-bs4/css/*.css",
        ])
        .pipe(gulp.dest("./css/datatables"));

    // Font Awesome
    var fontAwesome = gulp
        .src("./node_modules/@fortawesome/**/*")
        .pipe(gulp.dest("./css/fortawesome"));

    // jQuery
    var jquery = gulp
        .src([
            "./node_modules/jquery/dist/*",
            "!./node_modules/jquery/dist/core.js",
        ])
        .pipe(gulp.dest("./js/jquery"));

    // jQuery UI
    var jqueryui = gulp
        .src([
            "./node_modules/jquery-ui-dist/jquery-ui.min.js",
            "./node_modules/jquery-ui-dist/jquery-ui.min.css",
            "./node_modules/jquery-ui-dist/jquery-ui.theme.min.css",
        ])
        .pipe(gulp.dest("./js/jqueryui"));

    var jqueryuimage = gulp
        .src(["./node_modules/jquery-ui-dist/images/*"])
        .pipe(gulp.dest("./public/js/vendor/images"));
    return merge(
        bootstrapJS,
        bootstrapSCSS,
        chartJS,
        dataTables,
        dataTablesCss,
        fontAwesome,
        jquery,
        jqueryui,
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
        .src("./scss/**/*.scss")
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
        .pipe(
            header(banner, {
                pkg: pkg,
            })
        )
        .pipe(gulp.dest("./css"))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(cleanCSS())
        .pipe(gulp.dest("./css"))
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

// CSS concat task
function css() {
    return gulp
        .src([
            "./css/bootstrap/bootstrap.min.css",
            "./css/fortawesome/fontawesome-free/css/all.min.css",

        ])
        .pipe(sourcemaps.init())
        .pipe(concat('blundle.css'))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js/vendor/'))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch("./scss/**/*", gulp.series("css"));
    gulp.watch(["./js/**/*"], gulp.series("js"));
    gulp.watch("./src/**/*", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(scss, js, css));
const watch = gulp.series(build, gulp.parallel(watchFiles, phpServer, browserSync));

// Export tasks
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
