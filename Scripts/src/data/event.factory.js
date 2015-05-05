define(['thrust/util'],
function(util)
{
    var camelCase = util.camelCase,
        slice = Array.prototype.slice;

    var eventHandlers = {    // Supported event handlers
        'before-send': true,
        'send': true,
        'error': true,
        'success': true,
        'complete': true,
        'start': true,
        'stop': true
    };

    var beforeSendMethod = function (jqXHR, settings)
    {
        this.fire('data-event-before-send', jqXHR, settings);
    };

    var eventFactory = function (event)    // Create a new event method.
    {
        var evt = 'data-event-' + event;
        return function ()
        {
            var args = slice.call(arguments, 0);
            args.unshift(evt);
            this.fire.apply(this.fire.async, args);
        };
    };

    var normalizeEvents = function (events)    // Normalize events
    {
        events = events.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++)
        {
            if (!eventHandlers[events[i]])
                throw new Error('Event "{0}" is not a valid data event'.format(events[i]));
            events[i] = 'data-' + events[i];
        }
        return events.join(' ');
    };

    var sendEventFactory = function (i)
    {
        return function (event, jqXHR, settings)
        {
            if (!settings.__core_data_fired__)
            {
                jqXHR.abort();
                throw new Error('Request aborted, all ajax calls must pass through thrust-data.');
            }
            eventFactory(i).apply(this, arguments);
        };
    };

    return {
        init: function(jDoc)
        {
            for (var i in eventHandlers)
            {
                var jqEvt = 'ajax-' + i,
                    method = eventFactory(i);

                if (i === 'send')
                {
                    method = sendEventFactory(i).bind(this);
                }
                jDoc.on(camelCase(jqEvt) + this.namespace, method);
            }
        },
        beforeSendMethod: beforeSendMethod,
    };
});