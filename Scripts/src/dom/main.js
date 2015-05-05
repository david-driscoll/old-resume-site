define([
    'jquery',
    'thrust/util',
    'thrust/log',
    './jquery.interface',
    'thrust/facade',
    'thrust/events'
],
function (jQuery, util, log, jQueryInterface, facade, events)
{
    'use strict';
    //#region Variable declaration
    var format = util.format,                   // string format method
        extend = util.extend,                   // Object extend method
        type = util.type,                       // Object type method
        proxy = util.proxy,                     // Function context proxy method
        hasOwn = Object.prototype.hasOwnProperty,   // Quick reference to hasOwnProperty
        isObject = util.isSimpleObject,         // Is object method
        slice = Array.prototype.slice,
        when = util.when,
        initContext = jQueryInterface.initContext,
        updateInternals = jQueryInterface.updateInternals,
        updatePrototype = jQueryInterface.updatePrototype,
        Dom, CoreDOMMethods, DomPrototype;
    //#endregion

    //#region DataFacade
    var DomFacade = facade.createFacade(function (module, parent, context, fake)
    {
        this.name = parent.name;
        //this.module = module;
        //this.parent = parent;
        this.__conventions = parent.__conventions;
        //this._callbacks = parent._callbacks;
        //this.initEvents();

        // We're building a dom selector, aka jquery wrapper
        if (context && fake)
        {
            // Reference the parent module.
            this._parentDom = parent._parentDom;
            if (this._parentDom)
            {
                // Init the context
                initContext.call(this, context);
            }
        }
        else
        {
            log.debug('Dom: Creating new Dom facade');
            this._parentDom = this;
            this._rootContext = true;

            this.changeContext(document);

            createFacade(this);
            this._internalEvents = [];
        }
    });
    util.extend(DomFacade.fn, {
        init: function (fake)
        {
            this._internalEvents = this._internalEvents || [];
            log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.namespace, fake ? 'fake ' : ''));
            return this;
        },
        start: function ()
        {
            log.debug(format('Dom[{0}]: Starting Dom facade', this.namespace));
        },
        stop: function ()
        {
            log.debug(format('Dom[{0}]: Stopping Dom facade', this.namespace));

            for (var i = this._internalEvents.length - 1; i >= 0; i--)
            {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                this.changeContext(sub.context);
                this.off.apply(this, (util.isArray(sub)) ? sub : (util.isArray(sub.args)) ? sub.args : []);
            }
        },
        destroy: function ()
        {
            if (this._rootContext)
            {
                log.debug(format('Dom[{0}]: Destroying Dom facade', this.namespace));
                delete this._internalEvents;
            }

            this._context = null;
            delete this._context;
        }
    });
    //#endregion

    var createFacade = function (dom)
    {
        if (!dom.query)
            dom.query = function (context)
            {
                if (type(context) !== 'undefined')
                    return new DomFacade(dom.module, dom, context, true);
                return dom;
            }.bind(dom);
        return dom.query;
    };

    // This method updates the internals, to mimic jQuery
    var normalizeEvents = function (events, namespace)
    {
        /// <summary>Normalizes events to take on the namespace of the parent.</summary>
        if (type(events) === 'object')
        {
            // Handles key value paris of events to handlers.
            for (var i in events)
            {
                events[i + namespace] = events[i];
                delete events[i];
            }
            return events;
        }
        else
        {
            // Handle absense of an event, pass our namespace.
            if (!events)
                return namespace;

            // Split the events up
            events = events.split(' ');
            for (var i = 0, iLen = events.length; i < iLen; i++)
            {
                // Add our custom events
                events.push(events[i] + namespace);
            }
            // Grab the new half of the array that we care aout.
            return events.slice(events.length / 2).join(' ');
        }
    };

    DomPrototype = {
        changeContext: function (selector)
        {
            log.info(format('Dom[{0}]: Changing Dom context', this.namespace));
            updateInternals.call(this, selector);
            return this;
        },
        on: function (events)
        {
            log.debug(format('Dom[{0}]: Binding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        },
        one: function (events)
        {
            log.debug(format('Dom[{0}]: Binding one events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.one.apply(this._context, args);
            return this;
        },
        off: function (events)
        {
            log.debug(format('Dom[{0}]: Unbinding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        }
    };

//    updatePrototype(DomFacade.fn, DomFacade);
    updatePrototype(DomPrototype, DomFacade);
    util.extend(DomFacade.fn, DomPrototype);
    DomFacade.fn.$ = DomFacade.fn.find;

    //#region Dom
    Dom = function (/* $ref */ name, /* $ref */ core)
    {
        /// <summary>The Dom</summary>
        // Enforce new
        if (!(this instanceof Dom))
            return new Dom(name, core);

        if (!name)
            throw new Error('Data: module name must be defined.');

        log.debug('Data: Creating new Data');

        this.core = core;
        this._callbacks = this.core._callbacks;
        this.initEvents();
        this.name = name;

        /*this._parentDom = this;
        this._rootContext = true;

        createFacade(this);
        this._internalEvents = [];
        this.changeContext(document);*/
    };

    Dom.prototype = Dom.fn = util.extend({}, DomPrototype,
    {
        createFacade: function (module)
        {
            return new DomFacade(module, this, document);
        }
    }, events);

    //#endregion

    return Dom;
});
