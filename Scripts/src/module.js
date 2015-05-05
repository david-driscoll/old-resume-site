define(['thrust/util', 'thrust/log'],
function (util, log)
{
    var type = util.type,
        format = util.format,
        thrustCache = {},
        /**
        Moves all properties, that should exist outside of the core, into

        @method moveToCore
        @private
        @param {Object} from Object to extract items from
        @param {Object} to Object to place items on
        @param {Array} list Items to move from to the other object
        **/
        moveToCore = function (from, to, list)
        {
            for (var i = 0, iLen = list.length; i < iLen; i++)
            {
                to[list[i]] = from[list[i]];
                delete from[list[i]];
            }
        },
        getEventNamespace = function (name, prefix)
        {
            if (!prefix) prefix = 'module-'; return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
        },
        __optionalMethods = [     // Optional methods that may be on a module
            'start',
            'stop',
            'ready'
        ];

    /**
    The module is the heart of the core, every module gets one facade per module.

    @class Module
    @param {Thrust} thrust The thrust instance
    @param {Object} def The module definition
    @param {String} [name] The module name.
    **/
    var Module = function (/* $ref */ thrust, def, name)
    {
        name = this.name = (name || def.name);
        this.instance = def;
        this.instance.name = (this.instance.name || name);

        if (!this.instance.name)
            throw new Error('All Modules must have a name!');

        // Modules must have an init method and a destroy method, it's up to the module developer to populate these methods.
        for (var i = 0, iLen = thrust.__requiredMethods.length; i < iLen; i++)
            if (!def[thrust.__requiredMethods[i]])
                throw new Error('Required "{0}" method not found on module "{1}"!'.format(thrust.__requiredMethods[i], name));

        // If the module name is undefined, bring the name into the module.
        if (util.type(def.name) === 'undefined')
            def.name = name;

        var mid = this.mid = util.uniqueId('m');
        var thrustModule = thrustCache[mid] = {
            _started: false,
            name: (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-'),
            module: this
        };

        var facades = thrustModule.facades = {};
        if (!thrust.__conventionPluckPropertiesCache) thrust.__conventionPluckPropertiesCache = util.flatten(util.pluck(thrust.__conventions || [], 'properties'));

        // Move all special properties off to the core's internal method.
        moveToCore(this.instance, thrustModule, thrust.__requiredMethods);
        moveToCore(this.instance, thrustModule, __optionalMethods);
        moveToCore(this.instance, thrustModule, thrust.__conventionPluckPropertiesCache);

        util.safeInvoke(thrust.__conventions, 'create', thrust, this, facades);

        this.__namespace = getEventNamespace(this.instance.name);

        this.thrust = thrust;
    };

    var callFacadeMethods = function (method, mid)
    {
        var results = [];
        for (var i in thrustCache[mid].facades)
        {
            var moduleCache = thrustCache[mid],
                facade = moduleCache.facades[i];
            log.debug(format('Core: Calling facade "{0}" {1}()', i, method));
            if (facade[method] && type(facade) === 'object')
                results.push(facade[method].call(facade));
        }
        return results;
    };

    Module.prototype = {
        /**
        Getter/Setter for convention methods.
        Gets the value convention property (defined in the properties array of a facade).
        Sets the value of a convention property (for storing convention configuration)

        @param {String} property The property to get or set
        @param {object} [value] The value to set
        @method convention
        @returns {Object} The valaue.
        **/
        convention: function (property, value)
        {
            if (typeof value !== 'undefined')
            {
                thrustCache[this.mid][property] = value;
                return;
            }
            return thrustCache[this.mid][property];
        },
        /**
        Injects this module into the given thrust instance.

        @method thrustCreate
        @param {Thrust} thrust The thrust instance.
        **/
        thrustCreate: function (thrust)
        {
            thrust.__injectModule(this);
        },
        /**
        Makes a call to all the modules facades
        The order of the call depends on the order required.
        During the startup stage (init, start, ready) facades are called first.
        During the shutdown state (stop, destroy) facades are called last.
        This allows modules to startup and shutdown will all the tools it had to begin with.

        @method coreCall
        @protected
        @param {String} method the method to call
        @param {Boolean} facadeAfter calls facade methods before or after module method.
        @param {Array} args Args to be passed onto the module method.
        **/
        coreCall: function (method, facadeAfter, args)
        {
            var results = [],
                that = this;
            if (!facadeAfter)
            {
                results.push(callFacadeMethods(method, that.mid));
            }

            var m = thrustCache[that.mid][method];
            if (m)
            {
                results.push(m.apply(that.instance, args));
            }

            if (facadeAfter)
            {
                results.push(callFacadeMethods(method, that.mid));
            }

            return util.flatten(results);
        },
        /**
        Start the module, inside the thrust container it was created on.

        @method start
        **/
        start: function ()
        {
            var that = this;
            that.thrust.start(that.name);
        },
        /**
        Stop the module, inside the thrust container it was created on.

        @method start
        **/
        stop: function ()
        {
            var that = this;
            that.thrust.stop(that.name);
        }
    };

    return Module;
});