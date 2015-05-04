"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var runSequence = require("run-sequence");
var opn = require("opn");
var connect = require("gulp-connect");
var del = require("del");

gulp.task("compile", function (cb) {
    browserify({
        entries: "./js/app.js",
        extensions: [".js"],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build/js"))
        .on("end", function() {
            cb();
        });
});

gulp.task("copy", function (cb) {
    gulp.src("./index.html")
        .pipe(gulp.dest("./build"));

    gulp.src("./css/**/*.css")
        .pipe(gulp.dest("./build/css"));

    gulp.src("./img/scotch-beer.png")
        .pipe(gulp.dest("./build/img"));
    cb();
});

gulp.task("clean", function (cb) {
    return del("./build", cb);
});

gulp.task("watch", function () {
    gulp.watch(["js/**/*.js", "./index.html", "./css/**/*.scss"], function () {
        runSequence(["compile", "copy", "reload"]);
    });
});

gulp.task("reload", function () {
    connect.reload();
});

gulp.task("opn", function () {
    opn("http://localhost:8080");
});

gulp.task("server", function () {
    connect.server({
        root: "./build",
        livereload: true
    });
});

gulp.task("default", function () {
    runSequence(["clean"], ["copy"], ["compile"], "server", "opn", "watch");
});

gulp.task("build", ["default"]);
