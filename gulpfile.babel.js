import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import inject from "gulp-inject";
import cssnano from "cssnano";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import uglify from "gulp-uglify";
import merge from 'merge-stream';
import concat from "gulp-concat";
import imagemin from "gulp-imagemin";

const browserSync = BrowserSync.create();
const hugoBin = `./bin/hugo.${process.platform === "win32" ? "exe" : process.platform}`;
const defaultArgs = ["-d", "../dist", "-s", "site"];

if (process.env.DEBUG) {
    defaultArgs.unshift("--debug");
}

gulp.task("hugo-complete", ["concatLandingCss", "concatPricingCss", "concatForTeacherCss", "concatForLearnersCss", "concatForInstitutionsCss", "concatResourcesCss",
    "concatLandingJs", "concatPricingJs", "concatForTeacherJs", "concatForLearnersJs", "concatForInstitutionsJs", "concatResourcesJs", "image"], (cb) => buildSite(cb));

gulp.task("hugo", (cb) => buildSite(cb));

gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("build", ["concatLandingCss", "concatPricingCss", "concatForTeacherCss", "concatForLearnersCss", "concatForInstitutionsCss", "concatResourcesCss",
    "concatLandingJs", "concatPricingJs", "concatForTeacherJs", "concatForLearnersJs", "concatForInstitutionsJs", "concatResourcesJs", "css", "js", "hugo", "image"]);

gulp.task("build-preview", ["concatLandingCss", "concatPricingCss", "concatForTeacherCss", "concatForLearnersCss", "concatForInstitutionsCss", "concatResourcesCss",
    "concatLandingJs", "concatPricingJs", "concatForTeacherJs", "concatForLearnersJs", "concatForInstitutionsJs", "concatResourcesJs", "css", "js", "hugo-preview", "image"]);

