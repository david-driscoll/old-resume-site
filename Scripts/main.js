require(['require', 'thrust', 'thrust/log', 'thrust/util'], function (require, thrust, log, util)
{
    var instance = thrust.launch();

    instance.then(function (context)
    {
        log.info(context);
        window.thrust = context.thrust;
    });
});