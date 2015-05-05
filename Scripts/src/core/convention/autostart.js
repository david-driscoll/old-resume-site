define(['thrust/convention'],
function (Convention)
{
    /**
    Simple core convention to capture the autoStart property on a module.

    The autoStart property, indicates that the module should automatically start with the thrust instance, or when it is added to the thrust instance.

    @module thrust-core-convention
    **/

    /**
    The autoStart property, indicates that the module should automatically start with the thrust instance, or when it is added to the thrust instance.

    @for thrust-core-convention
    @property autoStart
    **/
    return new Convention({
        properties: ['autoStart']
    });
});