define(['thrust/convention', '../jquery.interface'],
function (Convention, jQueryInterface)
{
    var CONTEXT = 'context',
        updateInternals = jQueryInterface.updateInternals;

    return new Convention({
        properties: [CONTEXT],
        ready: function (facade)
        {
            var module = facade.module,
                context = module.convention(CONTEXT),
                dom = facade;

            if (context)
            {
                updateInternals.call(dom, context);
            }
        }
    });
});