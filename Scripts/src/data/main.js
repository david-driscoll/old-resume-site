define([
    'jquery',
    'thrust/util',
    'thrust/log',
    'thrust/config',
    './event.factory',
    './response.queue',
    'thrust/events',
    'thrust/facade'
],
function (jQuery, util, log, config, eventFactory, ResponseQueue, events, facade)
{
    'use strict';
    // Variable declaration.
    var format = util.format,
        extend = util.extend,
        type = util.type,
        when = util.when,
        slice = Array.prototype.slice,
        ajax = jQuery.ajax,
        uid = util.uniqueId,
        dataCache = {},
        defaults = {
            cache: config.data.cache,
            beforeSend: eventFactory.beforeSendMethod,
            contentType: 'application/json',
            type: 'POST',
            url: '',
            data: '',
            dataType: 'json',
            __core_data_fired__: true
        };

    jQuery.ajaxSettings.traditional = !!config.url.traditionalEncoding;

    var jDoc = jQuery(document);

    eventFactory.init(jDoc);
    //#region DataFacade
    var DataFacade = facade.createFacade(function (module, parent)
    {
        this.name = module.name + '-data';
        this.module = module;
        this.parent = parent;
        this.__conventions = parent.__conventions;
        this._callbacks = parent._callbacks;
        this.responseQueue = parent.responseQueue;
        this.initEvents();
    });
    util.extend(DataFacade.fn, events);
    //#endregion

    var Data = function (/* $ref */ name, /* $ref */ core, /* $ref */ config)
    {
        // Enforce new
        if (!(this instanceof Data))
            return new Data(name, core);

        if (!name)
            throw new Error('Data: module name must be defined.');

        this.responseQueue = new ResponseQueue(config.data.startTimeout, config.data.finishTimeout);

        log.debug('Data: Creating new Data');

        this.core = core;
        this._callbacks = this.core._callbacks;
        this.initEvents();
    };

    var DataMethods = {
        createFacade: function (moduleDefn)
        {
            return new DataFacade(moduleDefn, this);
        },
    };

    var DataPrototype = {
        getData: function (url, data, settings)
        {
            settings = !settings ? { data: data } : extend(settings, { data: data });
            return this.get(url, settings);
        },
        postData: function (url, data, settings)
        {
            settings = !settings ? { data: JSON.stringify(data) } : extend(settings, { data: JSON.stringify(data) });
            return this.post(url, settings);
        },
        get: function (url, settings, jumpQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'get' }), jumpQueue);
        },
        post: function (url, settings, jumpQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'post' }), jumpQueue);
        },
        addToCache: function (cacheObjects)
        {
            if (cacheObjects)
            {
                cacheObjects.forEach(function (x)
                {
                    dataCache[x.Url] = x.Json;
                });
            }
        },
        ajax: function (url, settings, jumpQueue)
        {
            var that = this, options, type, beforeSend;
            log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));

            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }
            if (!settings)
                settings = {};

            if (url === undefined && settings.url !== undefined)
                url = settings.url;


            url = util.fixupUrl(url);

            var module = (that.module && that.module.module);
            if (jumpQueue && that._fastAjaxPermission)
            {
                var dfo = when.defer();

                var queryId = uid('dq');
                type = settings.type.toLowerCase();

                that.fire('data-wait', queryId, type);
                that.fire('data-start', queryId, type);

                options = extend({}, { beforeSend: eventFactory.beforeSendMethod }, defaults, settings);

                var xhr = ajax(url, options).always(function () { that.async('data-stop', queryId, type); });
                return when(xhr);
            }

            options = extend({}, defaults, settings, { beforeSend: eventFactory.beforeSendMethod });

            type = options.type.toLowerCase();

            return this.responseQueue.addToQueue.call(that, type, url, options);
        }
    };

    util.extend(DataFacade.fn, DataPrototype);

    Data.prototype = Data.fn = util.extend({}, DataMethods, DataPrototype, events);

    // Take a hold of jQuery... this is sure to be contravesial.
    jQuery.ajax = Data.ajax;

    return Data;
});
