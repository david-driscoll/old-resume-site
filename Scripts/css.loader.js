define(['thrust/util'],
function (util)
{
    return function (url)
    {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = util.fixupUrl(url);
        document.getElementsByTagName('head')[0].appendChild(link);
    };
});