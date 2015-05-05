define(['lodash'], function (_)
{
    'use strict';
    /**
    @module thrust-util-func
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#bind](http://underscorejs.org/#bind)

    @for thrust-util-func
    @method bind
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#bindAll](http://underscorejs.org/#bindAll)

    @method bindAll
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#memoize](http://underscorejs.org/#memoize)

    @method memoize
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#delay](http://underscorejs.org/#delay)

    @method delay
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#defer](http://underscorejs.org/#defer)

    @method defer
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#throttle](http://underscorejs.org/#throttle)

    @method throttle
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#debounce](http://underscorejs.org/#debounce)

    @method debounce
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#once](http://underscorejs.org/#once)

    @method once
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#after](http://underscorejs.org/#after)

    @method after
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#wrap](http://underscorejs.org/#wrap)

    @method wrap
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#compose](http://underscorejs.org/#compose)

    @method compose
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#uniqueId](http://underscorejs.org/#uniqueId)

    @method uniqueId
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#escape](http://underscorejs.org/#escape)

    @method escape
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#result](http://underscorejs.org/#result)

    @method result
    **/

    var slice = Array.prototype.slice;
    var exports = _.pick(_, 'bind', 'bindAll', 'memoize', 'delay', 'defer', 'throttle', 'debounce', 'once', 'after', 'wrap', 'compose', 'uniqueId', 'escape', 'result');

    /**
    A function that does nothing, or no operation.  Hence the name noop.

    @method noop
    **/
    var noop = exports.noop = function () { };

    /**
    Attempts to invoke, similar to _.invoke, but in this case it verifies that the property exist,
        and also verifies that it is a function, and not the noop method available in thrust.

        The intent is a method that allows override of functions, without creating custom code.

    @method saveInvoke
    @param {Array|Object} collection The container that has the items
    @param {String|Function} method The method name on every item, or the method to invoke against each item.
    @param {Object} [args]* The additional arguments to pass onto the method.
    **/
    exports.safeInvoke = function (collection, methodName)
    {
        var index, iteratee = collection, result;
        if (!collection) return [];
        var args = slice.call(arguments, 2),
            isFunc = typeof methodName == 'function',
            methodExists;
        var length = iteratee.length; index = -1;
        if (length === length >>> 0)
        {
            result = Array(length);
            while (++index < length)
            {
                methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                methodExists && methodExists !== noop && (result[index] = methodExists.apply(iteratee[index], args));
            }
        }
        else
        {
            var skipProto = typeof iteratee == 'function' &&
              propertyIsEnumerable.call(iteratee, 'prototype');

            var props = nativeKeys(iteratee),
                propIndex = -1,
                length = props.length;

            result = Array(length);
            while (++propIndex < length)
            {
                index = props[propIndex];
                if (!(skipProto && index == 'prototype'))
                {
                    methodExists = (isFunc ? methodName : iteratee[index][methodName]);
                    methodExists && methodExists !== noop && (result[propIndex] = ((isFunc ? methodName : iteratee[index][methodName]).apply(iteratee[index], args)));
                }
            }
        };
        return result;
    };

    return exports;
});