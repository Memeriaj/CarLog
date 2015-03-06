var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var merge = require('merge-stream');

var paths = {
  favicon: './favicon.ico',
  html: './views/*.html',
  js: './public/js/*.js',
  css: './public/css/*.css',
  imgs: './images/([^\s]+(\.(?i)(jpg|png|gif|bmp|ico))$)',
};

var bower_paths = {
  angular: './bower_components/angular/angular.js',
  firebase: './bower_components/firebase/firebase.js',
  angularfire: './bower_components/angularfire/dist/angularfire.js',
  angularRoute: './bower_components/angular-route/angular-route.js',
  angularBootstrap: './bower_components/angular-bootstrap/ui-bootstrap.min.js',
  momentJs: './bower_components/moment/min/moment.min.js',
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

gulp.task('cleanIMG', function(cb){
  del(['build/favicon.ico','build/img'], cb);
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
  var js_lib = gulp.src([bower_paths.angular, bower_paths.angularRoute, 
            bower_paths.firebase, bower_paths.angularfire,
            bower_paths.angularBootstrap,
            bower_paths.momentJs])
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/js/lib'));

  var js = gulp.src(paths.js)
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/js'));

  return merge(js_lib, js);
});

gulp.task('css', ['cleanCSS'], function(){
  var css_lib = gulp.src([bower_paths.bootstrapCss, bower_paths.bootstrapCssMap])
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/css/lib'));

  var css = gulp.src(paths.css)
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/css'));

  return merge(css_lib, css);
});

gulp.task('img', ['cleanIMG'], function(){
  var favicon = gulp.src(paths.favicon)
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build'));

  var imgs = gulp.src(paths.imgs)
    .pipe(rename(clearFolders))
    .pipe(gulp.dest('build/img'));

  return merge(favicon, imgs);
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('clean', ['cleanHTML', 'cleanJS', 'cleanCSS', 'cleanIMG'], function(cb){
  del(['build'], cb); 
});
gulp.task('build', ['html', 'js', 'css', 'img']);
gulp.task('default', ['watch', 'html', 'js', 'css', 'img']);