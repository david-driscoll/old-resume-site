define([
    'thrust/log', 'thrust/util', 'thrust/config', './ignite', 'thrust/module', 'domReady', 'wire', 'module'
],
function (log, util, tConfig, igniteSpec, Module, domReady, wire, module)
{
    /**
        The thrust application!

    @module thrust
    @main thrust
    **/
    'use strict';

    var INIT = 'init',
        START = 'start',
        READY = 'ready',
        STOP = 'stop',
        DESTROY = 'destroy',
        COUNTDOWN = 'countdown',
        IGNITE = 'ignite',
        ORBIT = 'orbit',
        DEORBIT = 'deorbit',
        SPLASHDOWN = 'splashdown',
        memoize = util.memoize,
        when = util.when,
        type = util.type,
        slice = Array.prototype.slice,
        format = util.format;

    var timeStart = new Date().getTime();

    util.deepCopy(tConfig, module.config());

    /**
        The primary thrust class.
    
    @class Thrust
    @constructor
    @param {String} name The name of this thrust instance
    @returns {Thrust}
    **/
    var Thrust = function (/* $ref */ name)
    {
        this.name = name;
        this.modules = {};
        log.info(name);
    };

    //#region Runner Factories
    var runRunnerFactory, runnerFactory, allRunnerFactory;
    runRunnerFactory = memoize(function (method)
    {
        var conventionMethod = (method === STOP && START) || (method === DESTROY && INIT) || method,
            conventionValue = !(method === STOP || method === DESTROY),
            unsetReady = method === STOP,
            conventionCheck = conventionMethod !== method,
            conventionName = '{0}-status'.format(conventionMethod),
            runner = runnerFactory(method, conventionName, conventionValue, unsetReady),
            logMessage = ('Core: {0}ing module "{{0}}" failed!'.format());

        return function (name)
        {
            var that = this,
                mod = that.modules[name],
                args = slice.call(arguments, 1);

            if ((conventionCheck && mod.convention(conventionName)) || !mod.convention(conventionName))
            {
                if (tConfig.throwErrors)
                {
                    return runner(that, name, mod, args);
                }
                else
                {
                    try
                    {
                        return runner(that, name, mod, args);
                    }
                    catch (e)
                    {
                        log.error(format(logMessage, name), e, e.stack);
                    }
                }
            }
        };
    });

    runnerFactory = memoize(function (method, conventionName, conventionValue, unsetReady)
    {
        var eventName = 'thrust-module-{0}'.format(method),
            infoFormat = 'Thrust: {0}ing module "{{0}}"'.format(method.charAt(0).toUpperCase() + method.substring(1)),
            debugFormat = 'Thrust: Calling module "{{0}}" {0}()'.format(method),
            compAfter = method === STOP || method === DESTROY || false;

        return function (that, name, mod, args)
        {
            log.info(format(infoFormat, name));
            log.debug(format(conventionName, name));
            return when.all(mod.coreCall(method, compAfter, args)).then(function ()
            {
                that.core.fire(eventName, name);
                mod.convention(conventionName, conventionValue);
                if (unsetReady) mod.convention(READY + '-status', false);
            });
        };
    });

    allRunnerFactory = memoize(function (method)
    {
        var infoFormat = 'Thrust: {0}ing all autoStart modules...'.format(method.charAt(0).toUpperCase() + method.substring(1)),
            pluralName = 'thrust-{0}ing'.format(method),
            checkAutoStart = method === INIT || method === START;

        return function (that)
        {
            log.info(infoFormat);
            that.core.fire(pluralName);
            var modules = that.modules,
                results = [];

            util.each(modules, function(x, i)
            {
                if (!checkAutoStart || (checkAutoStart && x.convention('autoStart')))
                    results.push(that[method](i));
            });

            return results;
        };
    });
    //#endregion
    
    Thrust.prototype = Thrust.fn = {
        /**
            Required methods, that every module must implement.
    
        @property __requiredMethods
        @protected
        **/
        __requiredMethods: [     // Required methods that must be on every module
            'init',
            'destroy'
        ],
        /**
            Creates a new thrust module.

        @method create
        @param {String} name The unique module name.
        @param {Object} module The module defintion.
        @param {Boolean} preBuild Has this module been prebuilt, in other words has it been created, by wire.js and needs to be injected.
        @returns {Module} The new module instance.
        **/
        create: function (name, module, preBuilt)
        {
            log.debug(util.format('Thrust: Creating new instance of "{0}"', name));

            var oldModule;
            if (preBuilt)
            {
                oldModule = module;
                module = module.instance;
            }

            if (!preBuilt)
                module = new Module(this, module, name);
            else
                module = oldModule;

            // Modules cannot have duplicate names, choose a new one.
            if (this.modules[module.name])
                throw new Error('Duplicate module name "{0}".'.format(name));

            // m is the cores internal module.
            this.modules[module.name] = module;

            log.info(util.format('Core: Created module "{0}"', name));
            // Notify the core that a module has been created.
            this.core.fire('thrust-module-create', name);

            if (this.core.started && module.convention('autoStart'))
                this.core.start(module.name);

            return module;
        },
        //#region Global Runners
        /**
            Begins the countdown to thrusts start.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method countdown
        @async
        @returns {Promise} The promise of when the countdown is completed.
        **/
        countdown: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                util.safeInvoke(that.__conventions, COUNTDOWN, that),
                that.init()
            ]))
                .then(function () { that.core.fire('thrust-inited'); })
                .then(that.ignite.bind(that));
        },
        /**
            Begins the ingition as thrust starts up.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method ignite
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        ignite: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                util.safeInvoke(that.__conventions, IGNITE, that),
                that.start()
            ]))
                .then(function () { that.core.fire('thrust-started'); })
                .then(that.orbit.bind(that));
        },
        /**
            Thrust prepares for orbit.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method orbit
        @async
        @returns {Promise} The promise of when thrust is in orbit.
        **/
        orbit: function ()
        {
            var that = this;

            var domReadyDefer = when.defer();
            domReadyDefer.then(function () { that.core.fire('thrust-dom-ready'); });
            domReady(function () { domReadyDefer.resolve(); });

            return util.when.all(util.flatten([
                domReadyDefer.promise,
                util.safeInvoke(that.__conventions, ORBIT, that),
                that.ready()
            ]))
                .then(function () { that.core.fire('thrust-ready'); })
                .then(that.inOrbit.bind(that));
        },
        inOrbit: function ()
        {
            var that = this;

            var timeEnd = new Date().getTime();

            that.started = true;

            //alert('Started in ' + (timeEnd - timeStart) + 'ms');
            log.info('Started in ' + (timeEnd - timeStart) + 'ms');
        },
        /**
            Begins the deorbit as thrust shutdown.
            Shutdown can be deferred by returning a promise from any convention, or module method.

        @method deorbit
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        deorbit: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                that.stop(),
                util.safeInvoke(that.__conventions, DEORBIT, that)
            ]))
                .then(function () { that.core.fire('thrust-stopped'); })
                .then(that.orbit.bind(that));
        },
        /**
            Begins the splashdown as thrust shutdown.
            Shutdown can be deferred by returning a promise from any convention, or module method.

        @method splashdown
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        splashdown: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                that.stop(),
                util.safeInvoke(that.__conventions, SPLASHDOWN, that)
            ]))
                .then(function () { that.core.fire('thrust-destroyed'); })
                .then(that.orbit.bind(that));
        },
        //#endregion
        //#region Module runners
        /**
            Begins the initalization process for a module.  This runs as part of the
                countdown phase, during start up, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method init
        @param {String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be inited.
        @returns {Promise} The promise of when the init is completed.
        **/
        init: memoize(function (name)
        {
            var that = this, method = INIT;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            return when.all(util.flatten(runRunnerFactory(method).apply(that, arguments)));
        }),
        /**
            Begins the startup process for a module.  This runs as part of the
                ignite phase, during start up, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method start
        @param {String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        start: function (name)
        {
            var that = this, method = START;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            var items = [],
                mod = that.modules[name];

            if (!mod.convention(INIT + '-status'))
            {
                items.push(that.init.apply(that, arguments));
            }

            items.push(runRunnerFactory(method).apply(that, arguments));

            if (that.started)
            {
                items.push(that.ready.apply(that, arguments));
            }

            return when.all(util.flatten(items));
        },
        /**
            Begins the ready process for a module.  This runs as part of the
                orbit phase, during ready, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method ready
        @param {String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        ready: function (name)
        {
            var that = this, method = READY;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            var items = [],
                mod = that.modules[name];
            if (!mod.convention(START + '-status'))
            {
                items.push(that.start.apply(that, arguments));
            }

            items.push(runRunnerFactory(method).apply(that, arguments));

            return when.all(util.flatten(items));
        },
        /**
            Begins the stop process for a module.  This runs as part of the
                deorbit phase, during stop, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method stop
        @param {String} [name] The name of the module.  If name is null, all modules
            will be stopped.
        @returns {Promise} The promise of when the stop is completed.
        **/
        stop: function (name)
        {
            var that = this, method = STOP;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            return util.flatten(runRunnerFactory(method).apply(that, arguments));
        },
        /**
            Begins the destroy process for a module.  This runs as part of the
                slashdown phase, during destroy, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method destroy
        @param {String} [name] The name of the module.  If name is null, all modules
            will be destroyed.
        @returns {Promise} The promise of when the destroy is completed.
        **/
        destroy: function (name)
        {
            var that = this, method = DESTROY;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            if (!module.convention(STOP + '-status'))
            {
                this.stop.apply(that, arguments);
            }

            return util.flatten(runRunnerFactory(method).apply(that, arguments));
        },
        //#endregion
        /**
            Injects a preconstructed module into the thrust instance.

        @method __injectModule
        @private
        @param {Module} module The module to inject.
        **/
        __injectModule: function (module)
        {
            this.create(module.name, module, true);
        },
        /**
        Creates a module from the given definition object, with the given name.

        @method createModule
        @param {String} name The module name
        @param {Object} moduleDefn The module definition
        **/
        createModule: function (name, moduleDefn)
        {
            var that = this;
            if (that.modules[name]) return that.modules[name];

            var module = new Module(that, moduleDefn, name);

            that.__injectModule(module);

            return module;
        }
    };

    var instances = {};
    /**
        Initalizes a new Thrust instance based on the given settings.

    @method launch
    @static
    @param {Object} settings The module to inject
    **/
    Thrust.launch = function (settings)
    {
        var setupDefer = util.when.defer();

        setupDefer.then(function (context)
        {
            var thrust = context.thrust;
            instances[thrust.name] = thrust;
            thrust.config = settings;
            thrust.countdown();

            return context;
        })
        .then(function (context)
        {
            window.thrust = context.thrust;
        });

        wire(igniteSpec(settings)).then(setupDefer.resolve);

        return setupDefer.promise;
    };

    /**
    Gets a named thrust stance if it exists.

    @method getInstance
    @static
    @param {String} name The instance name
    **/
    Thrust.getInstance = function (name)
    {
        return instances[name] || false;
    };

    /**
    Creates a new module and hands it off to the given instance, if that instance exists.

    @method createModule
    @static
    @param {String} instanceName The thrust instance name
    @param {String} name The module name
    @param {Object} moduleDefn The module definition
    **/
    Thrust.createModule = function (instanceName, name, moduleDefn)
    {
        var instance = Thrust.getInstance(instanceName);
        if (instance)
        {
            var module = new Module(that, moduleDefn, name);
            instance.__injectModule(module);
            return module;
        }
    };

    return Thrust;
});
