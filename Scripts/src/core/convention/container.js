define(['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    /**
    Simple core convention to capture the container property on a module.

    Whenever another module, tries to load with the same container, the current module will be stopped, and the new one will load to take it's place.

    @module thrust-core-convention
    **/

    var event = {
            anyContainer: 'thrust-convention-container-any',
            changeContainer: 'thrust-convention-container-change'
        },
        any = util.any,
        CONTAINER = 'container',
        START = 'start-status',
        defer = util.defer,
        bind = util.bind;

    /**
    Simple core convention to capture the container property on a module.

    Whenever another module, tries to load with the same container, the current module will be stopped, and the new one will load to take it's place.

    @for thrust-core-convention
    @property container
    **/
    return new Convention({
        properties: [CONTAINER],
        init: function(facade, module)
        {
            var that = this;
            facade.subscribe(event.changeContainer, bind(that.change, that, module));
        },
        change: function (module, container)
        {
            if (module.convention(CONTAINER) === container)
            {
                if (module.convention(START))
                    module.stop();
            }
        },
        start: function (facade, module)
        {
            facade.fire(event.changeContainer, module.convention(CONTAINER));
        },
        stop: function (facade)
        {
        }
    });
});