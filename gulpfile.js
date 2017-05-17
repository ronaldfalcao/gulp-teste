var gulp = require('gulp');

//gulp.task('copiar', function(){
// console.log('Fazer a cópia dos arquivos');
//});

gulp.src([
  '/src/*.html', // arquivos .html da raiz /src
  'src/**/*.js', // arquivos .js de subdiretórios
  '!src/**/*-spec.js' // ignorar arquivos -spec.js (testes) de subdiretórios
]);

//Antigo
//gulp.task('copiar', function(){
//  return gulp.src(__dirname + '/src/index.html')
//    .pipe(gulp.dest(__dirname + '/dist'));
//});

var del = require('del');

del = require('del');  // vamos manter as dependências agrupadas

gulp.task('copiar', ['limpar'], function(){
  return gulp.src([
    __dirname + '/src/index.html',
    __dirname + '/src/*/**.css',
    __dirname + '/src/*/**.js'
  ])
    .pipe(gulp.dest(__dirname + '/dist'));
});

var inject = require('gulp-inject');
gulp.task('inject:project', function() {
 
    var resources = gulp.src(__dirname + '/dist/*/**', {read: false});
 
    return gulp.src(__dirname + '/dist/index.html')
      .pipe(inject(resources, {
        ignorePath: '/dist'
      }))
      .pipe(gulp.dest(__dirname + '/dist'));
});

/* Antigo
gulp.task('copiar', ['limpar'], function(){
  return gulp.src(__dirname + '/src/index.html')
    .pipe(gulp.dest(__dirname + '/dist'));
});
*/

gulp.task('limpar', function () {
  del.sync(__dirname + '/dist/**');
});

gulp.task('build', ['copiar', 'inject:project']);

var runSequence = require('run-sequence');
gulp.task('build', function (done) {
    return runSequence('copiar', 'inject:project', done);
});




