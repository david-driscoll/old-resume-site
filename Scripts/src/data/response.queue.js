define(['jquery', 'thrust/util', 'thrust/config', 'thrust/log'],
function(jQuery, util, config, log)
{
    var slice = Array.prototype.slice,
        format = util.format,
        extend = util.extend,
        when = util.when,
        uid = util.uniqueId,
        ajax = jQuery.ajax,
        queue = {},
        updateXHRInternals = function (dfo, xhr)
        {
            return function ()
            {
                if (!dfo._xhr)
                {
                    dfo._xhr = xhr;
                    dfo.getAllResponseHeaders = function () { return dfo._xhr.getAllResponseHeaders(); };
                    dfo.getResponseHeader = function () { return dfo._xhr.getAllResponseHeadersgetResponseHeader(); };
                    dfo.abort = function () { return dfo._xhr.abort(); };
                    dfo.setRequestHeader = function (name, value) { return dfo._xhr.setRequestHeader(name, value); };
                }

                dfo.responseText = xhr.responseText;
                dfo.responseXML = xhr.responseXML;
                dfo.readyState = xhr.readyState;
                dfo.status = xhr.status;
                dfo.statusText = xhr.statusText;
            };
        },
        argumentResolver = function (method)
        {
            return function ()
            {
                return method(util.toArray(arguments));
            };
        },
        deferControllerItemCallback = function (func)
        {
            return function ()
            {
                return func.call(this, arguments[0][0]);
            };
        };

    var ResponseQueue = function (startTimeout, finishTimeout)
    {
        this.startTimeout = startTimeout;
        this.finishTimeout = finishTimeout;
    };

    ResponseQueue.prototype = {
        addToQueue: function (type, url, options)
        {
            var dfo = when.defer(), that = this;

            if (options.beforeSend)
            {
                var beforeSend = options.beforeSend;
                dfo.progress(function (eventType)
                {
                    if (eventType && eventType == 'before-send')
                    {
                        var args = slice.call(arguments, 1);
                        beforeSend.apply(beforeSend, args);
                    }
                });
                delete options.beforeSend;
            }

            if (options.complete)
            {
                dfo.always(options.complete);
                delete options.complete;
            }
            if (options.success)
            {
                dfo.then(options.success);
                delete options.success;
            }

            if (options.error)
            {
                dfo.otherwise(options.error);
                delete options.error;
            }

            var list = queue[type] || (queue[type] = {});
            var tail = list.tail || (list.tail = list.next = {});

            extend(tail, { url: url, options: options, dfo: dfo });
            list.tail = tail.next = {};

            when.delay(that.startTimeout).then(that.processQueueFactory(type));

            return dfo.promise;
        },
        processQueueFactory: function (type)
        {
            var parent = queue[type], node = parent, that = this,
                queryId = uid('dq');

            log.debug(format('Data[{0}]: Creating queue for type "{1}"', that.namespace, type));
            that.fire('data-wait', queryId, type);

            return function ()
            {
                log.debug(format('Data[{0}]: Processing queue for type "{1}"', that.namespace, type));
                that.fire('data-start', queryId, type);
                var whenQueue = [], deferController = when.defer();

                deferController.then(function ()
                {
                    log.debug(format('Data[{0}]: Finishing queue for type "{1}"', that.namespace, type));
                    that.fire('data-stop', queryId, type);
                });

                delete queue[type];

                var tail = node.tail;
                while ((node = node.next) !== tail)
                {
                    var dfo = node.dfo,
                        options = extend({}, node.options),
                        xhrDfo = when.defer(),
                        xhr = node.xhr = ajax(node.url, options).then(argumentResolver(xhrDfo.resolve), argumentResolver(xhrDfo.reject));

                    whenQueue.push(xhr);

                    when.all([xhrDfo, deferController.promise], when.apply(dfo.resolve), when.apply(dfo.reject), updateXHRInternals(dfo, xhr));

                    dfo.progress('before-send', [dfo, options]);
                }

                when.any([when.all(whenQueue), when.delay(that.finishTimeout)], deferController.resolve, deferController.resolve);
            };
        }
    };

    return ResponseQueue;
});