const gulp=require("gulp");
const gulpcompass=require("gulp-compass");//编译scss
const uglify=require("gulp-uglify");//压缩js文件
const gulprename=require("gulp-rename");//加.min后缀
const connect = require("gulp-connect");//服务器刷新服务
const clean=require("gulp-clean");//删除dist目录
const gprefixer=require("gulp-autoprefixer");//兼容浏览器
const concatjs=require("gulp-concat");//连接js
const smap=require("gulp-sourcemaps");
const gbabel=require("gulp-babel");//es6转为es5

const stream=require("stream");
const {promisify}=require("util");
const pipeline=promisify(stream.pipeline);

//1.复制jquery
gulp.task("miniJquery",async()=>{
    return pipeline(
        gulp.src("./vendor/JQuery/jquery-3.6.0.js"),
        uglify(),
        gulprename(function(filename){
            filename.basename+=".min";
        }),
        gulp.dest("./dist/vendor/JQuery")
    );
});


// 2.copy html
gulp.task("html",async()=>{
    return pipeline(
        gulp.src("./src/**/*.html"),
        gulp.dest("./dist"),
        connect.reload()
    );
});

// 复制css文件
gulp.task("copycss",async()=>{
    return pipeline(
        gulp.src("./src/styles/**/*.css"),
        // gprefixer({
        //     overrideBrowserslist: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        //     grid:true
        // }),
        gulp.dest("./dist/styles"),
        connect.reload()
    );
});


// scss处理
gulp.task("gulpsass",async()=>{
    return pipeline(
        gulp.src("./src/styles/sass/**/*.scss"),
        gulpcompass({
            config_file:'./config.rb',
            css:'./src/styles/css',
            sass:'./src/styles/sass'
        }).on("error",function(err){
            console.log("sass错误：",err);
            this.emit("end");
        })
    );
});

//3.scss处理和css复制,先转换好scss在将css复制到dist
gulp.task("styles",gulp.series("gulpsass","copycss",async()=>{
    console.log("转化css并复制到dist");
}));


//4.copy uglify js
gulp.task("scripts",async()=>{
    return pipeline(
        gulp.src("./src/scripts/**/*.js"),
        gbabel({
            presets:['@babel/preset-env']
        }),
        concatjs("main.js"),
        gulp.dest("./dist/scripts"),
        connect.reload()
    );
});


//5.服务器
gulp.task("server",async()=>{
    connect.server({
        root: "./dist",
        livereload: true,
        port: 8079
    });
});



// 6.监听文件变化并更新文件
gulp.task("watchall",async()=>{
    gulp.watch("./src/**/*.html",gulp.series("html"));
    gulp.watch(["./src/styles/**/*.scss","./src/styles/**/*.css"],gulp.series("styles"));
    gulp.watch("./src/scripts/**/*.js",gulp.series("scripts"));
    
})

//清空dist目录
gulp.task("clean",async()=>{
    return gulp.src("./dist/**",{read:false}).pipe(clean({force:true}));
})

//初始化基本css,js,html基本文件
gulp.task("build",gulp.series("miniJquery","html","styles","scripts"));


//gulp默认执行default任务
gulp.task("default",gulp.series("clean","build","server","watchall"));
