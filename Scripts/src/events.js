define([
    'thrust/util', 'thrust/log', 'thrust/config'
],
function (util, log, tConfig)
{
    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @module thrust
    @submodule Events
    **/

    'use strict';
    //     Backbone.js 0.9.1
    //     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Backbone may be freely distributed under the MIT license.
    //     For all details and documentation:
    //     http://backbonejs.org

    var slice = Array.prototype.slice,
        format = util.format,
        asyncFire,
        when = util.when,
        size = util.size,
        each = util.each,
        extend = util.extend;

    var eventSplitter = /\s+/, _trigger, triggerCallback, triggerAsyncCallback, triggerNodes, ALL = 'all', STARALL = '*all', normalizeEvents, getNamespaceData, _offProcessNode;
    /**
    Normalizes the given events to the expected namespace.

    @method normalizeEvents
    @private
    @param {String} events The events delimited by a space
    @param {String} namespace The namespace, including prefixed '.'
    **/
    normalizeEvents = function (events, namespace)
    {
        events = events.split(eventSplitter);
        for (var i = 0, iLen = events.length; i < iLen; i++)
        {
            events[i] = events[i] + namespace;
        }
        return events.join(' ');
    };

    /**
    Trigger one or many events, firing all bound callbacks. Callbacks are
    passed the same arguments as `trigger` is, apart from the event name
    (unless you're listening on `"all"`, which will cause your callback to
    receive the true name of the event as the first argument).

    @method _trigger
    @private
    @param {Boolean} async Fire event async or sync
    @param {Object} events The events to be fired.
        delimited by a space.
    @param [args]* The arguments to pass onto the callback methods.
    @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
             If sync then returns an array of the return values.
             If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    _trigger = function (async, events)
    {
        var that = this, event, node, calls, tail, args, all, rest, namespace, rVals = {}, rVal, onceNodes;
        if (!(calls = this._callbacks)) return that;
        all = calls.all;
        events = events.split(eventSplitter);
        rest = slice.call(arguments, 2);

        while (event = events.shift())
        {
            if (node = calls[event])
            {
                rVal = triggerNodes(that, event, async, node, rest);
                rVals[event] = async ? when.all(rVal) : rVal;
            }
            if (node = all)
            {
                triggerNodes(that, ALL, async, node, [event].concat(rest));
            }
        }

        if (size(rVals) === 1)
            for (var i in rVals)
                return rVals[i];
        return rVals;
    };

    /**
    Triggers all events on a node.
    Also unbinds any node that is set to only be called once.

    @method triggerNodes
    @private
    @param {Object} that The event container context.
    @param {String} event The event to be bound or unbound.
    @param {Boolean} async Fire event async or sync
    @param {Object} node The node linked list.
    @param {Array} args The arguments to pass onto the triggered nodes

    **/
    triggerNodes = function (that, event, async, nodeList, args)
    {
        var tail, rVals = [], onceNodes = [];

        each(nodeList, function (node)
        {
            tail = node.tail;
            while ((node = node.next) !== tail)
            {
                rVals.push(triggerCallback(async, node.callback, node.context || that, args));
                node.once && onceNodes.push(node);
            }
        });
        if (onceNodes.length) each(onceNodes, function (x) { that.unsubscribe(event, x.callback, x.context, x.namespace); });

        return rVals;
    };

    /**
    Invokes a trigger callback

    @method triggerCallback
    @private
    @param {Boolean} async Fire event async or sync
    @param {Function} callback The callback method
    @param {Object} context The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Object} The returned value.
        For async calls, this is a promise
        For sync calls this is the value from the method.
    **/
    triggerCallback = function (async, callback, context, args)
    {
        if (async)
        {
            return when.delay(0).then(triggerAsyncCallback(callback, context, args));
        }
        else
        {
            try { return callback.apply(context, args); }
            catch (e) { if (tConfig.throwErrors) throw e; }
        }
    };

    /**
    Creates an async event handler

    @method asyncEventFactory
    @private
    @param {Function} callback The callback method
    @param {Object} that The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Function} The callback for the given arguments.
    **/
    triggerAsyncCallback = function (callback, context, args)
    {
        return function ()
        {
            return callback.apply(context, args);
        };
    };

    /**
    Resubscribes to the appropriate events

    @method _offProcessNode
    @private
    @param {Object} that The event context
    @param {String} event The event
    @param {Object} node The node linked list.
    @param {Function} [callback] The event callback to unsubscribe
    @param {Object} [context] The event context to unsubscribe
    @param {String} [namespace] The namespace to unsubscribe
    **/
    _offProcessNode = function (that, event, node, callback, context)
    {
        var tail, cb, ctx, ns;
        tail = node.tail;
        while ((node = node.next) !== tail)
        {
            cb = node.callback;
            ctx = node.context;
            ns = node.namespace;
            if ((callback && cb !== callback) || (context && ctx !== context))
            {
                that.subscribe(event + (ns && ('.' + ns) || ''), cb, ctx);
            }
        }
    };

    /**
    Gets the namespace information, the real event to pass back onto the methods.

    @method getNamespaceData
    @private
    @param {String} event The event to capture namespace data from.
    @returns {Object} Containing event and namespace.
    **/
    getNamespaceData = function(event)
    {
        var nsIndex = (event || '').indexOf('.'),
            hasNs = nsIndex > -1,
            namespace = hasNs ? event.substring(nsIndex + 1) : undefined,
            event = hasNs ? event.substring(0, nsIndex) : event;

        if (nsIndex === 0)
            event = STARALL;

        return { event: event, namespace: namespace };
    };

    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @class Events
    **/
    var Events = {
        /**
        Bind one or more space separated events, `events`, to a `callback`
        function. Passing `"all"` will bind the callback to all events fired.

        @method subscribe
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @param {Boolean} once Call this event only once.
        @chainable
        **/
        subscribe: function (events, callback, context, once)
        {
            var calls, event, node, tail, list, nd;
            this.__namespace && (events = normalizeEvents(events, this.__namespace));

            events = events.split(eventSplitter);
            calls = this._callbacks || (this._callbacks = {});

            // Create an immutable callback list, allowing traversal during
            // modification.  The tail is an empty object that will always be used
            // as the next node.
            while (event = events.shift())
            {
                nd = getNamespaceData(event);
                event = nd.event;
                list = calls[event] || (calls[event] = {});
                list = list[nd.namespace];
                node = list ? list.tail : {};
                node.next = tail = {};
                node.context = context;
                node.callback = callback;
                node.namespace = nd.namespace;
                node.once = once;
                calls[event][nd.namespace] = { tail: tail, next: list ? list.next : node };
            }

            return this;
        },
        /**
        Bind one or more space separated events, `events`, to a `callback`
        function. Passing `"all"` will bind the callback to all events fired.

        Each event will only be called once.

        @method once
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @chainable
        **/
        once: function (events, callback, context)
        {
            return this.subscribe(events, onceCallback, context, true);
        },
        /**
        Remove one or many callbacks. If `context` is null, removes all callbacks
        with that function. If `callback` is null, removes all callbacks for the
        event. If `event` is null, removes all bound callbacks for all events.

        @method unsubscribe
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @chainable
        **/
        unsubscribe: function (events, callback, context)
        {
            var event, calls, node, nd, ourNs, namespace, that = this, hasNs;

            ourNs = that.__namespace; ourNs && (ourNs = ourNs.substring(1));
            // No events, or removing *all* events.
            if (!(calls = that._callbacks)) return;
            if (!(events || callback || context))
            {
                if (!ourNs)
                    delete that._callbacks;
                else
                {
                    var cbs = that._callbacks;
                    for (var i in cbs)
                    {
                        delete cbs[i][ourNs];
                        if (size(cbs[i]) === 0) delete cbs[i];
                    }
                }
                return that;
            }

            // Loop through the listed events and contexts, splicing them out of the
            // linked list of callbacks if appropriate.
            ourNs && (events = normalizeEvents(events, that.__namespace));
            events = events ? events.split(eventSplitter) : _.keys(calls);
            while (event = events.shift())
            {
                nd = getNamespaceData(event);
                event = nd.event;
                namespace = nd.namespace;
                hasNs = !!namespace;
                if (!ourNs)
                {
                    node = calls[event];
                    delete calls[event];
                }
                else if (calls[event])
                {
                    node = calls[event][ourNs];
                    delete calls[event][ourNs];
                    if (size(calls[event]) === 0) delete calls[event];
                }
                if (!node || !(callback || context)) continue;

                /*if (event !== STARALL)
                {
                    node = calls[event];
                    delete calls[event];
                    if (!node) continue;
                }*/
                if (event !== STARALL && !callback)
                {
                    _offProcessNode(that, event, node, callback, context);
                }
                else if (event === ALL || !callback)
                {
                    for (var i in calls)
                    {
                        if (hasNs)
                        {
                            delete calls[i];
                        }
                        else
                        {
                            node = calls[i];
                            delete calls[i];
                            _offProcessNode(that, i, node, callback, context);
                        }
                    }
                }
                else
                {
                    _offProcessNode(that, event, node, callback, context);
                }
            }
            return that;
        },
        /**
            Trigger one or many events, firing all bound callbacks. Callbacks are
            passed the same arguments as `trigger` is, apart from the event name
            (unless you're listening on `"all"`, which will cause your callback to
            receive the true name of the event as the first argument).
        
            @method fire
            @param {Object} events The events to be fired.
                delimited by a space.
            @param [args]* The arguments to pass onto the callback methods.
            @returns {Array of Values} If more than on event is fired, an Object of Arrays is returned.
        **/
        fire: function (events)
        {
            return _trigger.apply(this, [false].concat(slice.call(arguments)));
        },
        __pubSubName: 'Events',
        /**
        Init's the Event module.
        This is only required if you wish to use fire.async, and namespacing.

        @method initEvents
        @chainable
        **/
        initEvents: function ()
        {
            this.publish = this.fire = Events.fire.bind(this);
            this.fire.async = asyncFire.bind(this);
            this.initEvents = null;
            this.__pubSubName = this.name || 'Events';
            if (this.name && !this.__namespace) this.__namespace = '.' + this.name;

            return this;
        },
        /**
        Extends Events into the given object.

        @method extend
        @param {Object} to The object ot extend events onto
        @param {Boolean} [init] Optionally init the events.
        **/
        extend: function (to, init)
        {
            extend(to, Events);
            delete to.extend;
            init && to.initEvents();
        }
    };

    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        fire.async runs its events immediately.
    
        @method fire.async
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @async
        @returns {Array of Promise} If more than on event is fired, an Object of Promise Arrays is returned.
    **/
    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        publish.async runs its events immediately.
        publish.async is an alias for fire.
    
        @method publish.async
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @async
        @returns {Array of Promise} If more than on event is fired, an Object of Promise Arrays is returned.
    **/
    asyncFire = function (events)
    {
        return _trigger.apply(this, [true].concat(slice.call(arguments)));
    };

    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        publish is an alias for fire.
    
        @method publish
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
                 If sync then returns an array of the return values.
                 If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    Events.publish = Events.fire;

    return Events;
});
