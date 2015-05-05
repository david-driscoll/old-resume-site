define([
    'thrust/util'
],
function (util)
{
    /**

    The Facade module offers the ability to create an interface or similar concept.
    With the Facade in thrust, it allows you to capture events from a module, when loaded via convention.
    Facades are mainly for use in thrust plugins.

    @module thrust
    @submodule Facade
    **/

    /**
    Facades are mainly for use in thrust plugins.

    Facade has these built in methods:
    * init
    * start
    * ready
    * stop
    * destroy

    Behind the scenes the facade methods, invoke any conventions loaded for the plugin.

    @class Facade
    **/

    var Facade,
        facadeMethods = ['init', 'start', 'ready', 'stop', 'destroy'],
        conventionFunctionFactory = function (name)
        {
            return function ()
            {
                var that = this;
                var returnValues = [];
                if (that.__conventions)
                {
                    return util.safeInvoke(that.__conventions, name, that, that.module);
                }
            };
        },
        methodWrap = function(method)
        {
            return function (f)
            {
                f.apply(this, arguments);
                return method.apply(this, arguments);
            };
        },
        defaultPrototype = {};


    for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
    {
        var method = facadeMethods[i];
        defaultPrototype[method] = conventionFunctionFactory(method);
    }

    /**
    Facade init

    Called during the init phase of a module startup.

    @method init
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade start

    Called during the start phase of a module startup.

    @method start
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade ready

    Called during the ready phase of a module startup.

    @method ready
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade stop

    Called during the init phase of a module startup.

    @method stop
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade destroy

    Called during the destroy phase of a module startup.

    @method destroy
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/


    return {
        createFacade: function(initMethod)
        {
            var Facade = function (module)
            {
                initMethod.apply(this, arguments);

                for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
                {
                    var method = facadeMethods[i];
                    if (this[method] !== defaultPrototype[method])
                    {
                        this[method] = util.wrap(this[method], methodWrap(defaultPrototype[method]));
                    }
                }

                this.module = module;
                this.init();
            };

            Facade.fn = Facade.prototype = util.extend({}, defaultPrototype);
            
            return Facade;
        }
    };
});