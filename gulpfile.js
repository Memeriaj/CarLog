var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');

var paths = {
  src: './src/*',
  html: './src/**/*.html',
  js: './src/**/*.js',
  angular: './bower_components/angular/angular.js',
  firebase: './bower_components/firebase/firebase.js',
  angularfire: './bower_components/angularfire/dist/angularfire.js',
  angularRoute: './bower_components/angular-route/angular-route.js',
  bootstrap: './bower_components/bootstrap/dist/css/bootstrap.css',
  bootstrapMap: './bower_components/bootstrap/dist/css/bootstrap.css.map'
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
  return gulp.src([paths.js, paths.angular, paths.firebase, paths.angularfire, paths.angularRoute])
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['cleanCSS'], function(){
  return gulp.src([paths.bootstrap, paths.bootstrapMap])
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['js']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watch', 'html', 'js', 'css']);
