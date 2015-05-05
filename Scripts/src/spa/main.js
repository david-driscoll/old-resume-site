define([
    'require',
    'thrust',
    'thrust/util',
    'thrust/log',
    'davis',
    'jquery',
    'domReady'
],
function (require, Thrust, util, log, Davis, jQuery, domReady)
{
    var each = util.each,
        isString = util.isString,
        isArray = util.isArray,
        isFunction = util.isFunction,
        isObject = util.isObject,
        once = util.once,
        when = util.when,
        bind = util.bind,
        invoke = util.invoke,
        pluck = util.pluck,
        map = util.map,
        defer = util.defer,
        START = 'start';

    var SinglePageApp = function (/* $ref */ config, /* $ref : name */ instanceName)
    {
        // Need to build a shim for the jQuery methods Davis needs.
        if (!Davis.$) Davis.$ = jQuery;

        var config = config.spa,
            that = this;

        that.thrustInstanceName = instanceName;
        that.router = new Davis.App;

        that.loadRoutes(config.routes);

        domReady(that.router.start.bind(that.router));
    };

    SinglePageApp.prototype = {
        /**
        Loads routes into the spa instance

        Routes can be in 3 forms

            {
                '/path/to/:foo': 'path/to/module',
                '/path/to/:bar': ['path/to/module1', 'path/to/module2'],
                '/path/to/:fb': { path: 'path/to/module', args: ['args', 'to', 'hand off to start'] }
                '/path/to/:foo/:bar': function(){  custom handler }
            }

        @method loadRoutes
        @param {Object} routes Object of routes.
        **/
        loadRoutes: function (routes)
        {
            var that = this;
            each(routes, function (value, route)
            {
                if (isFunction(value))
                {
                    that.router.get(route, value);
                    // Run custom function in davis.
                }
                else if (isArray(value))
                {
                    var routeResult = map(value, that.__processRoute);

                    that.router.get(route, function (req)
                    {
                        invoke(routeResult, 'cb', req);
                    });

                    when.all(pluck(routeResult, 'promise'))
                        .then(bind(that.startModules, that, map(value, function(x)
                        {
                            return isObject(x) && x.args || [];
                        })));
                }
                else
                {
                    var routeResult = that.__processRoute(value);

                    that.router.get(route, routeResult.cb);
                    routeResult.promise.then(bind(that.startModules, that, value.args || []));
                }
            });
        },
        /**
        Process each route node depending if it is an object or string.

        @method __processRoute
        @param {Object|String} value The module or module + args to process.
        **/
        __processRoute: function(value)
        {
            var that = this,
                thenMethod = bind(that.startModules, that, value.args || []);

            if (isObject(value))
            {
                return that.routeGetModuleFactory(value.path, thenMethod);
            }
            else if (isString(value))
            {
                return that.routeGetModuleFactory(value, thenMethod);
            }
        },
        /**
        Creates a method that is handed off to the router
        When the route invokes that module, it will asyncronously load the given module, and return a promise for the result.

        @method routeGetModuleFactory
        @param {String} modulePath The path to the module
        @param {Function} themMethod The method that is called, after the function is resolved.
        @returns {Promise} The promise for when the module gets loaded.
        **/
        routeGetModuleFactory: function (modulePath, thenMethod)
        {
            var that = this,
                defer = when.defer(),
                resolved = false;

            return {
                cb: function (req)
                {
                    if (!resolved)
                    {
                        require([modulePath], function (m)
                        {
                            if (!that.thrust)
                                that.thrust = Thrust.getInstance(that.thrustInstanceName);

                            var module = that.thrust.createModule(modulePath, m);
                            defer.resolve(module);
                            resolved = true;
                        });
                    }
                    else
                    {
                        defer.then(thenMethod);
                    }
                },
                promise: defer.promise
            }
        },
        /**
        Starts the given modules, if only one module is passed in, it will start that individually.

        @method startModules
        @param {Array of Object} args to pass onto thrust's start method.
        @param {Array of Module|Module} modules The modules to start
        **/
        startModules: function (args, modules)
        {
            var that = this;

            if (!that.thrust)
                that.thrust = Thrust.getInstance(that.thrustInstanceName);

            if (isArray(modules))
            {
                each(modules, function (x)
                {
                    defer.apply(null, [that.thrust.start.bind(that.thrust), x.name].concat(args));
                });
            }
            else
            {
                defer.apply(null, [that.thrust.start.bind(that.thrust), modules.name].concat(args));
            }
        }
    };

    return SinglePageApp;
});