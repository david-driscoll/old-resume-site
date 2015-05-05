define(['./type'],
function (uType)
{
    'use strict';
    var hasOwn = Object.prototype.hasOwnProperty,
        type = uType.type,
        isFunction = uType.isFunction,
        isArrayLike = uType.isArrayLike,
        squareBracketregex = /\[(.*?)\]/ig,
        dotRegex = /\./g,
        commaRegex = /,/g,
        __koPathMap = {},
        __propPathMap = {},
        __classPathMap = {},
        koRegex = /[\.|\[]/g,
        rightBracketRegex = /\]/g,
        underscoreRegex = /_/g,
        complexReplacmentMethod = function (m, v) { return '.' + v.replace(dotRegex, ','); },
        getPaths = function (path)
        {
            var paths = path.replace(squareBracketregex, complexReplacmentMethod).split('.');
            if (paths[0] == null || paths[0] === '')
                paths.shift();
            for (var i = 0, iLen = paths.length; i < iLen ; i++)
                paths[i] = paths[i].replace(commaRegex, '.');
            return paths;
        },
        getStrictPath = function (paths)
        {
            return '[' + paths.join('][') + ']';
        },
        getPathAndDrop = function (path, drop)
        {
            if (typeof drop === 'undefined')
                drop = 1;

            var paths = getPaths(path);
            paths = paths.slice(0, -(drop));

            return getStrictPath(paths);
        };

    var navigateObject = function (obj, path)
    {
        var paths = getPaths(path), match = false,
            pathMatch = '';

        while (obj && (path = paths.shift()))
        {
            if (path in obj && ((match = true)))
            {
                obj = obj[path];
                pathMatch = path;
            }
            else if ((!(match = false)) && paths.length > 0)
            {
                paths.unshift(path + '.' + paths.shift());
            }
            else if (paths.length === 0 && match === false)
            {
                pathMatch = path;
            }
        }

        return { match: match, obj: obj, pathMatch: pathMatch };
    };

    var exports = {
        navigateObject: navigateObject,
        getPaths: getPaths,
        get: function (obj, path)
        {
            var result = navigateObject(obj, path);

            return (result.match ? result.obj : false);
        },
        has: function (obj, path)
        {
            var result = navigateObject(obj, path);

            return result.match;
        },
        getParent: function (obj, path)
        {
            path = getPathAndDrop(path, 1);

            var result = navigateObject(obj, path);

            return result.obj;
        },
        last: function (obj, path)
        {
            var result = navigateObject(obj, path);
            return result.pathMatch;
        },
        set: function (obj, path, value)
        {
            this.build(obj, path)[this.last(obj, path)] = value;
        },
        build: function (obj, path)
        {
            var paths = getPaths(getPathAndDrop(path, 1));

            if (!this.has(obj, path))
            {
                while ((path = paths.shift()))
                {
                    if (!obj[path])
                        obj[path] = {};
                    obj = obj[path];
                }
            }
            else
                return this.getParent(obj, path);
            return obj;
        },
        getAllLeafs: function (obj, leafs, prefix)
        {
            leafs = leafs || {};
            for (var i in obj)
            {
                var o = obj[i], t = type(o), p = i;

                if (i.indexOf('.') > -1)
                {
                    p = '{1}[{0}]'.format(i, prefix);
                }
                else
                {
                    p = prefix ? prefix + '.' + i : i;
                }

                if (t === 'object' && !isArrayLike(o))
                {
                    this.getAllLeafs(o, leafs, p);
                }
                else if (t === 'array' || isArrayLike(o))
                {
                    leafs[p] = o;
                }
                else
                {
                    leafs[p] = o;
                }
            }
            return leafs;
        },
        findAllChangedProperties: function (current, old)
        {
            var properties = {}, i;
            for (i in current)
                if (!properties[i] && hasOwn.call(current, i))
                    properties[i] = true;

            for (i in old)
                if (!properties[i] && hasOwn.call(old, i))
                    properties[i] = true;

            var values = {};
            for (i in properties)
            {
                var cVal = current[i],
                        oVal = old[i],
                        cT = type(cVal),
                        oT = type(oVal);

                if (cT === 'object' && !isArrayLike(cVal))
                {
                    if (oT === 'object' && !isArrayLike(oVal))
                        values[i] = this.findAllChangedProperties(cVal, oVal);
                    else
                        values[i] = cVal;
                }
                else if (cT === 'array' || isArrayLike(cVal))
                {
                    if (oT === 'array' || isArrayLike(oVal))
                    {
                        if (hasOwn.call(cVal, i))
                            values[i] = this.findAllChangedProperties(cVal, oVal);
                    }
                    else
                        values[i] = cVal;
                }
                else if (cVal !== oVal)
                {
                    values[i] = cVal;
                }
            }
            return values;
        },
        knockoutPath: function (key)
        {
            if (__propPathMap[key]) return __propPathMap[key];

            var koPath = key.replace(koRegex, '_').replace(rightBracketRegex, '');
            if (!__koPathMap[koPath])
            {
                __koPathMap[koPath] = key;
                return (__propPathMap[key] = koPath);
            }
            return koPath;
        },
        propertyPath: function (koPath)
        {
            return __koPathMap[koPath];
        },
        classPath: function (path)
        {
            if (__classPathMap[path]) return __classPathMap[path];
            return (__classPathMap[path] = '.' + path.replace(koRegex, '-').replace(rightBracketRegex, '').toLowerCase());
        }
    };

    return exports;
});