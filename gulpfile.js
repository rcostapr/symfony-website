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

// Load package.json for banner
const pkg = require("./package.json");

// Set the banner content
const banner = [
    "/*!\n",
    " * Portugal Events - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
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
    return del(["./public/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
    // Bootstrap JS
    var bootstrapJS = gulp
        .src("./node_modules/bootstrap/dist/js/*")
        .pipe(gulp.dest("./public/vendor/bootstrap/js"));
    // Bootstrap SCSS
    var bootstrapSCSS = gulp
        .src("./node_modules/bootstrap/scss/**/*")
        .pipe(gulp.dest("./public/vendor/bootstrap/scss"));

    // ChartJS
    var chartJS = gulp
        .src("./node_modules/chart.js/dist/*.js")
        .pipe(gulp.dest("./public/vendor/chart.js"));

    // Toastr
    var toastr = gulp
        .src("./node_modules/toastr/build/*.js")
        .pipe(gulp.dest("./public/vendor/toastr"));
    // Toastr SCSS
    var toastrSCSS = gulp
        .src("./node_modules/toastr/toastr.scss")
        .pipe(gulp.dest("./public/vendor/toastr/scss"));

    // Sweetalert2
    var sweetalert2 = gulp
        .src("./node_modules/sweetalert2/dist/*.js")
        .pipe(gulp.dest("./public/vendor/sweetalert2"));
    // Sweetalert SCSS
    var sweetalertSCSS = gulp
        .src("./node_modules/sweetalert2/src/*.scss")
        .pipe(gulp.dest("./public/vendor/sweetalert2/scss"));
    // Sweetalert2 SCSS
    var sweetalert2SCSS = gulp
        .src("./node_modules/sweetalert2/src/scss/*")
        .pipe(gulp.dest("./public/vendor/sweetalert2/scss/scss"));

    // Select2
    var select2 = gulp
        .src("./node_modules/select2/dist/js/*.js")
        .pipe(gulp.dest("./public/vendor/select2"));
    // Select2 SCSS
    var select2SCSS = gulp
        .src("./node_modules/select2/src/scss/**/*")
        .pipe(gulp.dest("./public/vendor/select2/scss/scss"));
    // Select2 css
    var select2CSS = gulp
        .src(
            "./node_modules/@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css"
        )
        .pipe(gulp.dest("./public/vendor/select2/css"));

    // Quill
    var quill = gulp
        .src("./node_modules/quill/dist/*")
        .pipe(gulp.dest("./public/vendor/quill"));

    // Perfect Scrollbar
    var perfectScrollbarCSS = gulp
        .src("./node_modules/perfect-scrollbar/css/perfect-scrollbar.css")
        .pipe(gulp.dest("./public/vendor/perfect-scrollbar"));
    var perfectScrollbar = gulp
        .src("./node_modules/perfect-scrollbar/dist/*")
        .pipe(gulp.dest("./public/vendor/perfect-scrollbar"));

    // Katex
    var katex = gulp
        .src("./node_modules/katex/dist/**/*")
        .pipe(gulp.dest("./public/vendor/katex"));

    // DROPZONE
    var dropzoneCSS = gulp
        .src("./node_modules/dropzone/dist/min/dropzone.min.css")
        .pipe(gulp.dest("./public/vendor/dropzone"));

    var dropzone = gulp
        .src("./node_modules/dropzone/dist/min/dropzone.min.js")
        .pipe(gulp.dest("./public/vendor/dropzone"));

    // APEX
    var apexCSS = gulp
        .src("./node_modules/apexcharts/dist/apexcharts.css")
        .pipe(gulp.dest("./public/vendor/apex"));

    var apex = gulp
        .src("./node_modules/apexcharts/dist/apexcharts.min.js")
        .pipe(gulp.dest("./public/vendor/apex"));

    // dataTables
    var dataTables = gulp
        .src([
            "./node_modules/datatables.net/js/*.js",
            "./node_modules/datatables.net-bs4/js/*.js",
            "./node_modules/datatables.net-bs4/css/*.css",
        ])
        .pipe(gulp.dest("./public/vendor/datatables"));

    // Font Awesome
    var fontAwesome = gulp
        .src("./node_modules/@fortawesome/**/*")
        .pipe(gulp.dest("./public/vendor"));

    // jQuery Easing
    var jqueryEasing = gulp
        .src("./node_modules/jquery.easing/*.js")
        .pipe(gulp.dest("./public/vendor/jquery-easing"));
    // jQuery
    var jquery = gulp
        .src([
            "./node_modules/jquery/dist/*",
            "!./node_modules/jquery/dist/core.js",
        ])
        .pipe(gulp.dest("./public/vendor/jquery"));

    // jQuery UI
    var jqueryui = gulp
        .src([
            "./node_modules/jquery-ui-dist/jquery-ui.min.js",
            "./node_modules/jquery-ui-dist/jquery-ui.min.css",
            "./node_modules/jquery-ui-dist/jquery-ui.theme.min.css",
        ])
        .pipe(gulp.dest("./public/vendor/jqueryui"));
    var jqueryuimage = gulp
        .src(["./node_modules/jquery-ui-dist/images/*"])
        .pipe(gulp.dest("./public/vendor/jqueryui/images"));
    return merge(
        bootstrapJS,
        bootstrapSCSS,
        chartJS,
        dataTables,
        fontAwesome,
        jquery,
        jqueryui,
        jqueryuimage,
        jqueryEasing,
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
        apex,
        apexCSS,
        quill,
        perfectScrollbarCSS,
        perfectScrollbar,
        katex
    );
}

// CSS task
function css() {
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
        .pipe(gulp.dest("./public/css"))
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
function js() {
    return gulp
        .src(["./public/js/*.js", "!./public/js/*.min.js"])
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

// Watch files
function watchFiles() {
    gulp.watch("./scss/**/*", gulp.series("css"));
    gulp.watch(
        ["./public/js/**/*", "!./public/js/**/*.min.js"],
        gulp.series("js")
    );
    gulp.watch("./**/public/**/*.php", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js));
const watch = gulp.series(
    build,
    gulp.parallel(watchFiles, phpServer, browserSync)
);

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
