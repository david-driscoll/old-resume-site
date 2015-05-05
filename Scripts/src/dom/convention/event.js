define([
    'thrust/convention',
    'thrust/util'
],
function (Convention, util)
{
    var type = util.type,
        CONTEXT = 'context',
        EVENTS = 'events',
        FUNCTION = 'function',
        STRING = 'string',
        ARRAY = 'array';

    return new Convention({
        properties: [EVENTS],
        ready: function (facade)
        {
            var module = facade.module,
                events = module.convention(EVENTS),
                optionalContext = module.convention(CONTEXT),
                dom = optionalContext ? facade.query(optionalContext) : facade,
                moduleInstance = module.instance;

            if (events)
            {
                for (var event in events)
                {
                    var definition = events[event],
                        bindEvent;

                    if (type(definition) === FUNCTION)
                    {
                        bindEvent = [event, definition];
                    }
                        // If the event method is a string, we search to verify that module method exists on the given module
                        //        then bind it, with the proper context.
                    else if (type(definition) === STRING)
                    {
                        bindEvent = [event, moduleInstance[definition]];
                    }
                        // If the event module is an array, we apply the array as if it were a direct call to subscribe, by pushing the event name on the front.
                    else if (type(definition) === ARRAY)
                    {
                        bindEvent = definition;
                        for (var i = 0, iLen = definition.length; i < iLen; i++)
                        {
                            if (type(definition[i]) === STRING && moduleInstance[definition[i]])
                            {
                                definition[i] = moduleInstance[definition[i]];
                            }
                        }
                        bindEvent.unshift(0);
                    }
                    // Call the on method, with our arguments.
                    dom.on.apply(dom, bindEvent);
                }
                //Save a reference of the context, for later unbinding.
                events.context = dom._context[0];
            }
        },
        stop: function (facade, module)
        {
            var events = module.convention(EVENTS),
                dom = facade;

            if (events)
            {
                dom.changeContext(events.context);
                delete events.context;

                if (dom._context)
                    dom.off();
            }
        }
    });
});