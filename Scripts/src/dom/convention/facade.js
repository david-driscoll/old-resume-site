define(['thrust/convention'],
function (Convention)
{
    return new Convention({
        properties: ['requireDom'],
        create: function (thrust, module, facades)
        {
            if (module.instance.dom) throw new Error('"dom" is a reserved property');
            var dom = facades.dom = thrust.dom.createFacade(module);
            module.instance.dom = module.instance.$ = dom.query;
        }
    });
});