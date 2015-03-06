var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');

var paths = {
  html: './views/*.html',
  js: './public/js/*.js',
  css: './public/css/*.css',
  angular: './bower_components/angular/angular.js',
  firebase: './bower_components/firebase/firebase.js',
  angularfire: './bower_components/angularfire/dist/angularfire.js',
  angularRoute: './bower_components/angular-route/angular-route.js',
  angularBootstrap: './bower_components/angular-bootstrap/ui-bootstrap.min.js',
  bootstrapCss: './bower_components/bootstrap-css-only/css/bootstrap.min.css',
  bootstrapCssMap: './bower_components/bootstrap-css-only/css/bootstrap.css.map' 
};

gulp.task('cleanHTML', function(cb){
  del(['build/*.html'], cb);
});

gulp.task('cleanJS', function(cb){
  del(['build/js'], cb);
});

gulp.task('cleanCSS', function(cb){
  del(['build/css'], cb);
});

var clearFolders = function(path){
  path.dirname = "";
};

gulp.task('html', ['cleanHTML'], function(){
  return gulp.src(paths.html)
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build'));
});

gulp.task('js', ['cleanJS'], function(){
  return gulp.src([paths.js, 
            paths.angular, paths.angularRoute,
            paths.firebase, paths.angularfire])
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['cleanCSS'], function(){
  return gulp.src([paths.css, 
            paths.bootstrapCss, paths.bootstrapCssMap])
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['js']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('clean', ['cleanHTML', 'cleanJS', 'cleanCSS'], function(cb){
  del(['build'], cb); 
});
gulp.task('build', ['html', 'js', 'css']);
gulp.task('default', ['watch', 'html', 'js', 'css']);