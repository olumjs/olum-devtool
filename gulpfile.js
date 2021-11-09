const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const header = require('gulp-header');
const sass = require('gulp-sass')(require('sass'));
const prefix = require("gulp-autoprefixer");
const cssmin = require("gulp-cssnano");
const pkgJSON = require("./package.json");

const comment = 
`/**
* @name ${pkgJSON.name}
* @version ${pkgJSON.version}
* @copyright 2021
* @author ${pkgJSON.author}
* @license ${pkgJSON.license}
*/
`;

gulp.task("js", () => {
  return gulp
    .src("./src/olum-devtool.js")
    .pipe(concat("olum-devtool.min.js"))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(uglify())
    .pipe(header(comment))
    .pipe(gulp.dest("dist"));
});

gulp.task("css", () => {
  return gulp
    .src("./src/olum-devtool.scss")
    .pipe(sass())
    .pipe(prefix({ cascade: false }))
    .pipe(concat("olum-devtool.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("dist"));
});

gulp.task("copy", () => gulp.src(["./src/olum-devtool.js", "./src/olum-devtool.scss"]).pipe(gulp.dest("dist")));

gulp.task("default", gulp.series(["js", "css", "copy"]));
