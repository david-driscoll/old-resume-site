define([
    'thrust/convention',
    'thrust/util',
    'jquery'
],
function (Convention, util, $)
{
    var type = util.type,
        ACTIONS = 'actions',
        FUNCTION = 'function',
        STRING = 'string',
        ARRAY = 'array';

    var actionHandlers = {
        _registrations: {},
        register: function (eventName, acionName, handler, context)
        {
            var that = this;
            if (!that._registrations[eventName])
                that._registrations[eventName] = {};

            if (!that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = handler;
                if (context) that._registrations[eventName][acionName].context = context;
            }
            else
                throw new Error('The action {1} handler "{0}" has already been taken!'.format(acionName, eventName));
        },
        unregister: function (eventName, acionName)
        {
            var that = this;
            if (that._registrations[eventName] && that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = null;
                delete that._registrations[eventName][acionName];
            }
        },
        callbackFor: function (eventName, returnResults)
        {
            var that = this;
            var actionAttribute = 'data-action-' + eventName,
                returnResultsDefined = type(returnResults) !== 'undefined';

            return function ()
            {
                var attributeValue = $(this).attr(actionAttribute);
                if (type(attributeValue) === STRING)
                {
                    var method = that._registrations[eventName][attributeValue];
                    if (method)
                        method.apply(method.context || this, arguments);
                    if (returnResultsDefined)
                        return returnResults;
                    return false;
                }
            };
        }
    };

    return new Convention({
        properties: [ACTIONS],
        ignite: function()
        {
            $(window.document.body).on('click.actions', 'a, button, input[type="button"], input[type="submit"]', actionHandlers.callbackFor('click', false));
        },
        ready: function (facade, module)
        {
            var actions = module.convention(ACTIONS),
                dom = facade,
                moduleInstance = module.instance;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        var action = actionCollection[actionName],
                            args;

                        if (type(action) === FUNCTION)
                        {
                            args = [actionEvent, actionName, action];
                        }
                        else if (type(action) === STRING)
                        {
                            args = [actionEvent, actionName, moduleInstance[action]];
                        }
                        else if (type(action) === ARRAY)
                        {
                            if (type(action[0]) === FUNCTION)
                            {
                                args = [actionEvent, actionName].concat(action);
                            }
                            else if (type(action[0]) === STRING)
                            {
                                action[0] = moduleInstance[action[0]];
                                args = [actionEvent, actionName].concat(action);
                            }
                        }
                        actionHandlers.register.apply(actionHandlers, args);
                    }
                }
            }
        },
        stop: function (facade, module)
        {
            var dom = facade,
                actions = module.convention(ACTIONS),
                moduleInstance = module.instance,
                dom = facade.dom;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        actionHandlers.unregister(actionEvent, actionName);
                    }
                }
            }
        }
    });
});