var gulp = require("gulp");
var server = require("gulp-webserver");
gulp.task("server", function() {
    return gulp.src("./src")
        .pipe(server({
            port: 8090,
            open: true,
            livereload: true,
            proxies: [{
                    source: "/find",
                    target: "http://localhost:3000/find"
                },
                {
                    source: "/findHeader",
                    target: "http://localhost:3000/findHeader"
                }
            ]
        }))
})