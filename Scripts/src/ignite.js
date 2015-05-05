define(['thrust/config', 'thrust/util'],
function(config, util)
{
    var isArray = util.isArray,
        toArray = util.toArray,
        each = util.each,
        isObject = util.isObject,
        reconcileArrays = function (from, to)
        {
            each(from, function (x, i)
            {
                if (isArray(x))
                {
                    to[i] = toArray(to[i]);
                }
                else if (isObject(x))
                {
                    reconcileArrays(x, to[i]);
                }
            });
        };

    /**
    Contructs a wire spec for thrust to launch from.

    @module thrust
    @submodule ignite
    **/
    return function (settings)
    {
        var localConfig = util.deepCopy({}, config, settings);
        reconcileArrays(config, localConfig);

        var properties = {
                __conventions: []
            },
            spec = {
                name: localConfig.name || 'global',
                config: localConfig,
                thrust: {
                    resolve: 'thrust',
                    properties: properties
                },
                plugins: [{ module: 'wire/debug' }]
            };

        // Load all the thrust-js plugins, defined in the config.
        var plugins = localConfig.plugins;
        for (var i = 0, iLen = plugins.length; i < iLen; i++)
        {
            var name = plugins[i],
                plugin = name;

            name = name.substring(name.lastIndexOf('/') + 1);
            
            var pluginSpec = spec[name] = {
                resolve: plugin,
                properties: { __conventions: [] }
            };
            properties[name] = { $ref: name };

            var conventions = localConfig[name].conventions;
            for (var z = 0, zLen = conventions.length; z < zLen; z++)
            {
                var cname = conventions[z],
                    convention = cname;
                cname = name + '-convention-' + cname.substring(cname.lastIndexOf('/') + 1);

                spec[cname] = { create: convention };
                pluginSpec.properties.__conventions.push({ $ref: cname });
                properties.__conventions.push({ $ref: cname });
            }
        }

        var modules = localConfig.modules;
        for (var i = 0, iLen = modules.length; i < iLen; i++)
        {
            var module = modules[i],
                name = modules[i];

            var moduleSpec = spec[name] = {
                resolve: {
                    module: 'thrust/module',
                    args: [{ resolve: module }, name]
                },
                init: {
                    thrustCreate: [{ $ref: 'thrust' }]
                }
            };
        }

        return spec;
    };
});