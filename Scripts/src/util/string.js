define(function ()
{
    var format = function ()
    {
        return String.prototype.format.apply(arguments[0], Array.prototype.slice.call(arguments, 1));
    },
        objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g,
        numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g;

    String.prototype.format = function ()
    {
        var args = arguments;
        if (typeof arguments[0] === 'object')
        {
            var a = arguments[0];
            return this.replace(objectCurlyRegex, function (m, n)
            {
                if (m == '{{') { return '{'; }
                if (m == '}}') { return '}'; }
                return a[n] || '';
            });
        }
        return this.replace(numberCurlyRegex, function (m, n)
        {
            if (m == '{{') { return '{'; }
            if (m == '}}') { return '}'; }
            return args[n] || '';
        });
    };

    return {
        /**
        C# style string format.

        @for thrust-util
        @method format
        **/
        format: format
    };
});