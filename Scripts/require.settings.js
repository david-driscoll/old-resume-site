require.config({
    baseUrl: '/Scripts',
    paths: {
        //#region lib References
        'require': 'thrust-js/lib/requirejs/require',         // Quick reference for requirejs
        'lodash': 'thrust-js/lib/lodash/lodash',
        'aop': 'thrust-js/lib/aop/aop',
        //#endregion
        //#region References for RequireJs
        'text': 'thrust-js/lib/text/text',
        'i18n': 'thrust-js/lib/i18n/i18n',
        'domReady': 'thrust-js/lib/domReady/domReady',
        'doT': 'thrust-js/lib/doT/doT',
        'sizzle': 'thrust-js/lib/sizzle/sizzle',
        'jquery': 'thrust-js/lib/jquery/dist/jquery',
        'davis': 'thrust-js/lib/davis/davis'
        //#endregion
    },
    packages: [
        { name: 'thrust', location: 'thrust-js/src' },
        { name: 'thrust/util', location: 'thrust-js/src/util' },
        { name: 'thrust/core', location: 'thrust-js/src/core' },
        { name: 'thrust/data', location: 'thrust-js/src/data' },
        { name: 'thrust/dom', location: 'thrust-js/src/dom' },
        { name: 'thrust/template', location: 'thrust-js/src/template' },
        { name: 'thrust/spa', location: 'thrust-js/src/spa' },
        { name: 'wire', main: 'wire', location: 'thrust-js/lib/wire' },
        { name: 'when', main: 'when', location: 'thrust-js/lib/when' }
    ],
    shim: {
        'davis': {
            deps: ['jquery'],
            exports: 'Davis'
        }
    },
    config:
    {
        'thrust': {
            modules: [
                //'module/home', 'module/about'
            ],
            spa: {
                routes: {
                    '/': 'module/home',
                    '/:path': 'module/:path'
                }
            }
        }
    }
});

require(['main']);