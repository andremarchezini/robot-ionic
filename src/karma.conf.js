// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (config) {
    config.set({
        // files: ['src/**/*.js', 'test/**/*.js'],
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'), require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'), require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            // require('karma-coverage')
        ],
        client: { clearContext: false },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../coverage/frontend/'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
        // preprocessors: { 'src/**/*.js': ['coverage'] },
        // coverageReporter: { type: 'html', dir: 'coverage/frontend/' },
        port: 9876, colors: true, logLevel: config.LOG_INFO, autoWatch: true,
        browsers: ['Chrome'],
        customLaunchers: {
            ChromeNoSandbox: { base: 'Chrome', flags: ['--no-sandbox'] }
        },
        singleRun: true
    });
};