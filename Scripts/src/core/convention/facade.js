define(['thrust/convention'],
function (Convention)
{
    /**
    The facade convention, creates the core facade for each module.

    @module thrust-core-convention
    **/

    /**
    The facade convention, creates the core facade for each module.

    @for thrust-core-convention
    @property facade
    **/
    return new Convention({
        create: function (thrust, module, facades)
        {
            if (module.instance.core) throw new Error('"core" is a reserved property');
            facades.core = module.instance.core = thrust.core.createFacade(module);
        }
    });
});