gulp.task("concatLandingCss", function () {
    gulp.src(['./site/static/public/vender/bootstrap.min.css',
        './site/static/public/vender/fontawesome.css',
        './site/static/public/vender/ProximaNova.css',
        './site/static/public/vender/owl.carousel.min.css',
        './site/static/public/vender/owl.theme.default.min.css',
        './site/static/public/vender/Ponddy-NotoRubik0311.css',
        './site/static/public/css/common.css',
        './node_modules/ponddy-guideline/style/ponddy-guidline.min.css',
        './site/static/public/css/landing.css'])
        .pipe(concat('landing-dist.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/public/css/"))
        .pipe(browserSync.stream());
});
gulp.task("concatForTeacherCss", function () {
    gulp.src(['./site/static/public/vender/bootstrap.min.css',
        './site/static/public/vender/fontawesome.css',
        './site/static/public/vender/ProximaNova.css',
        './site/static/public/vender/owl.carousel.min.css',
        './site/static/public/vender/owl.theme.default.min.css',
        './site/static/public/vender/Ponddy-NotoRubik0311.css',
        './site/static/public/css/common.css',
        './node_modules/ponddy-guideline/style/ponddy-guidline.min.css',
        './site/static/public/css/for_teachers.css'])
        .pipe(concat('for_teachers-dist.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/public/css/"))
        .pipe(browserSync.stream());
});
gulp.task("concatForLearnersCss", function () {
    gulp.src(['./site/static/public/vender/bootstrap.min.css',
        './site/static/public/vender/fontawesome.css',
        './site/static/public/vender/ProximaNova.css',
        './site/static/public/vender/owl.carousel.min.css',
        './site/static/public/vender/owl.theme.default.min.css',
        './site/static/public/vender/Ponddy-NotoRubik0311.css',
        './site/static/public/css/common.css',
        './node_modules/ponddy-guideline/style/ponddy-guidline.min.css',
        './site/static/public/css/for_learners.css'])
        .pipe(concat('for_learners-dist.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/public/css/"))
        .pipe(browserSync.stream());
});
gulp.task("concatForInstitutionsCss", function () {
    gulp.src(['./site/static/public/vender/bootstrap.min.css',
        './site/static/public/vender/fontawesome.css',
        './site/static/public/vender/ProximaNova.css',
        './site/static/public/vender/owl.carousel.min.css',
        './site/static/public/vender/owl.theme.default.min.css',
        './site/static/public/vender/Ponddy-NotoRubik0311.css',
        './site/static/public/css/common.css',
        './node_modules/ponddy-guideline/style/ponddy-guidline.min.css',
        './site/static/public/css/for_institutions.css'])
        .pipe(concat('for_institutions-dist.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/public/css/"))
        .pipe(browserSync.stream());
});
gulp.task("concatPricingCss", function () {
    var sassStream,
        cssStream;
    sassStream = gulp.src('./site/static/public/css/pricing.scss')
        .pipe(gulpSass({
            errLogToConsole: true
        }));
    cssStream = gulp.src(['./site/static/public/vender/bootstrap.min.css',
        './site/static/public/vender/fontawesome.css',
        './site/static/public/vender/ProximaNova.css',
        './site/static/public/vender/owl.carousel.min.css',
        './site/static/public/vender/owl.theme.default.min.css',
        './site/static/public/vender/Ponddy-NotoRubik0311.css',
        './node_modules/ponddy-guideline/style/ponddy-guidline.min.css',
        './node_modules/tablesaw/dist/tablesaw.css',
        './site/static/public/css/common.css']);


    return merge(sassStream, cssStream)
        .pipe(concat('pricing-dist.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/public/css/"))
        .pipe(browserSync.stream());
});
gulp.task("concatResourcesCss", function () {
    var sassStream,
        cssStream;
    sassStream = gulp.src('./site/static/public/css/resources.scss')
        .pipe(gulpSass({
            errLogToConsole: true
        }));
    cssStream =gulp.src(['./site/static/public/vender/bootstrap.min.css',
        './site/static/public/vender/fontawesome.css',
        './site/static/public/vender/ProximaNova.css',
        './site/static/public/vender/owl.carousel.min.css',
        './site/static/public/vender/owl.theme.default.min.css',
        './site/static/public/vender/Ponddy-NotoRubik0311.css',
        './site/static/public/css/common.css',
        './node_modules/ponddy-guideline/style/ponddy-guidline.min.css'])


    return merge(sassStream, cssStream)
        .pipe(concat('resources-dist.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/public/css/"))
        .pipe(browserSync.stream());
});

gulp.task("concatLandingJs", function () {
    gulp.src(['./site/static/public/vender/jquery-3.3.1.min.js',
        './site/static/public/vender/popper.min.js',
        './site/static/public/vender/bootstrap.min.js',
        './site/static/public/vender/ScrollMagic.min.js',
        './site/static/public/vender/jquery.cookie.js',
        './site/static/public/vender/owl.carousel.min.js',
        './site/static/public/vender/lazyload.min.js',
        './site/static/public/js/common.js',
        './site/static/public/js/landing.js',
        './site/static/public/js/post-credits-scene.js',
        './site/static/public/js/index-animation.js'])
        .pipe(concat('landing-dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/public/js/"))
        .pipe(browserSync.stream());
});

gulp.task("concatPricingJs", function () {
    gulp.src(['./site/static/public/vender/jquery-3.3.1.min.js',
        './site/static/public/vender/popper.min.js',
        './site/static/public/vender/bootstrap.min.js',
        './site/static/public/vender/owl.carousel.min.js',
        './site/static/public/vender/lazyload.min.js',
        './site/static/public/js/common.js',
        './site/static/public/js/pricing.js',
        './node_modules/tablesaw/dist/tablesaw.jquery.js',
        './node_modules/tablesaw/dist/tablesaw-init.js',
        './site/static/public/js/post-credits-scene.js',
        ])
        .pipe(concat('pricing-dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/public/js/"))
        .pipe(browserSync.stream());
});

gulp.task("concatForTeacherJs", function () {
    gulp.src(['./site/static/public/vender/jquery-3.3.1.min.js',
        './site/static/public/vender/popper.min.js',
        './site/static/public/vender/bootstrap.min.js',
        './site/static/public/vender/ScrollMagic.min.js',
        './site/static/public/vender/jquery.cookie.js',
        './site/static/public/vender/owl.carousel.min.js',
        './site/static/public/vender/lazyload.min.js',
        './site/static/public/js/common.js',
        './site/static/public/js/for_teachers.js',
        './site/static/public/js/post-credits-scene.js',
        './site/static/public/js/index-animation.js'])
        .pipe(concat('for_teachers-dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/public/js/"))
        .pipe(browserSync.stream());
});

gulp.task("concatForLearnersJs", function () {
    gulp.src(['./site/static/public/vender/jquery-3.3.1.min.js',
        './site/static/public/vender/popper.min.js',
        './site/static/public/vender/bootstrap.min.js',
        './site/static/public/vender/ScrollMagic.min.js',
        './site/static/public/vender/jquery.cookie.js',
        './site/static/public/vender/owl.carousel.min.js',
        './site/static/public/vender/lazyload.min.js',
        './site/static/public/js/common.js',
        './site/static/public/js/for_learners.js',
        './site/static/public/js/post-credits-scene.js',
        './site/static/public/js/index-animation.js'])
        .pipe(concat('for_learners-dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/public/js/"))
        .pipe(browserSync.stream());
});

gulp.task("concatForInstitutionsJs", function () {
    gulp.src(['./site/static/public/vender/jquery-3.3.1.min.js',
        './site/static/public/vender/popper.min.js',
        './site/static/public/vender/bootstrap.min.js',
        './site/static/public/vender/ScrollMagic.min.js',
        './site/static/public/vender/jquery.cookie.js',
        './site/static/public/vender/owl.carousel.min.js',
        './site/static/public/vender/lazyload.min.js',
        './site/static/public/js/common.js',
        './site/static/public/js/for_institutions.js',
        './site/static/public/js/post-credits-scene.js',
        './site/static/public/js/index-animation.js'])
        .pipe(concat('for_institutions-dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/public/js/"))
        .pipe(browserSync.stream());
});
gulp.task("concatResourcesJs", function () {
    gulp.src(['./site/static/public/vender/jquery-3.3.1.min.js',
        './site/static/public/vender/popper.min.js',
        './site/static/public/vender/bootstrap.min.js',
        './site/static/public/vender/ScrollMagic.min.js',
        './site/static/public/vender/jquery.cookie.js',
        './site/static/public/vender/owl.carousel.min.js',
        './site/static/public/vender/lazyload.min.js',
        './site/static/public/js/common.js',
        './site/static/public/js/resources.js',
        './site/static/public/js/post-credits-scene.js',
        './site/static/public/js/index-animation.js'])
        .pipe(concat('resources-dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/public/js/"))
        .pipe(browserSync.stream());
});

gulp.task("image", function () {
    gulp.src('./site/static/public/images/**')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./dist/public/images'));
});

gulp.task("css", () => (
    gulp.src("./src/css/*.css")
        .pipe(postcss([
            cssImport({from: "./src/css/main.css"}),
            cssnext(),
            cssnano(),
        ]))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream())
));

gulp.task("js", (cb) => {
    const myConfig = Object.assign({}, webpackConfig);

    webpack(myConfig, (err, stats) => {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true,
            progress: true
        }));
        browserSync.reload();
        cb();
    });
});

gulp.task("svg", () => {
    const svgs = gulp
        .src("site/static/img/icons-*.svg")
        .pipe(svgmin())
        .pipe(svgstore({inlineSvg: true}));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src("site/layouts/partials/svg.html")
        .pipe(inject(svgs, {transform: fileContents}))
        .pipe(gulp.dest("site/layouts/partials/"));
});

gulp.task("server", ["hugo-complete"], () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        host: 'reader-dev.ponddy.com',
    });
    gulp.watch("./src/js/**/*.js", ["js"]);
    gulp.watch("./src/css/**/*.css", ["css"]);
    gulp.watch("./site/static/img/icons-*.svg", ["svg"]);
    gulp.watch(["./site/**/*", "!./site/static/public/**/*"], ["hugo"]);
    gulp.watch(["./site/static/public/js/landing.js",
        "./site/static/public/js/common.js",
        "./site/static/public/js/post-credits-scene.js"], ["concatLandingJs", "hugo"]);
    gulp.watch(["./site/static/public/js/pricing.js",
        "./site/static/public/js/common.js",
        "./site/static/public/js/post-credits-scene.js"], ["concatPricingJs", "hugo"]);
    gulp.watch(["./site/static/public/css/landing.css",
        "./site/static/public/css/common.css"], ["concatLandingCss", "hugo"]);
    gulp.watch(["./site/static/public/css/pricing.scss",
        "./site/static/public/css/common.css"], ["concatPricingCss", "hugo"]);

    gulp.watch(["./site/static/public/css/for_teachers.css", "./site/static/public/css/common.css"], ["concatForTeacherCss", "hugo"]);
    gulp.watch(["./site/static/public/js/for_teachers.js", "./site/static/public/js/common.js",], ["concatForTeacherJs", "hugo"]);
    gulp.watch(["./site/static/public/css/for_learners.css", "./site/static/public/css/common.css"], ["concatForLearnersCss", "hugo"]);
    gulp.watch(["./site/static/public/js/for_learners.js", "./site/static/public/js/common.js",], ["concatForLearnersJs", "hugo"]);
    gulp.watch(["./site/static/public/css/for_institutions.css", "./site/static/public/css/common.css"], ["concatForInstitutionsCss", "hugo"]);
    gulp.watch(["./site/static/public/js/for_institutions.js", "./site/static/public/js/common.js",], ["concatForInstitutionsJs", "hugo"]);
    gulp.watch(["./site/static/public/css/resources.scss", "./site/static/public/css/common.css"], ["concatResourcesCss", "hugo"]);
    gulp.watch(["./site/static/public/js/resources.js", "./site/static/public/js/common.js",], ["concatResourcesJs", "hugo"]);
});

function buildSite(cb, options) {
    const args = options ? defaultArgs.concat(options) : defaultArgs;

    return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
        if (code === 0) {
            browserSync.reload("notify:false");
            cb();
        } else {
            browserSync.notify("Hugo build failed :(");
            cb("Hugo build failed");
        }
    });
}
