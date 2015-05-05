define([
    'require',
    'thrust/util',
    'thrust/data',
    'thrust/log',
    'thrust/config',
    'domReady',
    'sizzle'
],
    function (require, util, tData, log, config, domReady, sizzle)
    {
        var LONG = 'long',
            SHORT = 'short',
            ID = 'id',
            templates = {
                long: {},
                short: {},
                id: {}
            },
            deepCopy = util.deepCopy,
            each = util.each,
            when = util.when,
            memoize = util.memoize,
            getLongName = function (name, type)
            {
                return this.shortName(name) + '.' + type + this.extension;
            },
            getShortName = function (name)
            {
                return util.reduce(this.templateTypes, function (memo, x) { return memo.replace('.' + x + this.extension); }, name.toLowerCase());
            },
            getTemplateId = function (name)
            {
                return this.shortName(name).replace(/\//g, '-');
            };

        var Template = function (/* $ref */ config)
        {
            var that = this;
            config = config.template;
            that.extension = config.extension;
            that.templatePaths = config.types;
            that.templateTypes = util.map(config.types, function (x, i) { return i });
            that.baseUrl - config.baseUrl;
            that.defaultType = config.defaultType;
            
            that.templates = deepCopy({}, templates);

            that.longName = memoize(getLongName.bind(that));
            that.shortName = memoize(getShortName.bind(that));
            that.templateId = memoize(getTemplateId.bind(that));

            domReady(function ()
            {
                each(sizzle('script[data-template]'), that.createFromDomNode.bind(that));
            });
        };

        Template.prototype = {
            get: function (name)
            {
                var template = null, that = this, templates = that.templates;
                if (template = templates[LONG][that.longName(name)])
                    return template;
                else if (template = templates[SHORT][that.shortName(name)])
                    return template;
                else if (template = templates[ID][that.templateId(name)])
                    return template;
                return false;
            },
            set: function (name, type, compiledTemplate)
            {
                var that = this,
                    shortName = that.shortName(name),
                    templateId = that.templateId(name),
                    longName = that.longName(name, type),
                    templates = that.templates;

                templates[LONG][longName] = templates[SHORT][shortName] = templates[ID][templateId] = {
                    name: name,
                    shortName: name,
                    id: templateId,
                    type: type,
                    compiled: compiledTemplate
                };
            },
            has: function (name)
            {
                var that = this;
                return !!that.get(name);
            },
            append: function (name, type)
            {
                var that = this;
                // Append to dom?
                // Is this really needed... it is needed for knockout to grab templates by default,
                //      but knockout can be changed, in how it gets templates.
                //      Granted knockout still needs the id to exist, maybe the best thing is to add the empty div,
                //      if it doesn't exist, for knockout support.
                domReady(function ()
                {
                    var element = document.getElementById(that.templateId(name));
                    if (!element)
                    {
                        var element = document.createElement('script');
                        element.id = that.templateId(name);
                        element.type = 'text/x-{0}-template'.format(type.toLowerCase());
                        element.setAttribute('data-type', type);
                        element.setAttribute('data-template', that.shortName(name));
                        // perhaps add the text node content for the template function
                        document.body.appendChild(element)
                    }
                });
            },
            newTemplate: function (name, type, html)
            {
                var that = this, template = that.get(name);
                if (!template)
                {
                    if (type == 'precompiled')
                    {
                        that.set(name, type, html);

                        appendTemplate(that.longName(name), type);
                    }
                    else
                    {
                        require([(that.templatePaths[type] || 'thrust/template/' + type)], function (engine)
                        {
                            var templatingMethod;

                            if (typeof engine === 'function')
                                templatingMethod = engine;
                            else if (typeof engine.template === 'function')
                                templatingMethod = engine.template;

                            var compiledTemplate = templatingMethod(html);

                            that.set(name, type, compiledTemplate);
                            that.append(that.longName(name), type);
                        });
                    }

                    //if (deferred)
                    //    deferred.resolve(template.compiled);
                }
                return template;
            },
            fetch: function (name)
            {
                var shortName = that.shortName(name),
                    longName = that.longName(name),
                    that = this,
                    template;

                var defer = when.defer();

                if (template = that.get(name))
                {
                    defer.resolve(template);
                    return defer.promise;
                }

                data.get(baseUrl + longName, { contentType: 'text/plain', dataType: 'text' }).then(function (data)
                {
                    var template = that.newTemplate(name, defaultType, data);
                    defer.resolve(template);
                },
                function ()
                {
                    defer.reject();
                });

                return defer.promise;
            },
            createFromDomNode:  function (element)
            {
                var that = this;
                log.info(element.getAttribute('data-template'),
                    element.getAttribute('data-type'),
                    element.text);

                that.newTemplate(
                    element.getAttribute('data-template'),
                    element.getAttribute('data-type'),
                    element.text
                );
            }
        };

        return Template;
    });