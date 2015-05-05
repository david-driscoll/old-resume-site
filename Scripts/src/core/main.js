define([
    'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade'
],
function (util, log, Events, facade)
{
    'use strict';
    // Variable declaration.
    var format = util.format,   // string format method
        extend = util.extend,   // object extension method
        type = util.type,       // object type method
        when = util.when,
        memoize = util.memoize,
        core,
        slice = Array.prototype.slice;

    //#region Facade
    /**
    Creates a new core facade for the given module.

    @class thrust-core-CoreFacade
    **/
    var CoreFacade = facade.createFacade(function (module, parent)
    {
        this.name = module.name;
        this.module = module;
        this.parent = parent;
        this.__conventions = parent.__conventions;
        this._callbacks = parent._callbacks;
        this.initEvents();
    });
    util.extend(CoreFacade.fn, Events);

    /**
    During the start of a core facade, start creates the internal subscriptions array.

    @for thrust-core-CoreFacade
    @method start
    **/
    CoreFacade.fn.init = CoreFacade.fn.start = function ()
    {
        if (!this._internalSubscriptions)
            this._internalSubscriptions = [];
    };

    CoreFacade.fn.subscribe = function (events, callback, context)
    {
        this._internalSubscriptions.push({ events: events, callback: callback, context: context });
        Events.subscribe.call(this, events, callback, context);
    };

    CoreFacade.fn.stop = function (facade)
    {
        var module = facade.module;

        if (this._internalSubscriptions)
        {
            for (var i = this._internalSubscriptions.length - 1; i >= 0; i--)
            {
                var sub = this._internalSubscriptions[i];
                this.unsubscribe(sub.events, sub.callback, sub.context);
            }
            delete this._internalSubscriptions;
        }
    }

    //#endregion
    // Our default namespace prefix.

    /**
    Core class.
    This creates a instance of the core, for use inside thrust.

    @class thrust-core-Core
    @param {String} name The name of the core.
    **/
    var Core = function (/* $ref */ name)
    {
        if (!(this instanceof Core))
            return new Core(name);

        var that = this;
        that.name = name;
        log.debug('Core: Creating new Core {0}'.format(name));

        that.initEvents();

        that.subscribe('thrust-ready', function ()
        {
            log.info('Core: Ready!');
        });

        that.subscribe('thrust-navigate', function (path)
        {
            if (path === window.location.pathname)
                window.location.reload();
            window.location = util.fixupUrl(path);
        });
    };

    var CorePrototype = {
        /**
        Creates a new CoreFacade, based on the given module.

        @for thrust-core-Core
        @method createFacade
        @param {Module} moduleDefn The module to create the facade for.
        **/
        createFacade: function (moduleDefn)
        {
            return new CoreFacade(moduleDefn, this);
        }
    };

    util.extend(CorePrototype, Events);

    // Extend our prototype to include the prototype generated above.
    Core.prototype = Core.fn = CorePrototype;

    return Core;
});
