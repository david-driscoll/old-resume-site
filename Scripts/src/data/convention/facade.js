define(['thrust/convention'],
function (Convention)
{
    return new Convention({
        properties: ['requireData'],
        create: function (thrust, module, facades)
        {
            if (module.instance.data) throw new Error('"data" is a reserved property');
            facades.data = module.instance.data = thrust.data.createFacade(module);
        }
    });
});