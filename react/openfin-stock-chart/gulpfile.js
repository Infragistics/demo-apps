var gulp = require('gulp');
var del = require('del');
var flatten = require('gulp-flatten');

var fileRoot = "c:/work/NetAdvantage/DEV/XPlatform/2019.2/"

gulp.task('clean-all', function() {
    // console.log("cleaning...");
    return del.sync("src/ig/**/*.*");
});

gulp.task('clean-adapters', function() {
    // console.log("cleaning...");
    return del.sync("src/ig/igniteui-fdc3/*.*");
});

gulp.task('copy-all', ['clean-all'], function(done) {
    // console.log("copying...");
    gulp.src([
        fileRoot + 'Source/TSCore/*.ts',
        fileRoot + 'Source/RCore/*.ts',
        fileRoot + 'Source/RCore/*.tsx'
    ])
    .pipe(flatten())
    .pipe(gulp.dest("src/ig/igniteui-core", { mode: "0777" }))
    .on("end", function () {
        var stream = gulp.src([
            // copying files from these locations:
            fileRoot + 'Source/Translator/bin/build/TS/**/*.ts',
            fileRoot + 'Source/Translator/bin/build/React/**/*.ts',
            fileRoot + 'Source/Translator/bin/build/React/**/*.tsx',
            fileRoot + 'Source/*.JS/**/bin/**/TS/**/*.ts',
            fileRoot + 'Source/*.JS/**/bin/**/React/**/*.ts',
            fileRoot + 'Source/*.JS/**/bin/**/React/**/*.tsx',
            // except files from these locations:
            "!" + fileRoot + 'Source/Gauges.JS/**/*.ts',
         // "!" + fileRoot + 'Source/Grid.JS/**/*.ts',
            "!" + fileRoot + 'Source/GeographicMap.JS/**/*.ts',
            "!" + fileRoot + 'Source/Translator/bin/build/React/igniteui-testframework/*.ts',
            "!" + fileRoot + 'Source/Excel.JS/**/*.ts',
            "!" + fileRoot + 'Source/Documents.Core.JS/**/*.ts',
            "!" + fileRoot + 'Source/Spreadsheet.JS/**/*.ts',
            "!" + fileRoot + 'Source/Spreadsheet.ChartAdapter.JS/**/*.ts',
            "!" + fileRoot + 'Source/Undo.JS/**/*.ts'
        ])
        .pipe(flatten({ includeParents: -1 }))
        .pipe(gulp.dest("src/ig"));

        stream.on('end', function() {
            // console.log("copying... completed");
            //run some code here
            done();
        });
        stream.on('error', function(err) {
            console.log("copying... failed");
            done(err);
        });
    })
    .on("error", function (err) {
        console.log("copying... failed");
        done(err);
    });

    // console.log("renaming...");
    // fs.rename('src/vendor', 'src/vendor-dev', function (err) {
    //     if (err) { throw err; }
    //     done();
    // });
});

gulp.task('skip', function() {
    //  console.log("skip...");
});

gulp.task('copy-adapters', ['skip'], function(done) {
    // console.log("copying...");
    gulp.src([
        fileRoot + 'Source/TSCore/*.ts',
        fileRoot + 'Source/RCore/*.ts',
        fileRoot + 'Source/RCore/*.tsx'
    ])
    .pipe(flatten())
    .pipe(gulp.dest("src/ig/igniteui-core", { mode: "0777" }))
    .on("end", function () {
        var stream = gulp.src([
            // copying files from these locations:
            fileRoot + 'Source/Translator/bin/build/TS/**/*.ts',
            fileRoot + 'Source/Translator/bin/build/React/**/*.ts',
            fileRoot + 'Source/Translator/bin/build/React/**/*.tsx',
            fileRoot + 'Source/*.JS/**/bin/**/TS/**/*.ts',
            fileRoot + 'Source/*.JS/**/bin/**/React/**/*.ts',
            fileRoot + 'Source/*.JS/**/bin/**/React/**/*.tsx',
            // except files from these locations:
            "!" + fileRoot + 'Source/DataVisualization.JS/**/*.ts',
            "!" + fileRoot + 'Source/DataChart.JS/**/*.ts',
            "!" + fileRoot + 'Source/Gauges.JS/**/*.ts',
            "!" + fileRoot + 'Source/Grid.JS/**/*.ts',
            "!" + fileRoot + 'Source/GeographicMap.JS/**/*.ts',
            "!" + fileRoot + 'Source/Translator/bin/build/React/igniteui-testframework/*.ts',
            "!" + fileRoot + 'Source/Excel.JS/**/*.ts',
            "!" + fileRoot + 'Source/Documents.Core.JS/**/*.ts',
            "!" + fileRoot + 'Source/Spreadsheet.JS/**/*.ts',
            "!" + fileRoot + 'Source/Spreadsheet.ChartAdapter.JS/**/*.ts',
            "!" + fileRoot + 'Source/Undo.JS/**/*.ts'
        ])
        .pipe(flatten({ includeParents: -1 }))
        .pipe(gulp.dest("src/ig"));

        stream.on('end', function() {
            // console.log("copying... completed");
            //run some code here
            done();
        });
        stream.on('error', function(err) {
            console.log("copying... failed");
            done(err);
        });
    })
    .on("error", function (err) {
        console.log("copying... failed");
        done(err);
    });

    // console.log("renaming...");
    // fs.rename('src/vendor', 'src/vendor-dev', function (err) {
    //     if (err) { throw err; }
    //     done();
    // });
});

function remapImports() {
    return es.map(function(file, cb) {

      var fileContent = file.contents.toString();

      var regex = /from "\.\//g;

      fileContent = fileContent.replace(regex, "from \"ig/");

      file.contents = new Buffer(fileContent);

      cb(null, file);
    });
  }

// gulp.task('qe', ['clean'], function() {
//     gulp.src([
//         fileRoot + "Tests/DataFireTesting/DataFireTestHost.NGGen/bin/DataFireTestHost.NGGen.TS/TS/**/*.ts",
//         fileRoot + "Tests/DataFireTesting/TSCommon/**/*.ts"
//     ])
//     .pipe(flatten({ includeParents: -1 }))
//     //.pipe(remapImports())
//     .pipe(gulp.dest("src/ig"));
// });