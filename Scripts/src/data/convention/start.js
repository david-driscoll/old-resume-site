define(['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    var when = util.when;
    var whenQueue = [],
        waitCallback = function (uid)
        {
            var defer = when.defer();
            defer.resolver.uid = uid;

            whenQueue.push({ uid: uid, resolver: defer.resolver });
        },
        stopCallback = function (uid)
        {
            var item = util.find(whenQueue, function (x) { return x.uid === uid; });
            whenQueue = util.without(whenQueue, item);

            item.resolver.resolve();
        };

    return new Convention({
        countdown: function(thrust)
        {
            thrust.data.subscribe('data-wait', waitCallback);
            thrust.data.subscribe('data-stop', stopCallback);
        },
        /*ignite: function (thrust)
        {
            return whenQueue;
        },*/
        orbit: function (thrust)
        {
            thrust.data.unsubscribe('data-wait', waitCallback);
            thrust.data.unsubscribe('data-stop', stopCallback);
            return when.all(whenQueue).then(
                    function () { console.log('orbited data'); }
                );
        }
    });
});