'use strict';

var gulp        = require('gulp'),
    ts          = require('gulp-typescript'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'), 
    uglify      = require('gulp-uglify'),     
    rigger      = require('gulp-rigger'),     
    sass        = require('gulp-sass'),   
    sourcemaps  = require('gulp-sourcemaps'),

    cleancss    = require('gulp-clean-css'),
    htmlmin     = require('gulp-htmlmin'),
    imagemin    = require('gulp-imagemin'), 
    pngquant    = require('imagemin-pngquant'), 
    spritesmith = require('gulp.spritesmith'),
	plumber     = require('gulp-plumber'),
	rimraf 		= require('rimraf'),
    browserSync = require("browser-sync"),
    reload 		= browserSync.reload,
	connect 	= require('connect'),
    serveStatic = require('serve-static'),
    express = require('express'),
    rewrite     = require("connect-url-rewrite"),
    modrewrite = require("connect-modrewrite");
	
	
var path = {
    build: {
        html: 			'www/',
		js:            	'www/js/',
        css:           	'www/css/',
        images:        	'www/images/',
        fonts:         	'www/fonts/',
        fontsBootstrap:	'www/fonts/bootstrap/'
    },
    src: {
        html: 			    'src/views/*.html',
		js:           	    'src/app/script.js',
        styles:        	    'src/styles/styles.scss',
        stylesControlList:	'src/styles/controlList/',
        stylesGlobalVar:	'src/styles/globalVar/',
        stylesLayout:	    'src/styles/layout/',        
        spriteTemplate:	    'src/sass.template.mustache',
        images:        	    'src/assets/images/**/*.*',
        sprite:        	    'src/assets/sprite/*.*',
        fonts:         	    'src/assets/fonts/**/*.*',
        fontsBootstrap:	    'bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*'
    },
    watch: {
        html: 'src/views/**/*.html',
        ts:    'src/app/**/*.ts',
        js:    'src/app/**/*.js',
        styles:'src/styles/**/*.scss',
        images:'src/assets/images/**/*.*',
        sprite:'src/assets/sprite/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
	clean: './www'
};


gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger())                 // Прогоним через rigger
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html)) // Выплюнем готовый файл в build
		.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('ts:build', function () {
    gulp.src('src/app/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'tscript.js'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('www/js'))
        .pipe(reload({stream: true}));
});



gulp.task('js:build', function () {
    gulp.src(path.src.js)               // Найдем наш main файл
        .pipe(plumber())
        .pipe(rigger())                 // Прогоним через rigger
        .pipe(sourcemaps.init())        // Инициализируем sourcemap
        .pipe(uglify())                 // Сожмем наш js
        .pipe(sourcemaps.write())       // Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js)) // Выплюнем готовый файл в build
		.pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('styles:build', function () {
    gulp.src(path.src.styles)            // Выберем наш main.scss
        .pipe(plumber())
        .pipe(sourcemaps.init())         // То же самое что и с js
        .pipe(sass())                    // Скомпилируем
        .pipe(prefixer())                // Добавим вендорные префиксы
        .pipe(cleancss())                  // Сожмем
        .pipe(sourcemaps.write())        // Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css)) // И в build
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.images) //Выберем наши картинки
        .pipe(plumber())
        .pipe(imagemin({   //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.images))
		.pipe(reload({stream: true}));
});

gulp.task('sprite:build', function() {
    var spriteData =
        gulp.src(path.src.sprite)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 20,
                cssTemplate: path.src.spriteTemplate,
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest(path.build.images));
    spriteData.css.pipe(gulp.dest(path.src.stylesLayout));
});

//Переместим шрифт bootstrap'а, для работоспособности иконок 
gulp.task('icons:build', function() {
    gulp.src(path.src.fontsBootstrap)
        .pipe(gulp.dest(path.build.fontsBootstrap));
});
// Переместим шрифты из папки src
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'ts:build',
    'js:build',
    'sprite:build',
    'icons:build',
    'fonts:build',
    'styles:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.ts], function(event, cb) {
        gulp.start('ts:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprite:build');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('image:build');
    });
});


gulp.task('webserver', function () {
    var port = 8080,
    app = express().use(express.static(__dirname + '/www')),
        http = require('http').Server(app);
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/www/index.html');
    });
    app.get('/catalog/*', function(req, res){
        res.sendFile(__dirname + '/www/catalog.html');
    });
    app.get('/poisk/*', function(req, res){
        res.sendFile(__dirname + '/www/poisk.html');
    });
    app.get('/product/*', function(req, res){
        res.sendFile(__dirname + '/www/product.html');
    });
    app.get('/cart', function(req, res){
        res.sendFile(__dirname + '/www/cart.html');
    });
    app.get('/checkout', function(req, res){
        res.sendFile(__dirname + '/www/checkout.html');
    });

    http.listen(port, function(){
        console.log("Node server listening on port " + port);
    });



});

gulp.task('default', ['build', 'webserver', 'watch']);