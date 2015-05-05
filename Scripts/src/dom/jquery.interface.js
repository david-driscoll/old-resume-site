define(['jquery'],
function (jQuery)
{
    var jQueryMethodsToIgnore = ['constructor', 'init', 'selector', 'jquery', 'ready', 'extend', 'queue', 'dequeue', 'clearQueue', 'promise', 'bind', 'unbind', 'live', 'die', 'delegate', 'undelegate', 'blur', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'error', 'domManip', 'serialize', 'serializeArray', 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend', '_toggle', 'fadeTo', 'stop', 'slideDown', 'slideUp', 'slideToggle', 'fadeIn', 'fadeOut', 'fadeToggle', /* These methods are here because we build a custom one that does the job with name spaced events */'on', 'off', 'one'],
        slice = Array.prototype.slice;

    //#region jQuery Interface Layer
    var updateInternals = function (selector)
    {
        if (selector)
            this._context = jQuery(selector);
        this.context = this._context.context;
        this.selector = this._context.selector;

        // Lazily remove missing sudo-array elements.
        for (var i = this.length || 0, iLen = this._context.context; i < iLen; i++)
            delete this[i];

        this.length = this._context.length;
        for (var i = 0, iLen = this.length; i < iLen; i++)
            this[i] = this._context[i];
    };

    var initContext = function (context)
    {
        // If the context is a jQuery context, reference that.
        // If it isn't a jQuery context, run it through jQuery.
        this._context = context instanceof jQuery ? context : jQuery(context);

        // Keep a cache of all dom selectors, for clean up later.
        //if (this._parentDom && this._parentDom !== this) this._parentDom._internalQueries.push(this);

        // Update the internals to match the mimicing of jQuery.
        updateInternals.call(this);
    };

    var someFilter = function (i) { return function (e, index) { return e === i; }; },
    // Wraps a jQuery method, with our own version of it.
        methodFactory = function (method, DomFacade)
        {
            // Returns a method, that unwraps any CoreDom facade objects
            // Then it hands it off to jQuery.
            // Analysing the response, we decide if jQuery gave us one of the following:
            //        A jQuery instance, then we decide if it is:
            //            a new instance, eg .children()
            //            the same instance, eg .css()
            //        Returned data, eg .position() or .is()
            //            Return that data.
            return function ()
            {
                // Search all arguments, if we find a CoreDOM, unwrap it to the jQuery context.
                // jQuery doesnt understand CoreDOM wrappers, it only understands jQuery.
                var args = slice.call(arguments);
                for (var i = 0, iLen = args.length; i < iLen; i++)
                    if (args[i] instanceof DomFacade)
                        args[i] = args[i]._context;

                // Capture the return value for analysis and pass it along to the internal jQuery context and its method.
                // Call in place as if it were called normally.
                if (this._context)
                {
                    var ret = this._context[method].apply(this._context, args);

                    // If the return value is a jQuery instance
                    if (ret instanceof jQuery)
                    {
                        // If it's the same instance, then we just update the internals, and return ourself.
                        if (ret.selector === this.selector && ret.context === this.context)
                        {
                            updateInternals.call(this, ret);
                            return this;
                        }
                        // If it is a new instance, return a new facade
                        return new DomFacade(this, ret, true);
                    }
                    // Regardless update our internals.
                    updateInternals.call(this);
                    // Return the return value, for a method like .is() or .positiion()
                    return ret;
                }
            };
        };

    var updatePrototype = function (proto, CoreDOM)
    {
        // Wrap jQuery and filter out methods we do not want anyone using
        // We also filter out methods that we override, like .on and .off
        for (var i in jQuery.fn)
            if (Object.hasOwnProperty.call(jQuery.fn, i) && !proto[i] && !jQueryMethodsToIgnore.some(someFilter(i)))
                proto[i] = methodFactory(i, CoreDOM);
        proto.$ = proto.find;
    };
    //#endregion

    return {
        updateInternals: updateInternals,
        updatePrototype: updatePrototype,
        initContext: initContext
    };
});