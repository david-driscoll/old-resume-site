define(['thrust/convention', 'thrust/util', 'thrust/template'],
function (Convention, util, templateManager)
{
    var TEMPLATES = 'templates',
        when = util.when,
        each = util.each,
        hasOwn = Object.prototype.hasOwnProperty,
        find = util.find;

    return new Convention({
        properties: [TEMPLATES],
        create: function (thrust, module, facades)
        {
            var templateInstance = thrust.template;
            module.instance.templates = {
                fetch: templateInstance.fetch.bind(templateInstance),
                get: templateInstance.get.bind(templateInstance),
                has: templateInstance.has.bind(templateInstance)
            };
        },
        init: function(facade, module)
        {
            var defer = when.defer();

            var module = facade.module,
                templates = module.convention(TEMPLATES),
                invertedTemplates = util.invert(templates),
                moduleInstance = module.instance;

            if (templates)
            {
                facade.defers = [];
                each(templates, function(template)
                {
                    if (typeof template === 'string')
                    {
                        facade.defers.push(templateManager.fetch(template));
                    }
                });
                facade.defers = when.all(facade.defers).then(function (loadedTemplates)
                {
                    for (var i in invertedTemplates)
                    {
                        if (hasOwn.call(invertedTemplates, i))
                        {
                            var template = find(loadedTemplates, function (x) { return x.shortName === i || x.name === i; });
                            moduleInstance.templates[invertedTemplates[i]] = template.compiled;
                        }
                    }
                });
            }
        },
        start: function (facade)
        {
            return facade.defers || undefined;
        }
    });
});