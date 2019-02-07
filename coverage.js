var fs = require('fs');
var COVERAGE_FILE = 'coverage/frontend/index.html';
var results = []
var min_statementes = 100;
var min_branches = 98;
var min_functions = 100;
var min_lines = 100;

getCoverageValues().then(
    () => {
        checkCoverageValues().then(
            () => process.exit(),
            (error) => {
                console.log("************************************************");
                console.log(error);
                console.log("************************************************");

                process.exit(1);
            }
        );
    });

function getCoverageValues() {
    return new Promise((resolve, reject) => {
        console.log('Getting coverage values...')
        var arrayFile = fs.readFileSync(COVERAGE_FILE).toString().split('\n');
        var coverageValues = 0;
        if (arrayFile.length <= 0) {
            reject();
        }
        for (i in arrayFile) {
            if (arrayFile[i].includes('strong')) {
                var result = arrayFile[i].trim().replace('<span class="strong">', '').replace('% </span>', '');
                results.push(result);
                console.log(result);
                coverageValues++;
                if (coverageValues === 4) {
                    i = arrayFile.length;
                }
            }
        }
        return resolve();
    })
}

function checkCoverageValues() {
    return new Promise((resolve, reject) => {
        console.log('Checking coverage values...')
        var statements = parseFloat(results[0]);
        var branches = results[1];
        var functions = results[2];
        var lines = results[3];
        var name = null;
        var score = null;

        if (statements < min_statementes) {
            name = 'statements';
            score = statements;
        }
        if (branches < min_branches) {
            name = 'branches';
            score = branches;
        }
        if (functions < min_functions) {
            name = 'functions';
            score = functions;
        }
        if (lines < min_lines) {
            name = 'lines';
            score = lines;
        }

        if (name) {
            return reject(name + ' coverage does not suffice ' + score + "%");
        }

        console.log("\n\n************************************************\n");
        console.log('Congratulations! Your test coverage if sufficient');
        console.log("\n************************************************\n\n");

        return resolve();
    })
}