define(function ()
{
    /**
    Provides thrust configuration
    
    @module thrust
    @submodule config
    **/
    'use strict';

    var config = {
        /**
        This property, tells the framework if it should throw errors or not.
        In production it's recommended not to throw errors, that way if a component fails
        there is a chance the application can still recover.

        @for config
        @property throwErrors
        @readOnly
        @type {Boolean}
        @default false
        **/
        throwErrors: true,
        /**
        Tells the framework to operate in framework to operate in debug mode, with more verbose problem solving.

        @property debug
        @readOnly
        @type {Boolean}
        @default false
        **/
        debug: true,
        url: {
            /**
            This property, gives the framework it's default path, if different than '/'
            
            @property url.path
            @readOnly
            @type {String}
            @default "/"
            **/
            path: '/',
            /**
            This property, tells the framework how it should encode array form data.
            In general, for ASP.NET based applications, traditional should be true.
            For Ruby/Python based applications, this should be false.
            
            @property url.traditionalEncoding
            @readOnly
            @type {Boolean}
            @default false
            **/
            traditionalEncoding: true
        },
        log: {
            /**
            This lends to the log level of thrust.

                ERROR: 1
                WARN: 2
                INFO: 3
                DEBUG: 4
            
            @property log.level
            @readOnly
            @type {String}
            @default 1
            **/
            level: 4,
            /**
            This toggles enabling on or off.
            
            @property log.enabled
            @readOnly
            @type {Boolean}
            @default false
            **/
            enabled: true
        },
        /**
        Plugins for thrust to load, override with your own set if you have a different set.

        @property plugins
        @readOnly
        @type {Array}
        **/
        plugins: [
            'thrust/core',
            'thrust/data',
            'thrust/dom',
            'thrust/template',
            'thrust/spa',
        ],
        /**
        The set of modules to preload with the inital wireup of the Thrust core.

        @property modules
        @readOnly
        @type {Array}
        **/
        modules: [],
        /**
        The set of configuration options for the thrust/core plugin

        @property core
        @readOnly
        @type {Object}
        **/
        core: {
            /**
            The set of conventions to load into thrust/core.

            @property core.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/core/convention/facade',
                'thrust/core/convention/container',
                'thrust/core/convention/subscription',
                'thrust/core/convention/autostart'
            ]
        },
        /**
        The set of configuration options for the thrust/dom plugin

        @property dom
        @readOnly
        @type {Object}
        **/
        dom: {
            /**
            The set of conventions to load into thrust/dom.

            @property dom.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/dom/convention/facade',
                'thrust/dom/convention/action',
                'thrust/dom/convention/context',
                'thrust/dom/convention/event'
            ]
        },
        /**
        The set of configuration options for the thrust/data plugin

        @property data
        @readOnly
        @type {Object}
        **/
        data: {
            /**
            Decides if thrust/data should cache requests or not, useful to be turned for debugging.

            @property data.cache
            @readOnly
            @type {Boolean}
            @default true
            **/
            cache: true,
            /**
            startTimeout is a queueing method built into thrust/data.
                The concept here is, that the call to get data, doesn't immediately fire to the server.
                Instead it waits for a set duration, to see if any other requests are made from any other
                modules.  This allows multiple calls off to the server to be syncronized, and helps keep
                UI changes done as syncronusly as possible, giving the UI a uniform behaviour.

            @property data.startTimeout
            @readOnly
            @type {Number}
            @default 500
            **/
            startTimeout: 500,
            /**
            finishTimeout is a queueing method built into thrust.data
                The concept here is to keep on with the concept of startTimeout.  If for some reason, one
                of the inital requests is taking to long to complete, the plugin will always return the
                finished requests within this amount of time.  The concept keeps the application working,
                even when one or more components are potentially having issues.

            @property data.finishTimeout
            @readOnly
            @type {Number}
            @default 2000
            **/
            finishTimeout: 2000,
            /**
            The set of conventions to load into thrust/dom.

            @property data.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/data/convention/facade',
                'thrust/data/convention/start'
            ]
        },
        /**
        The set of configuration options for the thrust/template plugin

        @property template
        @readOnly
        @type {Object}
        **/
        template: {
            /**
            The set of conventions to load into thrust/dom.

            @property template.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/template/convention/template',
            ],
            /**
            Maps the available templates, to their appropriate module name.

            **precompiled is a special case, and those methods are expected to be code built functions.

            @property template.types
            @readOnly
            @type {Object}
            **/
            types: {
                'kendo': 'path/to/kendo',
                'doT': 'doT',
                'precompiled': true
            },
            /**
            The default template type, used when extension isn't given.

            @property template.defaultType
            @readOnly
            @type {String}
            @default 'doT'
            **/
            defaultType: 'doT',
            /**
            The base location, relative to the application path for template location.
            If template paths are given relative to application path, this can be left empty.

            @property template.baseUrl
            @readOnly
            @type {String}
            @default ''
            **/
            baseUrl: '',
            /**
            Defines the extension used for templates stored on the server.

            @property template.extension
            @readOnly
            @type {String}
            @default '.tmpl'
            **/
            extension: '.tmpl'
        },
        spa: {
            conventions: [],
            routes: {}
        }
    };

    return config;
});