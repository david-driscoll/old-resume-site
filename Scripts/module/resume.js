define(['thrust/util', 'module/base', 'css.loader'],
function (util, base, cssLoader)
{
    var baseModule = base('/api/Home/Resume');

    return util.extend({}, baseModule, {
        init: function ()
        {
            baseModule.init();
            if (window.thrust && !this._readyDelay)
            {
                cssLoader('/Content/resume.less');
            }
        }
    });
});