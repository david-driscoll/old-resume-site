define([
    'thrust/convention',
    'thrust/util',
    'thrust/events'
],
function (Convention, util, Events)
{
    /**
    The facade convention, creates the core facade for each module.

    @module thrust-core-convention
    **/
    var type = util.type,
        SUBSCRIPTIONS = 'subscriptions',
        FUNCTION = 'function',
        STRING = 'string',
        ARRAY = 'array';

    /**
    The subscription property defines, predefined subscriptions for a module.

    By default the context of the subscription method, when run, will be your module,
        it can be optionally defined by passing in an array.
    
    Basic usage:

        subscription: {
            'event-name1': myMethodHere,
            'event-name2': 'methodDefinedOnTheModule',
            'event-name3': [myMethodHere, myMethodContext],
            'event-name4': ['methondDefinedOnTheModule', myMethodContext]
        }

    @for thrust-core-convention
    @property subscriptions
    **/
    return new Convention({
        properties: [SUBSCRIPTIONS],
        start: function (facade)
        {
            var module = facade.module,
                subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && !subscriptions._subscriptionsSet)
            {
                var moduleInstance = module.instance;
                for (var subscription in subscriptions)
                {
                    var definition = subscriptions[subscription];
                    if (type(definition) === FUNCTION)
                    {
                        definition = [subscription, definition, moduleInstance];
                    }
                    else if (type(definition) === STRING)
                    {
                        definition = [subscription, moduleInstance[definition], moduleInstance];
                    }
                    else if (type(definition) === ARRAY)
                    {
                        if (type(definition[0]) === STRING)
                        {
                            definition[0] = moduleInstance[definition[0]];
                        }
                        definition.unshift(subscription);
                    }
                    facade.subscribe.apply(facade, definition);
                }
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
        },
        stop: function (facade)
        {
            var module = facade.module,
                subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && subscriptions._subscriptionsSet)
            {
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
        }
    });
});