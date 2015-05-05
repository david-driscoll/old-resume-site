
define('thrust/config',[],function ()
{
    /**
    Provides thrust configuration
    
    @module thrust
    @submodule config
    **/
    

    var config = {
        /**
        This property, tells the framework if it should throw errors or not.
        In production it's recommended not to throw errors, that way if a component fails
        there is a chance the application can still recover.

        @for config
        @property throwErrors
        @readOnly
        @type {Boolean}
        @default false
        **/
        throwErrors: true,
        /**
        Tells the framework to operate in framework to operate in debug mode, with more verbose problem solving.

        @property debug
        @readOnly
        @type {Boolean}
        @default false
        **/
        debug: true,
        url: {
            /**
            This property, gives the framework it's default path, if different than '/'
            
            @property url.path
            @readOnly
            @type {String}
            @default "/"
            **/
            path: '/',
            /**
            This property, tells the framework how it should encode array form data.
            In general, for ASP.NET based applications, traditional should be true.
            For Ruby/Python based applications, this should be false.
            
            @property url.traditionalEncoding
            @readOnly
            @type {Boolean}
            @default false
            **/
            traditionalEncoding: true
        },
        log: {
            /**
            This lends to the log level of thrust.

                ERROR: 1
                WARN: 2
                INFO: 3
                DEBUG: 4
            
            @property log.level
            @readOnly
            @type {String}
            @default 1
            **/
            level: 4,
            /**
            This toggles enabling on or off.
            
            @property log.enabled
            @readOnly
            @type {Boolean}
            @default false
            **/
            enabled: true
        },
        /**
        Plugins for thrust to load, override with your own set if you have a different set.

        @property plugins
        @readOnly
        @type {Array}
        **/
        plugins: [
            'thrust/core',
            'thrust/data',
            'thrust/dom',
            'thrust/template',
            'thrust/spa',
        ],
        /**
        The set of modules to preload with the inital wireup of the Thrust core.

        @property modules
        @readOnly
        @type {Array}
        **/
        modules: [],
        /**
        The set of configuration options for the thrust/core plugin

        @property core
        @readOnly
        @type {Object}
        **/
        core: {
            /**
            The set of conventions to load into thrust/core.

            @property core.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/core/convention/facade',
                'thrust/core/convention/container',
                'thrust/core/convention/subscription',
                'thrust/core/convention/autostart'
            ]
        },
        /**
        The set of configuration options for the thrust/dom plugin

        @property dom
        @readOnly
        @type {Object}
        **/
        dom: {
            /**
            The set of conventions to load into thrust/dom.

            @property dom.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/dom/convention/facade',
                'thrust/dom/convention/action',
                'thrust/dom/convention/context',
                'thrust/dom/convention/event'
            ]
        },
        /**
        The set of configuration options for the thrust/data plugin

        @property data
        @readOnly
        @type {Object}
        **/
        data: {
            /**
            Decides if thrust/data should cache requests or not, useful to be turned for debugging.

            @property data.cache
            @readOnly
            @type {Boolean}
            @default true
            **/
            cache: true,
            /**
            startTimeout is a queueing method built into thrust/data.
                The concept here is, that the call to get data, doesn't immediately fire to the server.
                Instead it waits for a set duration, to see if any other requests are made from any other
                modules.  This allows multiple calls off to the server to be syncronized, and helps keep
                UI changes done as syncronusly as possible, giving the UI a uniform behaviour.

            @property data.startTimeout
            @readOnly
            @type {Number}
            @default 500
            **/
            startTimeout: 500,
            /**
            finishTimeout is a queueing method built into thrust.data
                The concept here is to keep on with the concept of startTimeout.  If for some reason, one
                of the inital requests is taking to long to complete, the plugin will always return the
                finished requests within this amount of time.  The concept keeps the application working,
                even when one or more components are potentially having issues.

            @property data.finishTimeout
            @readOnly
            @type {Number}
            @default 2000
            **/
            finishTimeout: 2000,
            /**
            The set of conventions to load into thrust/dom.

            @property data.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/data/convention/facade',
                'thrust/data/convention/start'
            ]
        },
        /**
        The set of configuration options for the thrust/template plugin

        @property template
        @readOnly
        @type {Object}
        **/
        template: {
            /**
            The set of conventions to load into thrust/dom.

            @property template.conventions
            @readOnly
            @type {Array}
            **/
            conventions: [
                'thrust/template/convention/template',
            ],
            /**
            Maps the available templates, to their appropriate module name.

            **precompiled is a special case, and those methods are expected to be code built functions.

            @property template.types
            @readOnly
            @type {Object}
            **/
            types: {
                'kendo': 'path/to/kendo',
                'doT': 'doT',
                'precompiled': true
            },
            /**
            The default template type, used when extension isn't given.

            @property template.defaultType
            @readOnly
            @type {String}
            @default 'doT'
            **/
            defaultType: 'doT',
            /**
            The base location, relative to the application path for template location.
            If template paths are given relative to application path, this can be left empty.

            @property template.baseUrl
            @readOnly
            @type {String}
            @default ''
            **/
            baseUrl: '',
            /**
            Defines the extension used for templates stored on the server.

            @property template.extension
            @readOnly
            @type {String}
            @default '.tmpl'
            **/
            extension: '.tmpl'
        },
        spa: {
            conventions: [],
            routes: {}
        }
    };

    return config;
});
/*!
 * Lo-Dash v0.4.1 <http://lodash.com>
 * Copyright 2012 John-David Dalton <http://allyoucanleet.com/>
 * Based on Underscore.js 1.3.3, copyright 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
 * <http://documentcloud.github.com/underscore>
 * Available under MIT license <http://lodash.com/license>
 */
;(function(window, undefined) {
  

  /**
   * Used to cache the last `_.templateSettings.evaluate` delimiter to avoid
   * unnecessarily assigning `reEvaluateDelimiter` a new generated regexp.
   * Assigned in `_.template`.
   */
  var lastEvaluateDelimiter;

  /**
   * Used to cache the last template `options.variable` to avoid unnecessarily
   * assigning `reDoubleVariable` a new generated regexp. Assigned in `_.template`.
   */
  var lastVariable;

  /**
   * Used to match potentially incorrect data object references, like `obj.obj`,
   * in compiled templates. Assigned in `_.template`.
   */
  var reDoubleVariable;

  /**
   * Used to match "evaluate" delimiters, including internal delimiters,
   * in template text. Assigned in `_.template`.
   */
  var reEvaluateDelimiter;

  /** Detect free variable `exports` */
  var freeExports = typeof exports == 'object' && exports &&
    (typeof global == 'object' && global && global == global.global && (window = global), exports);

  /** Native prototype shortcuts */
  var ArrayProto = Array.prototype,
      ObjectProto = Object.prototype;

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used to restore the original `_` reference in `noConflict` */
  var oldDash = window._;

  /** Used to detect delimiter values that should be processed by `tokenizeEvaluate` */
  var reComplexDelimiter = /[-+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/;

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to insert the data object variable into compiled template source */
  var reInsertVariable = /(?:__e|__t = )\(\s*(?![\d\s"']|this\.)/g;

  /** Used to detect if a method is native */
  var reNative = RegExp('^' +
    (ObjectProto.valueOf + '')
      .replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')
      .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
  );

  /** Used to match tokens in template text */
  var reToken = /__token__(\d+)/g;

  /** Used to match unescaped characters in strings for inclusion in HTML */
  var reUnescapedHtml = /[&<"']/g;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to fix the JScript [[DontEnum]] bug */
  var shadowed = [
    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'valueOf'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** Used to replace template delimiters */
  var token = '__token__';

  /** Used to store tokenized template text snippets */
  var tokenized = [];

  /** Native method shortcuts */
  var concat = ArrayProto.concat,
      hasOwnProperty = ObjectProto.hasOwnProperty,
      push = ArrayProto.push,
      propertyIsEnumerable = ObjectProto.propertyIsEnumerable,
      slice = ArrayProto.slice,
      toString = ObjectProto.toString;

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeBind = reNative.test(nativeBind = slice.bind) && nativeBind,
      nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeIsFinite = window.isFinite,
      nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys;

  /** `Object#toString` result shortcuts */
  var arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Timer shortcuts */
  var clearTimeout = window.clearTimeout,
      setTimeout = window.setTimeout;

  /**
   * Detect the JScript [[DontEnum]] bug:
   * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
   * made non-enumerable as well.
   */
  var hasDontEnumBug = !propertyIsEnumerable.call({ 'valueOf': 0 }, 'valueOf');

  /** Detect if `Array#slice` cannot be used to convert strings to arrays (Opera < 10.52) */
  var noArraySliceOnStrings = slice.call('x')[0] != 'x';

  /**
   * Detect lack of support for accessing string characters by index:
   * IE < 8 can't access characters by index and IE 8 can only access
   * characters by index on string literals.
   */
  var noCharByIndex = ('x'[0] + Object('x')[0]) != 'xx';

  /* Detect if `Function#bind` exists and is inferred to be fast (all but V8) */
  var isBindFast = nativeBind && /\n|Opera/.test(nativeBind + toString.call(window.opera));

  /* Detect if `Object.keys` exists and is inferred to be fast (V8, Opera, IE) */
  var isKeysFast = nativeKeys && /^.+$|true/.test(nativeKeys + !!window.attachEvent);

  /** Detect if sourceURL syntax is usable without erroring */
  try {
    // Adobe's and Narwhal's JS engines will error
    var useSourceURL = (Function('//@')(), true);
  } catch(e){ }

  /**
   * Used to escape characters for inclusion in HTML.
   * The `>` and `/` characters don't require escaping in HTML and have no
   * special meaning unless they're part of a tag or an unquoted attribute value
   * http://mathiasbynens.be/notes/ambiguous-ampersands (semi-related fun fact)
   */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '"': '&quot;',
    "'": '&#x27;'
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The `lodash` function.
   *
   * @name _
   * @constructor
   * @param {Mixed} value The value to wrap in a `LoDash` instance.
   * @returns {Object} Returns a `LoDash` instance.
   */
  function lodash(value) {
    // allow invoking `lodash` without the `new` operator
    return new LoDash(value);
  }

  /**
   * Creates a `LoDash` instance that wraps a value to allow chaining.
   *
   * @private
   * @constructor
   * @param {Mixed} value The value to wrap.
   */
  function LoDash(value) {
    // exit early if already wrapped
    if (value && value._wrapped) {
      return value;
    }
    this._wrapped = value;
  }

  /**
   * By default, Lo-Dash uses embedded Ruby (ERB) style template delimiters,
   * change the following template settings to use alternative delimiters.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  lodash.templateSettings = {

    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'escape': /<%-([\s\S]+?)%>/g,

    /**
     * Used to detect code to be evaluated.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'evaluate': /<%([\s\S]+?)%>/g,

    /**
     * Used to detect `data` property values to inject.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'interpolate': /<%=([\s\S]+?)%>/g,

    /**
     * Used to reference the data object in the template text.
     *
     * @static
     * @memberOf _.templateSettings
     * @type String
     */
    'variable': 'obj'
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The template used to create iterator functions.
   *
   * @private
   * @param {Obect} data The data object used to populate the text.
   * @returns {String} Returns the interpolated text.
   */
  var iteratorTemplate = template(
    // conditional strict mode
   '<% if (useStrict) { %>\'use strict\';\n<% } %>' +

    // the `iteratee` may be reassigned by the `top` snippet
    'var index, iteratee = <%= firstArg %>, ' +
    // assign the `result` variable an initial value
    'result<% if (init) { %> = <%= init %><% } %>;\n' +
    // add code to exit early or do so if the first argument is falsey
    '<%= exit %>;\n' +
    // add code after the exit snippet but before the iteration branches
    '<%= top %>;\n' +

    // the following branch is for iterating arrays and array-like objects
    '<% if (arrayBranch) { %>' +
    'var length = iteratee.length; index = -1;' +
    '  <% if (objectBranch) { %>\nif (length === length >>> 0) {<% } %>' +

    // add support for accessing string characters by index if needed
    '  <% if (noCharByIndex) { %>\n' +
    '  if (toString.call(iteratee) == stringClass) {\n' +
    '    iteratee = iteratee.split(\'\')\n' +
    '  }' +
    '  <% } %>\n' +

    '  <%= arrayBranch.beforeLoop %>;\n' +
    '  while (++index < length) {\n' +
    '    <%= arrayBranch.inLoop %>\n' +
    '  }' +
    '  <% if (objectBranch) { %>\n}<% } %>' +
    '<% } %>' +

    // the following branch is for iterating an object's own/inherited properties
    '<% if (objectBranch) { %>' +
    '  <% if (arrayBranch) { %>\nelse {<% } %>' +
    '  <% if (!hasDontEnumBug) { %>\n' +
    '  var skipProto = typeof iteratee == \'function\' && \n' +
    '    propertyIsEnumerable.call(iteratee, \'prototype\');\n' +
    '  <% } %>' +

    // iterate own properties using `Object.keys` if it's fast
    '  <% if (isKeysFast && useHas) { %>\n' +
    '  var props = nativeKeys(iteratee),\n' +
    '      propIndex = -1,\n' +
    '      length = props.length;\n\n' +
    '  <%= objectBranch.beforeLoop %>;\n' +
    '  while (++propIndex < length) {\n' +
    '    index = props[propIndex];\n' +
    '    if (!(skipProto && index == \'prototype\')) {\n' +
    '      <%= objectBranch.inLoop %>\n' +
    '    }\n' +
    '  }' +

    // else using a for-in loop
    '  <% } else { %>\n' +
    '  <%= objectBranch.beforeLoop %>;\n' +
    '  for (index in iteratee) {' +
    '    <% if (hasDontEnumBug) { %>\n' +
    '    <%   if (useHas) { %>if (hasOwnProperty.call(iteratee, index)) {\n  <% } %>' +
    '    <%= objectBranch.inLoop %>;\n' +
    '    <%   if (useHas) { %>}<% } %>' +
    '    <% } else { %>\n' +

    // Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
    // (if the prototype or a property on the prototype has been set)
    // incorrectly sets a function's `prototype` property [[Enumerable]]
    // value to `true`. Because of this Lo-Dash standardizes on skipping
    // the the `prototype` property of functions regardless of its
    // [[Enumerable]] value.
    '    if (!(skipProto && index == \'prototype\')<% if (useHas) { %> &&\n' +
    '        hasOwnProperty.call(iteratee, index)<% } %>) {\n' +
    '      <%= objectBranch.inLoop %>\n' +
    '    }' +
    '    <% } %>\n' +
    '  }' +
    '  <% } %>' +

    // Because IE < 9 can't set the `[[Enumerable]]` attribute of an
    // existing property and the `constructor` property of a prototype
    // defaults to non-enumerable, Lo-Dash skips the `constructor`
    // property when it infers it's iterating over a `prototype` object.
    '  <% if (hasDontEnumBug) { %>\n\n' +
    '  var ctor = iteratee.constructor;\n' +
    '    <% for (var k = 0; k < 7; k++) { %>\n' +
    '  index = \'<%= shadowed[k] %>\';\n' +
    '  if (<%' +
    '      if (shadowed[k] == \'constructor\') {' +
    '        %>!(ctor && ctor.prototype === iteratee) && <%' +
    '      } %>hasOwnProperty.call(iteratee, index)) {\n' +
    '    <%= objectBranch.inLoop %>\n' +
    '  }' +
    '    <% } %>' +
    '  <% } %>' +
    '  <% if (arrayBranch) { %>\n}<% } %>' +
    '<% } %>\n' +

    // add code to the bottom of the iteration function
    '<%= bottom %>;\n' +
    // finally, return the `result`
    'return result'
  );

  /**
   * Reusable iterator options shared by
   * `every`, `filter`, `find`, `forEach`, `forIn`, `forOwn`, `groupBy`, `map`,
   * `reject`, `some`, and `sortBy`.
   */
  var baseIteratorOptions = {
    'args': 'collection, callback, thisArg',
    'init': 'collection',
    'top':
      'if (!callback) {\n' +
      '  callback = identity\n' +
      '}\n' +
      'else if (thisArg) {\n' +
      '  callback = iteratorBind(callback, thisArg)\n' +
      '}',
    'inLoop': 'callback(iteratee[index], index, collection)'
  };

  /** Reusable iterator options for `every` and `some` */
  var everyIteratorOptions = {
    'init': 'true',
    'inLoop': 'if (!callback(iteratee[index], index, collection)) return !result'
  };

  /** Reusable iterator options for `defaults` and `extend` */
  var extendIteratorOptions = {
    'useHas': false,
    'useStrict': false,
    'args': 'object',
    'init': 'object',
    'top':
      'for (var iterateeIndex = 1, length = arguments.length; iterateeIndex < length; iterateeIndex++) {\n' +
      '  iteratee = arguments[iterateeIndex];\n' +
      (hasDontEnumBug ? '  if (iteratee) {' : ''),
    'inLoop': 'result[index] = iteratee[index]',
    'bottom': (hasDontEnumBug ? '  }\n' : '') + '}'
  };

  /** Reusable iterator options for `filter` and `reject` */
  var filterIteratorOptions = {
    'init': '[]',
    'inLoop': 'callback(iteratee[index], index, collection) && result.push(iteratee[index])'
  };

  /** Reusable iterator options for `find`, `forEach`, `forIn`, and `forOwn` */
  var forEachIteratorOptions = {
    'top': 'if (thisArg) callback = iteratorBind(callback, thisArg)'
  };

  /** Reusable iterator options for `forIn` and `forOwn` */
  var forOwnIteratorOptions = {
    'inLoop': {
      'object': baseIteratorOptions.inLoop
    }
  };

  /** Reusable iterator options for `invoke`, `map`, `pluck`, and `sortBy` */
  var mapIteratorOptions = {
    'init': '',
    'exit': 'if (!collection) return []',
    'beforeLoop': {
      'array':  'result = Array(length)',
      'object': 'result = ' + (isKeysFast ? 'Array(length)' : '[]')
    },
    'inLoop': {
      'array':  'result[index] = callback(iteratee[index], index, collection)',
      'object': 'result' + (isKeysFast ? '[propIndex] = ' : '.push') + '(callback(iteratee[index], index, collection))'
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Creates compiled iteration functions. The iteration function will be created
   * to iterate over only objects if the first argument of `options.args` is
   * "object" or `options.inLoop.array` is falsey.
   *
   * @private
   * @param {Object} [options1, options2, ...] The compile options objects.
   *
   *  useHas - A boolean to specify whether or not to use `hasOwnProperty` checks
   *   in the object loop.
   *
   *  useStrict - A boolean to specify whether or not to include the ES5
   *   "use strict" directive.
   *
   *  args - A string of comma separated arguments the iteration function will
   *   accept.
   *
   *  init - A string to specify the initial value of the `result` variable.
   *
   *  exit - A string of code to use in place of the default exit-early check
   *   of `if (!arguments[0]) return result`.
   *
   *  top - A string of code to execute after the exit-early check but before
   *   the iteration branches.
   *
   *  beforeLoop - A string or object containing an "array" or "object" property
   *   of code to execute before the array or object loops.
   *
   *  inLoop - A string or object containing an "array" or "object" property
   *   of code to execute in the array or object loops.
   *
   *  bottom - A string of code to execute after the iteration branches but
   *   before the `result` is returned.
   *
   * @returns {Function} Returns the compiled function.
   */
  function createIterator() {
    var object,
        prop,
        value,
        index = -1,
        length = arguments.length;

    // merge options into a template data object
    var data = {
      'bottom': '',
      'exit': '',
      'init': '',
      'top': '',
      'arrayBranch': { 'beforeLoop': '' },
      'objectBranch': { 'beforeLoop': '' }
    };

    while (++index < length) {
      object = arguments[index];
      for (prop in object) {
        value = (value = object[prop]) == null ? '' : value;
        // keep this regexp explicit for the build pre-process
        if (/beforeLoop|inLoop/.test(prop)) {
          if (typeof value == 'string') {
            value = { 'array': value, 'object': value };
          }
          data.arrayBranch[prop] = value.array;
          data.objectBranch[prop] = value.object;
        } else {
          data[prop] = value;
        }
      }
    }
    // set additional template `data` values
    var args = data.args,
        firstArg = /^[^,]+/.exec(args)[0];

    data.firstArg = firstArg;
    data.hasDontEnumBug = hasDontEnumBug;
    data.isKeysFast = isKeysFast;
    data.shadowed = shadowed;
    data.useHas = data.useHas !== false;
    data.useStrict = data.useStrict !== false;

    if (!('noCharByIndex' in data)) {
      data.noCharByIndex = noCharByIndex;
    }
    if (!data.exit) {
      data.exit = 'if (!' + firstArg + ') return result';
    }
    if (firstArg != 'collection' || !data.arrayBranch.inLoop) {
      data.arrayBranch = null;
    }
    // create the function factory
    var factory = Function(
        'arrayClass, bind, compareAscending, funcClass, hasOwnProperty, identity, ' +
        'iteratorBind, objectTypes, nativeKeys, propertyIsEnumerable, slice, ' +
        'stringClass, toString',
      'return function(' + args + ') {\n' + iteratorTemplate(data) + '\n}'
    );
    // return the compiled function
    return factory(
      arrayClass, bind, compareAscending, funcClass, hasOwnProperty, identity,
      iteratorBind, objectTypes, nativeKeys, propertyIsEnumerable, slice,
      stringClass, toString
    );
  }

  /**
   * Used by `sortBy` to compare transformed values of `collection`, sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {Number} Returns `-1` if `a` < `b`, `0` if `a` == `b`, or `1` if `a` > `b`.
   */
  function compareAscending(a, b) {
    a = a.criteria;
    b = b.criteria;

    if (a === undefined) {
      return 1;
    }
    if (b === undefined) {
      return -1;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  }

  /**
   * Used by `template` to replace tokens with their corresponding code snippets.
   *
   * @private
   * @param {String} match The matched token.
   * @param {String} index The `tokenized` index of the code snippet.
   * @returns {String} Returns the code snippet.
   */
  function detokenize(match, index) {
    return tokenized[index];
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {String} match The matched character to escape.
   * @returns {String} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Used by `escape` to escape characters for inclusion in HTML.
   *
   * @private
   * @param {String} match The matched character to escape.
   * @returns {String} Returns the escaped character.
   */
  function escapeHtmlChar(match) {
    return htmlEscapes[match];
  }

  /**
   * Creates a new function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and the arguments (value, index, object).
   *
   * @private
   * @param {Function} func The function to bind.
   * @param {Mixed} [thisArg] The `this` binding of `func`.
   * @returns {Function} Returns the new bound function.
   */
  function iteratorBind(func, thisArg) {
    return function(value, index, object) {
      return func.call(thisArg, value, index, object);
    };
  }

  /**
   * A no-operation function.
   *
   * @private
   */
  function noop() {
    // no operation performed
  }

  /**
   * A shim implementation of `Object.keys` that produces an array of the given
   * object's own enumerable property names.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names.
   */
  var shimKeys = createIterator({
    'args': 'object',
    'exit': 'if (!(object && objectTypes[typeof object])) throw TypeError()',
    'init': '[]',
    'inLoop': 'result.push(index)'
  });

  /**
   * Used by `template` to replace "escape" template delimiters with tokens.
   *
   * @private
   * @param {String} match The matched template delimiter.
   * @param {String} value The delimiter value.
   * @returns {String} Returns a token.
   */
  function tokenizeEscape(match, value) {
    if (reComplexDelimiter.test(value)) {
      return '<e%-' + value + '%>';
    }
    var index = tokenized.length;
    tokenized[index] = "' +\n__e(" + value + ") +\n'";
    return token + index;
  }

  /**
   * Used by `template` to replace "evaluate" template delimiters, or complex
   * "escape" and "interpolate" delimiters, with tokens.
   *
   * @private
   * @param {String} match The matched template delimiter.
   * @param {String} value The delimiter value.
   * @param {String} escapeValue The "escape" delimiter value.
   * @param {String} interpolateValue The "interpolate" delimiter value.
   * @returns {String} Returns a token.
   */
  function tokenizeEvaluate(match, value, escapeValue, interpolateValue) {
    var index = tokenized.length;
    if (value) {
      tokenized[index] = "';\n" + value + ";\n__p += '"
    } else if (escapeValue) {
      tokenized[index] = "' +\n__e(" + escapeValue + ") +\n'";
    } else if (interpolateValue) {
      tokenized[index] = "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    return token + index;
  }

  /**
   * Used by `template` to replace "interpolate" template delimiters with tokens.
   *
   * @private
   * @param {String} match The matched template delimiter.
   * @param {String} value The delimiter value.
   * @returns {String} Returns a token.
   */
  function tokenizeInterpolate(match, value) {
    if (reComplexDelimiter.test(value)) {
      return '<e%=' + value + '%>';
    }
    var index = tokenized.length;
    tokenized[index] = "' +\n((__t = (" + value + ")) == null ? '' : __t) +\n'";
    return token + index;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if a given `target` value is present in a `collection` using strict
   * equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @alias include
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Mixed} target The value to check for.
   * @returns {Boolean} Returns `true` if `target` value is found, else `false`.
   * @example
   *
   * _.contains([1, 2, 3], 3);
   * // => true
   *
   * _.contains({ 'name': 'moe', 'age': 40 }, 'moe');
   * // => true
   *
   * _.contains('curly', 'ur');
   * // => true
   */
  var contains = createIterator({
    'args': 'collection, target',
    'init': 'false',
    'noCharByIndex': false,
    'beforeLoop': {
      'array': 'if (toString.call(iteratee) == stringClass) return collection.indexOf(target) > -1'
    },
    'inLoop': 'if (iteratee[index] === target) return true'
  });

  /**
   * Checks if the `callback` returns a truthy value for **all** elements of a
   * `collection`. The `callback` is bound to `thisArg` and invoked with 3
   * arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Boolean} Returns `true` if all values pass the callback check, else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   */
  var every = createIterator(baseIteratorOptions, everyIteratorOptions);

  /**
   * Examines each value in a `collection`, returning an array of all values the
   * `callback` returns truthy for. The `callback` is bound to `thisArg` and
   * invoked with 3 arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of values that passed callback check.
   * @example
   *
   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [2, 4, 6]
   */
  var filter = createIterator(baseIteratorOptions, filterIteratorOptions);

  /**
   * Examines each value in a `collection`, returning the first one the `callback`
   * returns truthy for. The function returns as soon as it finds an acceptable
   * value, and does not iterate over the entire `collection`. The `callback` is
   * bound to `thisArg` and invoked with 3 arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias detect
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the value that passed the callback check, else `undefined`.
   * @example
   *
   * var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => 2
   */
  var find = createIterator(baseIteratorOptions, forEachIteratorOptions, {
    'init': '',
    'inLoop': 'if (callback(iteratee[index], index, collection)) return iteratee[index]'
  });

  /**
   * Iterates over a `collection`, executing the `callback` for each value in the
   * `collection`. The `callback` is bound to `thisArg` and invoked with 3
   * arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array|Object} Returns the `collection`.
   * @example
   *
   * _([1, 2, 3]).forEach(alert).join(',');
   * // => alerts each number and returns '1,2,3'
   *
   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, alert);
   * // => alerts each number (order is not guaranteed)
   */
  var forEach = createIterator(baseIteratorOptions, forEachIteratorOptions);

  /**
   * Splits `collection` into sets, grouped by the result of running each value
   * through `callback`. The `callback` is bound to `thisArg` and invoked with
   * 3 arguments; (value, index|key, collection). The `callback` argument may
   * also be the name of a property to group by.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback The function called per iteration or
   *  property name to group by.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns an object of grouped values.
   * @example
   *
   * _.groupBy([1.3, 2.1, 2.4], function(num) { return Math.floor(num); });
   * // => { '1': [1.3], '2': [2.1, 2.4] }
   *
   * _.groupBy([1.3, 2.1, 2.4], function(num) { return this.floor(num); }, Math);
   * // => { '1': [1.3], '2': [2.1, 2.4] }
   *
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */
  var groupBy = createIterator(baseIteratorOptions, {
    'init': '{}',
    'top':
      'var prop, isFunc = typeof callback == \'function\';\n' +
      'if (isFunc && thisArg) callback = iteratorBind(callback, thisArg)',
    'inLoop':
      'prop = isFunc\n' +
      '  ? callback(iteratee[index], index, collection)\n' +
      '  : iteratee[index][callback];\n' +
      '(hasOwnProperty.call(result, prop) ? result[prop] : result[prop] = []).push(iteratee[index])'
  });

  /**
   * Invokes the method named by `methodName` on each element in the `collection`.
   * Additional arguments will be passed to each invoked method. If `methodName`
   * is a function it will be invoked for, and `this` bound to, each element
   * in the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} methodName The name of the method to invoke or
   *  the function invoked per iteration.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
   * @returns {Array} Returns a new array of values returned from each invoked method.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invoke([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
  var invoke = createIterator(mapIteratorOptions, {
    'args': 'collection, methodName',
    'top':
      'var args = slice.call(arguments, 2),\n' +
      '    isFunc = typeof methodName == \'function\'',
    'inLoop': {
      'array':
        'result[index] = (isFunc ? methodName : iteratee[index][methodName])' +
        '.apply(iteratee[index], args)',
      'object':
        'result' + (isKeysFast ? '[propIndex] = ' : '.push') +
        '((isFunc ? methodName : iteratee[index][methodName]).apply(iteratee[index], args))'
    }
  });

  /**
   * Produces a new array of values by mapping each element in the `collection`
   * through a transformation `callback`. The `callback` is bound to `thisArg`
   * and invoked with 3 arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of values returned by the callback.
   * @example
   *
   * _.map([1, 2, 3], function(num) { return num * 3; });
   * // => [3, 6, 9]
   *
   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
   * // => [3, 6, 9] (order is not guaranteed)
   */
  var map = createIterator(baseIteratorOptions, mapIteratorOptions);

  /**
   * Retrieves the value of a specified property from all elements in
   * the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {String} property The property to pluck.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.pluck(stooges, 'name');
   * // => ['moe', 'larry', 'curly']
   */
  var pluck = createIterator(mapIteratorOptions, {
    'args': 'collection, property',
    'inLoop': {
      'array':  'result[index] = iteratee[index][property]',
      'object': 'result' + (isKeysFast ? '[propIndex] = ' : '.push') + '(iteratee[index][property])'
    }
  });

  /**
   * Boils down a `collection` to a single value. The initial state of the
   * reduction is `accumulator` and each successive step of it should be returned
   * by the `callback`. The `callback` is bound to `thisArg` and invoked with 4
   * arguments; for arrays they are (accumulator, value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; });
   * // => 6
   */
  var reduce = createIterator({
    'args': 'collection, callback, accumulator, thisArg',
    'init': 'accumulator',
    'top':
      'var noaccum = arguments.length < 3;\n' +
      'if (thisArg) callback = iteratorBind(callback, thisArg)',
    'beforeLoop': {
      'array': 'if (noaccum) result = collection[++index]'
    },
    'inLoop': {
      'array':
        'result = callback(result, iteratee[index], index, collection)',
      'object':
        'result = noaccum\n' +
        '  ? (noaccum = false, iteratee[index])\n' +
        '  : callback(result, iteratee[index], index, collection)'
    }
  });

  /**
   * The right-associative version of `_.reduce`.
   *
   * @static
   * @memberOf _
   * @alias foldr
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var list = [[0, 1], [2, 3], [4, 5]];
   * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
   * // => [4, 5, 2, 3, 0, 1]
   */
  function reduceRight(collection, callback, accumulator, thisArg) {
    if (!collection) {
      return accumulator;
    }

    var length = collection.length,
        noaccum = arguments.length < 3;

    if(thisArg) {
      callback = iteratorBind(callback, thisArg);
    }
    if (length === length >>> 0) {
      var iteratee = noCharByIndex && toString.call(collection) == stringClass
        ? collection.split('')
        : collection;

      if (length && noaccum) {
        accumulator = iteratee[--length];
      }
      while (length--) {
        accumulator = callback(accumulator, iteratee[length], length, collection);
      }
      return accumulator;
    }

    var prop,
        props = keys(collection);

    length = props.length;
    if (length && noaccum) {
      accumulator = collection[props[--length]];
    }
    while (length--) {
      prop = props[length];
      accumulator = callback(accumulator, collection[prop], prop, collection);
    }
    return accumulator;
  }

  /**
   * The opposite of `_.filter`, this method returns the values of a
   * `collection` that `callback` does **not** return truthy for.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of values that did **not** pass the callback check.
   * @example
   *
   * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [1, 3, 5]
   */
  var reject = createIterator(baseIteratorOptions, filterIteratorOptions, {
    'inLoop': '!' + filterIteratorOptions.inLoop
  });

  /**
   * Checks if the `callback` returns a truthy value for **any** element of a
   * `collection`. The function returns as soon as it finds passing value, and
   * does not iterate over the entire `collection`. The `callback` is bound to
   * `thisArg` and invoked with 3 arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias any
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Boolean} Returns `true` if any value passes the callback check, else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false]);
   * // => true
   */
  var some = createIterator(baseIteratorOptions, everyIteratorOptions, {
    'init': 'false',
    'inLoop': everyIteratorOptions.inLoop.replace('!', '')
  });


  /**
   * Produces a new sorted array, sorted in ascending order by the results of
   * running each element of `collection` through a transformation `callback`.
   * The `callback` is bound to `thisArg` and invoked with 3 arguments;
   * (value, index|key, collection). The `callback` argument may also be the
   * name of a property to sort by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback The function called per iteration or
   *  property name to sort by.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of sorted values.
   * @example
   *
   * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
   * // => [3, 1, 2]
   *
   * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
   * // => [3, 1, 2]
   *
   * _.sortBy(['larry', 'brendan', 'moe'], 'length');
   * // => ['moe', 'larry', 'brendan']
   */
  var sortBy = createIterator(baseIteratorOptions, mapIteratorOptions, {
    'top':
      'if (typeof callback == \'string\') {\n' +
      '  var prop = callback;\n' +
      '  callback = function(collection) { return collection[prop] }\n' +
      '}\n' +
      'else if (thisArg) {\n' +
      '  callback = iteratorBind(callback, thisArg)\n' +
      '}',
    'inLoop': {
      'array':
        'result[index] = {\n' +
        '  criteria: callback(iteratee[index], index, collection),\n' +
        '  value: iteratee[index]\n' +
        '}',
      'object':
        'result' + (isKeysFast ? '[propIndex] = ' : '.push') + '({\n' +
        '  criteria: callback(iteratee[index], index, collection),\n' +
        '  value: iteratee[index]\n' +
        '})'
    },
    'bottom':
      'result.sort(compareAscending);\n' +
      'length = result.length;\n' +
      'while (length--) {\n' +
      '  result[length] = result[length].value\n' +
      '}'
  });

  /**
   * Converts the `collection`, into an array. Useful for converting the
   * `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to convert.
   * @returns {Array} Returns the new converted array.
   * @example
   *
   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
   * // => [2, 3, 4]
   */
  function toArray(collection) {
    if (!collection) {
      return [];
    }
    if (collection.toArray && toString.call(collection.toArray) == funcClass) {
      return collection.toArray();
    }
    var length = collection.length;
    if (length === length >>> 0) {
      return (noArraySliceOnStrings ? toString.call(collection) == stringClass : typeof collection == 'string')
        ? collection.split('')
        : slice.call(collection);
    }
    return values(collection);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Produces a new array with all falsey values of `array` removed. The values
   * `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (array[index]) {
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Produces a new array of `array` values not present in the other arrays
   * using strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Array} [array1, array2, ...] Arrays to check.
   * @returns {Array} Returns a new array of `array` values not present in the
   *  other arrays.
   * @example
   *
   * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
   * // => [1, 3, 4]
   */
  function difference(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var index = -1,
        length = array.length,
        flattened = concat.apply(result, arguments);

    while (++index < length) {
      if (indexOf(flattened, array[index], length) < 0) {
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Gets the first value of the `array`. Pass `n` to return the first `n` values
   * of the `array`.
   *
   * @static
   * @memberOf _
   * @alias head, take
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Mixed} Returns the first value or an array of the first `n` values
   *  of `array`.
   * @example
   *
   * _.first([5, 4, 3, 2, 1]);
   * // => 5
   */
  function first(array, n, guard) {
    if (array) {
      return (n == null || guard) ? array[0] : slice.call(array, 0, n);
    }
  }

  /**
   * Flattens a nested array (the nesting can be to any depth). If `shallow` is
   * truthy, `array` will only be flattened a single level.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @param {Boolean} shallow A flag to indicate only flattening a single level.
   * @returns {Array} Returns a new flattened array.
   * @example
   *
   * _.flatten([1, [2], [3, [[4]]]]);
   * // => [1, 2, 3, 4];
   *
   * _.flatten([1, [2], [3, [[4]]]], true);
   * // => [1, 2, 3, [[4]]];
   */
  function flatten(array, shallow) {
    var result = [];
    if (!array) {
      return result;
    }
    var value,
        index = -1,
        length = array.length;

    while (++index < length) {
      value = array[index];
      if (isArray(value)) {
        push.apply(result, shallow ? value : flatten(value));
      } else {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the index at which the first occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If the `array` is already
   * sorted, passing `true` for `isSorted` will run a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Boolean|Number} [fromIndex=0] The index to start searching from or
   *  `true` to perform a binary search on a sorted `array`.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 1
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 4
   *
   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    if (!array) {
      return -1;
    }
    var index = -1,
        length = array.length;

    if (fromIndex) {
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? Math.max(0, length + fromIndex) : fromIndex) - 1;
      } else {
        index = sortedIndex(array, value);
        return array[index] === value ? index : -1;
      }
    }
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets all but the last value of `array`. Pass `n` to exclude the last `n`
   * values from the result.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the last value or `n` values of `array`.
   * @example
   *
   * _.initial([3, 2, 1]);
   * // => [3, 2]
   */
  function initial(array, n, guard) {
    if (!array) {
      return [];
    }
    return slice.call(array, 0, -((n == null || guard) ? 1 : n));
  }

  /**
   * Computes the intersection of all the passed-in arrays.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique values, in order, that are
   *  present in **all** of the arrays.
   * @example
   *
   * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2]
   */
  function intersection(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var value,
        index = -1,
        length = array.length,
        others = slice.call(arguments, 1);

    while (++index < length) {
      value = array[index];
      if (indexOf(result, value) < 0 &&
          every(others, function(other) { return indexOf(other, value) > -1; })) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the last value of the `array`. Pass `n` to return the lasy `n` values
   * of the `array`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Mixed} Returns the last value or an array of the last `n` values
   *  of `array`.
   * @example
   *
   * _.last([3, 2, 1]);
   * // => 1
   */
  function last(array, n, guard) {
    if (array) {
      var length = array.length;
      return (n == null || guard) ? array[length - 1] : slice.call(array, -n || length);
    }
  }

  /**
   * Gets the index at which the last occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Number} [fromIndex=array.length-1] The index to start searching from.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 4
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 1
   */
  function lastIndexOf(array, value, fromIndex) {
    if (!array) {
      return -1;
    }
    var index = array.length;
    if (fromIndex && typeof fromIndex == 'number') {
      index = (fromIndex < 0 ? Math.max(0, index + fromIndex) : Math.min(fromIndex, index - 1)) + 1;
    }
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Retrieves the maximum value of an `array`. If `callback` is passed,
   * it will be executed for each value in the `array` to generate the
   * criterion by which the value is ranked. The `callback` is bound to
   * `thisArg` and invoked with 3 arguments; (value, index, array).
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the maximum value.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.max(stooges, function(stooge) { return stooge.age; });
   * // => { 'name': 'curly', 'age': 60 };
   */
  function max(array, callback, thisArg) {
    var computed = -Infinity,
        result = computed;

    if (!array) {
      return result;
    }
    var current,
        index = -1,
        length = array.length;

    if (!callback) {
      while (++index < length) {
        if (array[index] > result) {
          result = array[index];
        }
      }
      return result;
    }
    if (thisArg) {
      callback = iteratorBind(callback, thisArg);
    }
    while (++index < length) {
      current = callback(array[index], index, array);
      if (current > computed) {
        computed = current;
        result = array[index];
      }
    }
    return result;
  }

  /**
   * Retrieves the minimum value of an `array`. If `callback` is passed,
   * it will be executed for each value in the `array` to generate the
   * criterion by which the value is ranked. The `callback` is bound to `thisArg`
   * and invoked with 3 arguments; (value, index, array).
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the minimum value.
   * @example
   *
   * _.min([10, 5, 100, 2, 1000]);
   * // => 2
   */
  function min(array, callback, thisArg) {
    var computed = Infinity,
        result = computed;

    if (!array) {
      return result;
    }
    var current,
        index = -1,
        length = array.length;

    if (!callback) {
      while (++index < length) {
        if (array[index] < result) {
          result = array[index];
        }
      }
      return result;
    }
    if (thisArg) {
      callback = iteratorBind(callback, thisArg);
    }
    while (++index < length) {
      current = callback(array[index], index, array);
      if (current < computed) {
        computed = current;
        result = array[index];
      }
    }
    return result;
  }

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to but not including `stop`. This method is a port of Python's
   * `range()` function. See http://docs.python.org/library/functions.html#range.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Number} [start=0] The start of the range.
   * @param {Number} end The end of the range.
   * @param {Number} [step=1] The value to increment or descrement by.
   * @returns {Array} Returns a new range array.
   * @example
   *
   * _.range(10);
   * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   *
   * _.range(1, 11);
   * // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   *
   * _.range(0, 30, 5);
   * // => [0, 5, 10, 15, 20, 25]
   *
   * _.range(0, -10, -1);
   * // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
   *
   * _.range(0);
   * // => []
   */
  function range(start, end, step) {
    step || (step = 1);
    if (end == null) {
      end = start || 0;
      start = 0;
    }
    // use `Array(length)` so V8 will avoid the slower "dictionary" mode
    // http://www.youtube.com/watch?v=XAqIpGU8ZZk#t=16m27s
    var index = -1,
        length = Math.max(0, Math.ceil((end - start) / step)),
        result = Array(length);

    while (++index < length) {
      result[index] = start;
      start += step;
    }
    return result;
  }

  /**
   * The opposite of `_.initial`, this method gets all but the first value of
   * `array`. Pass `n` to exclude the first `n` values from the result.
   *
   * @static
   * @memberOf _
   * @alias tail
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the first value or `n` values of `array`.
   * @example
   *
   * _.rest([3, 2, 1]);
   * // => [2, 1]
   */
  function rest(array, n, guard) {
    if (!array) {
      return [];
    }
    return slice.call(array, (n == null || guard) ? 1 : n);
  }

  /**
   * Produces a new array of shuffled `array` values, using a version of the
   * Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to shuffle.
   * @returns {Array} Returns a new shuffled array.
   * @example
   *
   * _.shuffle([1, 2, 3, 4, 5, 6]);
   * // => [4, 1, 6, 3, 5, 2]
   */
  function shuffle(array) {
    if (!array) {
      return [];
    }
    var rand,
        index = -1,
        length = array.length,
        result = Array(length);

    while (++index < length) {
      rand = Math.floor(Math.random() * (index + 1));
      result[index] = result[rand];
      result[rand] = array[index];
    }
    return result;
  }

  /**
   * Uses a binary search to determine the smallest index at which the `value`
   * should be inserted into `array` in order to maintain the sort order of the
   * sorted `array`. If `callback` is passed, it will be executed for `value` and
   * each element in `array` to compute their sort ranking. The `callback` is
   * bound to `thisArg` and invoked with 1 argument; (value).
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to evaluate.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Number} Returns the index at which the value should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedIndex([20, 30, 40], 35);
   * // => 2
   *
   * var dict = {
   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'thirty-five': 35, 'fourty': 40 }
   * };
   *
   * _.sortedIndex(['twenty', 'thirty', 'fourty'], 'thirty-five', function(word) {
   *   return dict.wordToNumber[word];
   * });
   * // => 2
   *
   * _.sortedIndex(['twenty', 'thirty', 'fourty'], 'thirty-five', function(word) {
   *   return this.wordToNumber[word];
   * }, dict);
   * // => 2
   */
  function sortedIndex(array, value, callback, thisArg) {
    if (!array) {
      return 0;
    }
    var mid,
        low = 0,
        high = array.length;

    if (callback) {
      if (thisArg) {
        callback = bind(callback, thisArg);
      }
      value = callback(value);
      while (low < high) {
        mid = (low + high) >>> 1;
        callback(array[mid]) < value ? low = mid + 1 : high = mid;
      }
    } else {
      while (low < high) {
        mid = (low + high) >>> 1;
        array[mid] < value ? low = mid + 1 : high = mid;
      }
    }
    return low;
  }

  /**
   * Computes the union of the passed-in arrays.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique values, in order, that are
   *  present in one or more of the arrays.
   * @example
   *
   * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2, 3, 101, 10]
   */
  function union() {
    var index = -1,
        result = [],
        flattened = concat.apply(result, arguments),
        length = flattened.length;

    while (++index < length) {
      if (indexOf(result, flattened[index]) < 0) {
        result.push(flattened[index]);
      }
    }
    return result;
  }

  /**
   * Produces a duplicate-value-free version of the `array` using strict equality
   * for comparisons, i.e. `===`. If the `array` is already sorted, passing `true`
   * for `isSorted` will run a faster algorithm. If `callback` is passed,
   * each value of `array` is passed through a transformation `callback` before
   * uniqueness is computed. The `callback` is bound to `thisArg` and invoked
   * with 3 arguments; (value, index, array).
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a duplicate-value-free array.
   * @example
   *
   * _.uniq([1, 2, 1, 3, 1]);
   * // => [1, 2, 3]
   *
   * _.uniq([1, 1, 2, 2, 3], true);
   * // => [1, 2, 3]
   *
   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return Math.floor(num); });
   * // => [1, 2, 3]
   *
   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return this.floor(num); }, Math);
   * // => [1, 2, 3]
   */
  function uniq(array, isSorted, callback, thisArg) {
    var result = [];
    if (!array) {
      return result;
    }
    var computed,
        index = -1,
        length = array.length,
        seen = [];

    // juggle arguments
    if (typeof isSorted == 'function') {
      thisArg = callback;
      callback = isSorted;
      isSorted = false;
    }
    if (!callback) {
      callback = identity;
    } else if (thisArg) {
      callback = iteratorBind(callback, thisArg);
    }
    while (++index < length) {
      computed = callback(array[index], index, array);
      if (isSorted
            ? !index || seen[seen.length - 1] !== computed
            : indexOf(seen, computed) < 0
          ) {
        seen.push(computed);
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Produces a new array with all occurrences of the passed values removed using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to filter.
   * @param {Mixed} [value1, value2, ...] Values to remove.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
   * // => [2, 3, 4]
   */
  function without(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (indexOf(arguments, array[index], 1) < 0) {
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Merges the elements of each array at their corresponding indexes. Useful for
   * separate data sources that are coordinated through matching array indexes.
   * For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix
   * in a similar fashion.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of merged arrays.
   * @example
   *
   * _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
   * // => [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]
   */
  function zip(array) {
    if (!array) {
      return [];
    }
    var index = -1,
        length = max(pluck(arguments, 'length')),
        result = Array(length);

    while (++index < length) {
      result[index] = pluck(arguments, index);
    }
    return result;
  }

  /**
   * Merges an array of `keys` and an array of `values` into a single object.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} keys The array of keys.
   * @param {Array} [values=[]] The array of values.
   * @returns {Object} Returns an object composed of the given keys and
   *  corresponding values.
   * @example
   *
   * _.zipObject(['moe', 'larry', 'curly'], [30, 40, 50]);
   * // => { 'moe': 30, 'larry': 40, 'curly': 50 }
   */
  function zipObject(keys, values) {
    if (!keys) {
      return {};
    }
    var index = -1,
        length = keys.length,
        result = {};

    values || (values = []);
    while (++index < length) {
      result[keys[index]] = values[index];
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new function that is restricted to executing only after it is
   * called `n` times.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Number} n The number of times the function must be called before
   * it is executed.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var renderNotes = _.after(notes.length, render);
   * _.forEach(notes, function(note) {
   *   note.asyncSave({ 'success': renderNotes });
   * });
   * // `renderNotes` is run once, after all notes have saved
   */
  function after(n, func) {
    if (n < 1) {
      return func();
    }
    return function() {
      if (--n < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  /**
   * Creates a new function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends any additional `bind` arguments to those
   * passed to the bound function. Lazy defined methods may be bound by passing
   * the object they are bound to as `func` and the method name as `thisArg`.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function|Object} func The function to bind or the object the method belongs to.
   * @param {Mixed} [thisArg] The `this` binding of `func` or the method name.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * // basic bind
   * var func = function(greeting) {
   *   return greeting + ' ' + this.name;
   * };
   *
   * func = _.bind(func, { 'name': 'moe' }, 'hi');
   * func();
   * // => 'hi moe'
   *
   * // lazy bind
   * var object = {
   *   'name': 'moe',
   *   'greet': function(greeting) {
   *     return greeting + ' ' + this.name;
   *   }
   * };
   *
   * var func = _.bind(object, 'greet', 'hi');
   * func();
   * // => 'hi moe'
   *
   * object.greet = function(greeting) {
   *   return greeting + ', ' + this.name + '!';
   * };
   *
   * func();
   * // => 'hi, moe!'
   */
  function bind(func, thisArg) {
    var methodName,
        isFunc = toString.call(func) == funcClass;

    // juggle arguments
    if (!isFunc) {
      methodName = thisArg;
      thisArg = func;
    }
    // use `Function#bind` if it exists and is fast
    // (in V8 `Function#bind` is slower except when partially applied)
    else if (isBindFast || (nativeBind && arguments.length > 2)) {
      return nativeBind.call.apply(nativeBind, arguments);
    }

    var partialArgs = slice.call(arguments, 2);

    function bound() {
      // `Function#bind` spec
      // http://es5.github.com/#x15.3.4.5
      var args = arguments,
          thisBinding = thisArg;

      if (!isFunc) {
        func = thisArg[methodName];
      }
      if (partialArgs.length) {
        args = args.length
          ? concat.apply(partialArgs, args)
          : partialArgs;
      }
      if (this instanceof bound) {
        // get `func` instance if `bound` is invoked in a `new` expression
        noop.prototype = func.prototype;
        thisBinding = new noop;

        // mimic the constructor's `return` behavior
        // http://es5.github.com/#x13.2.2
        var result = func.apply(thisBinding, args);
        return result && objectTypes[typeof result]
          ? result
          : thisBinding
      }
      return func.apply(thisBinding, args);
    }
    return bound;
  }

  /**
   * Binds methods on `object` to `object`, overwriting the existing method.
   * If no method names are provided, all the function properties of `object`
   * will be bound.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {String} [methodName1, methodName2, ...] Method names on the object to bind.
   * @returns {Object} Returns the `object`.
   * @example
   *
   * var buttonView = {
   *  'label': 'lodash',
   *  'onClick': function() { alert('clicked: ' + this.label); }
   * };
   *
   * _.bindAll(buttonView);
   * jQuery('#lodash_button').on('click', buttonView.onClick);
   * // => When the button is clicked, `this.label` will have the correct value
   */
  var bindAll = createIterator({
    'useHas': false,
    'useStrict': false,
    'args': 'object',
    'init': 'object',
    'top':
      'var funcs = arguments,\n' +
      '    length = funcs.length;\n' +
      'if (length > 1) {\n' +
      '  for (var index = 1; index < length; index++)\n' +
      '    result[funcs[index]] = bind(result[funcs[index]], result);\n' +
      '  return result\n' +
      '}',
    'inLoop':
      'if (toString.call(result[index]) == funcClass)' +
      ' result[index] = bind(result[index], result)'
  });

  /**
   * Creates a new function that is the composition of the passed functions,
   * where each function consumes the return value of the function that follows.
   * In math terms, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} [func1, func2, ...] Functions to compose.
   * @returns {Function} Returns the new composed function.
   * @example
   *
   * var greet = function(name) { return 'hi: ' + name; };
   * var exclaim = function(statement) { return statement + '!'; };
   * var welcome = _.compose(exclaim, greet);
   * welcome('moe');
   * // => 'hi: moe!'
   */
  function compose() {
    var funcs = arguments;
    return function() {
      var args = arguments,
          length = funcs.length;

      while (length--) {
        args = [funcs[length].apply(this, args)];
      }
      return args[0];
    };
  }

  /**
   * Creates a new function that will delay the execution of `func` until after
   * `wait` milliseconds have elapsed since the last time it was invoked. Pass
   * `true` for `immediate` to cause debounce to invoke `func` on the leading,
   * instead of the trailing, edge of the `wait` timeout. Subsequent calls to
   * the debounced function will return the result of the last `func` call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to debounce.
   * @param {Number} wait The number of milliseconds to delay.
   * @param {Boolean} immediate A flag to indicate execution is on the leading
   *  edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * var lazyLayout = _.debounce(calculateLayout, 300);
   * jQuery(window).on('resize', lazyLayout);
   */
  function debounce(func, wait, immediate) {
    var args,
        result,
        thisArg,
        timeoutId;

    function delayed() {
      timeoutId = null;
      if (!immediate) {
        func.apply(thisArg, args);
      }
    }

    return function() {
      var isImmediate = immediate && !timeoutId;
      args = arguments;
      thisArg = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(delayed, wait);

      if (isImmediate) {
        result = func.apply(thisArg, args);
      }
      return result;
    };
  }

  /**
   * Executes the `func` function after `wait` milliseconds. Additional arguments
   * are passed to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to delay.
   * @param {Number} wait The number of milliseconds to delay execution.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * var log = _.bind(console.log, console);
   * _.delay(log, 1000, 'logged later');
   * // => 'logged later' (Appears after one second.)
   */
  function delay(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function() { return func.apply(undefined, args); }, wait);
  }

  /**
   * Defers executing the `func` function until the current call stack has cleared.
   * Additional arguments are passed to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to defer.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * _.defer(function() { alert('deferred'); });
   * // returns from the function before `alert` is called
   */
  function defer(func) {
    var args = slice.call(arguments, 1);
    return setTimeout(function() { return func.apply(undefined, args); }, 1);
  }

  /**
   * Creates a new function that memoizes the result of `func`. If `resolver` is
   * passed, it will be used to determine the cache key for storing the result
   * based on the arguments passed to the memoized function. By default, the first
   * argument passed to the memoized function is used as the cache key.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] A function used to resolve the cache key.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var fibonacci = _.memoize(function(n) {
   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
   * });
   */
  function memoize(func, resolver) {
    var cache = {};
    return function() {
      var prop = resolver ? resolver.apply(this, arguments) : arguments[0];
      return hasOwnProperty.call(cache, prop)
        ? cache[prop]
        : (cache[prop] = func.apply(this, arguments));
    };
  }

  /**
   * Creates a new function that is restricted to one execution. Repeat calls to
   * the function will return the value of the first call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // Application is only created once.
   */
  function once(func) {
    var result,
        ran = false;

    return function() {
      if (ran) {
        return result;
      }
      ran = true;
      result = func.apply(this, arguments);
      return result;
    };
  }

  /**
   * Creates a new function that, when called, invokes `func` with any additional
   * `partial` arguments prepended to those passed to the partially applied
   * function. This method is similar `bind`, except it does **not** alter the
   * `this` binding.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to partially apply arguments to.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) { return greeting + ': ' + name; };
   * var hi = _.partial(greet, 'hi');
   * hi('moe');
   * // => 'hi: moe'
   */
  function partial(func) {
    var args = slice.call(arguments, 1),
        argsLength = args.length;

    return function() {
      var result,
          others = arguments;

      if (others.length) {
        args.length = argsLength;
        push.apply(args, others);
      }
      result = args.length == 1 ? func.call(this, args[0]) : func.apply(this, args);
      args.length = argsLength;
      return result;
    };
  }

  /**
   * Creates a new function that, when executed, will only call the `func`
   * function at most once per every `wait` milliseconds. If the throttled
   * function is invoked more than once during the `wait` timeout, `func` will
   * also be called on the trailing edge of the timeout. Subsequent calls to the
   * throttled function will return the result of the last `func` call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to throttle.
   * @param {Number} wait The number of milliseconds to throttle executions to.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * var throttled = _.throttle(updatePosition, 100);
   * jQuery(window).on('scroll', throttled);
   */
  function throttle(func, wait) {
    var args,
        result,
        thisArg,
        timeoutId,
        lastCalled = 0;

    function trailingCall() {
      lastCalled = new Date;
      timeoutId = null;
      func.apply(thisArg, args);
    }

    return function() {
      var now = new Date,
          remain = wait - (now - lastCalled);

      args = arguments;
      thisArg = this;

      if (remain <= 0) {
        lastCalled = now;
        result = func.apply(thisArg, args);
      }
      else if (!timeoutId) {
        timeoutId = setTimeout(trailingCall, remain);
      }
      return result;
    };
  }

  /**
   * Create a new function that passes the `func` function to the `wrapper`
   * function as its first argument. Additional arguments are appended to those
   * passed to the `wrapper` function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to wrap.
   * @param {Function} wrapper The wrapper function.
   * @param {Mixed} [arg1, arg2, ...] Arguments to append to those passed to the wrapper.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var hello = function(name) { return 'hello: ' + name; };
   * hello = _.wrap(hello, function(func) {
   *   return 'before, ' + func('moe') + ', after';
   * });
   * hello();
   * // => 'before, hello: moe, after'
   */
  function wrap(func, wrapper) {
    return function() {
      var args = [func];
      if (arguments.length) {
        push.apply(args, arguments);
      }
      return wrapper.apply(this, args);
    };
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a shallow clone of the `value`. Any nested objects or arrays will be
   * assigned by reference and not cloned.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to clone.
   * @returns {Mixed} Returns the cloned `value`.
   * @example
   *
   * _.clone({ 'name': 'moe' });
   * // => { 'name': 'moe' };
   */
  function clone(value) {
    return value && objectTypes[typeof value]
      ? (isArray(value) ? value.slice() : extend({}, value))
      : value;
  }

  /**
   * Assigns missing properties on `object` with default values from the defaults
   * objects. Once a property is set, additional defaults of the same property
   * will be ignored.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to populate.
   * @param {Object} [defaults1, defaults2, ...] The defaults objects to apply to `object`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var iceCream = { 'flavor': 'chocolate' };
   * _.defaults(iceCream, { 'flavor': 'vanilla', 'sprinkles': 'rainbow' });
   * // => { 'flavor': 'chocolate', 'sprinkles': 'rainbow' }
   */
  var defaults = createIterator(extendIteratorOptions, {
    'inLoop': 'if (result[index] == null) ' + extendIteratorOptions.inLoop
  });

  /**
   * Copies enumerable properties from the source objects to the `destination` object.
   * Subsequent sources will overwrite propery assignments of previous sources.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {Object} [source1, source2, ...] The source objects.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.extend({ 'name': 'moe' }, { 'age': 40 });
   * // => { 'name': 'moe', 'age': 40 }
   */
  var extend = createIterator(extendIteratorOptions);

  /**
   * Iterates over `object`'s own and inherited enumerable properties, executing
   * the `callback` for each property. The `callback` is bound to `thisArg` and
   * invoked with 3 arguments; (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns the `object`.
   * @example
   *
   * function Dog(name) {
   *   this.name = name;
   * }
   *
   * Dog.prototype.bark = function() {
   *   alert('Woof, woof!');
   * };
   *
   * _.forIn(new Dog('Dagny'), function(value, key) {
   *   alert(key);
   * });
   * // => alerts 'name' and 'bark' (order is not guaranteed)
   */
  var forIn = createIterator(baseIteratorOptions, forEachIteratorOptions, forOwnIteratorOptions, {
    'useHas': false
  });

  /**
   * Iterates over `object`'s own enumerable properties, executing the `callback`
   * for each property. The `callback` is bound to `thisArg` and invoked with 3
   * arguments; (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns the `object`.
   * @example
   *
   * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
   *   alert(key);
   * });
   * // => alerts '0', '1', and 'length' (order is not guaranteed)
   */
  var forOwn = createIterator(baseIteratorOptions, forEachIteratorOptions, forOwnIteratorOptions);

  /**
   * Produces a sorted array of the enumerable properties, own and inherited,
   * of `object` that have function values.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names that have function values.
   * @example
   *
   * _.functions(_);
   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
   */
  var functions = createIterator({
    'useHas': false,
    'args': 'object',
    'init': '[]',
    'inLoop': 'if (toString.call(iteratee[index]) == funcClass) result.push(index)',
    'bottom': 'result.sort()'
  });

  /**
   * Checks if the specified object `property` exists and is a direct property,
   * instead of an inherited property.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to check.
   * @param {String} property The property to check for.
   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
   * @example
   *
   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
   * // => true
   */
  function has(object, property) {
    return hasOwnProperty.call(object, property);
  }

  /**
   * Checks if `value` is an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
   * @example
   *
   * (function() { return _.isArguments(arguments); })(1, 2, 3);
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = function(value) {
    return toString.call(value) == '[object Arguments]';
  };
  // fallback for browser like IE < 9 which detect `arguments` as `[object Object]`
  if (!isArguments(arguments)) {
    isArguments = function(value) {
      return !!(value && hasOwnProperty.call(value, 'callee'));
    };
  }

  /**
   * Checks if `value` is an array.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an array, else `false`.
   * @example
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   *
   * _.isArray([1, 2, 3]);
   * // => true
   */
  var isArray = nativeIsArray || function(value) {
    return toString.call(value) == arrayClass;
  };

  /**
   * Checks if `value` is a boolean (`true` or `false`) value.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a boolean value, else `false`.
   * @example
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false || toString.call(value) == boolClass;
  }

  /**
   * Checks if `value` is a date.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a date, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   */
  function isDate(value) {
    return toString.call(value) == dateClass;
  }

  /**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   */
  function isElement(value) {
    return !!(value && value.nodeType == 1);
  }

  /**
   * Checks if `value` is empty. Arrays or strings with a length of `0` and
   * objects with no own enumerable properties are considered "empty".
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Array|Object|String} value The value to inspect.
   * @returns {Boolean} Returns `true` if the `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({});
   * // => true
   *
   * _.isEmpty('');
   * // => true
   */
  var isEmpty = createIterator({
    'args': 'value',
    'init': 'true',
    'top':
      'var className = toString.call(value);\n' +
      'if (className == arrayClass || className == stringClass) return !value.length',
    'inLoop': {
      'object': 'return false'
    }
  });

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent to each other.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} a The value to compare.
   * @param {Mixed} b The other value to compare.
   * @param {Array} [stack] Internally used to keep track of "seen" objects to
   *  avoid circular references.
   * @returns {Boolean} Returns `true` if the values are equvalent, else `false`.
   * @example
   *
   * var moe = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   * var clone = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   *
   * moe == clone;
   * // => false
   *
   * _.isEqual(moe, clone);
   * // => true
   */
  function isEqual(a, b, stack) {
    stack || (stack = []);

    // exit early for identical values
    if (a === b) {
      // treat `+0` vs. `-0` as not equal
      return a !== 0 || (1 / a == 1 / b);
    }
    // a strict comparison is necessary because `undefined == null`
    if (a == null || b == null) {
      return a === b;
    }
    // unwrap any wrapped objects
    if (a._chain) {
      a = a._wrapped;
    }
    if (b._chain) {
      b = b._wrapped;
    }
    // invoke a custom `isEqual` method if one is provided
    if (a.isEqual && toString.call(a.isEqual) == funcClass) {
      return a.isEqual(b);
    }
    if (b.isEqual && toString.call(b.isEqual) == funcClass) {
      return b.isEqual(a);
    }
    // compare [[Class]] names
    var className = toString.call(a);
    if (className != toString.call(b)) {
      return false;
    }
    switch (className) {
      // strings, numbers, dates, and booleans are compared by value
      case stringClass:
        // primitives and their corresponding object instances are equivalent;
        // thus, `'5'` is quivalent to `new String('5')`
        return a == String(b);

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return a != +a
          ? b != +b
          // but treat `+0` vs. `-0` as not equal
          : (a == 0 ? (1 / a == 1 / b) : a == +b);

      case boolClass:
      case dateClass:
        // coerce dates and booleans to numeric values, dates to milliseconds and
        // booleans to 1 or 0; treat invalid dates coerced to `NaN` as not equal
        return +a == +b;

      // regexps are compared by their source and flags
      case regexpClass:
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') {
      return false;
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) {
        return true;
      }
    }

    var index = -1,
        result = true,
        size = 0;

    // add the first collection to the stack of traversed objects
    stack.push(a);

    // recursively compare objects and arrays
    if (className == arrayClass) {
      // compare array lengths to determine if a deep comparison is necessary
      size = a.length;
      result = size == b.length;

      if (result) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          if (!(result = isEqual(a[size], b[size], stack))) {
            break;
          }
        }
      }
    } else {
      // objects with different constructors are not equivalent
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
        return false;
      }
      // deep compare objects.
      for (var prop in a) {
        if (hasOwnProperty.call(a, prop)) {
          // count the number of properties.
          size++;
          // deep compare each property value.
          if (!(result = hasOwnProperty.call(b, prop) && isEqual(a[prop], b[prop], stack))) {
            break;
          }
        }
      }
      // ensure both objects have the same number of properties
      if (result) {
        for (prop in b) {
          // Adobe's JS engine, embedded in applications like InDesign, has a
          // bug that causes `!size--` to throw an error so it must be wrapped
          // in parentheses.
          // https://github.com/documentcloud/underscore/issues/355
          if (hasOwnProperty.call(b, prop) && !(size--)) {
            break;
          }
        }
        result = !size;
      }
      // handle JScript [[DontEnum]] bug
      if (result && hasDontEnumBug) {
        while (++index < 7) {
          prop = shadowed[index];
          if (hasOwnProperty.call(a, prop)) {
            if (!(result = hasOwnProperty.call(b, prop) && isEqual(a[prop], b[prop], stack))) {
              break;
            }
          }
        }
      }
    }
    // remove the first collection from the stack of traversed objects
    stack.pop();
    return result;
  }

  /**
   * Checks if `value` is a finite number.
   * Note: This is not the same as native `isFinite`, which will return true for
   * booleans and other values. See http://es5.github.com/#x15.1.2.5.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a finite number, else `false`.
   * @example
   *
   * _.isFinite(-101);
   * // => true
   *
   * _.isFinite('10');
   * // => false
   *
   * _.isFinite(Infinity);
   * // => false
   */
  function isFinite(value) {
    return nativeIsFinite(value) && toString.call(value) == numberClass;
  }

  /**
   * Checks if `value` is a function.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(''.concat);
   * // => true
   */
  function isFunction(value) {
    return toString.call(value) == funcClass;
  }

  /**
   * Checks if `value` is the language type of Object.
   * (e.g. arrays, functions, objects, regexps, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.com/#x8
    return value && objectTypes[typeof value];
  }

  /**
   * Checks if `value` is `NaN`.
   * Note: This is not the same as native `isNaN`, which will return true for
   * `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN(value) {
    // `NaN` as a primitive is the only value that is not equal to itself
    // (perform the [[Class]] check first to avoid errors with some host objects in IE)
    return toString.call(value) == numberClass && value != +value
  }

  /**
   * Checks if `value` is `null`.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(undefined);
   * // => false
   */
  function isNull(value) {
    return value === null;
  }

  /**
   * Checks if `value` is a number.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(8.4 * 5;
   * // => true
   */
  function isNumber(value) {
    return toString.call(value) == numberClass;
  }

  /**
   * Checks if `value` is a regular expression.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a regular expression, else `false`.
   * @example
   *
   * _.isRegExp(/moe/);
   * // => true
   */
  function isRegExp(value) {
    return toString.call(value) == regexpClass;
  }

  /**
   * Checks if `value` is a string.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a string, else `false`.
   * @example
   *
   * _.isString('moe');
   * // => true
   */
  function isString(value) {
    return toString.call(value) == stringClass;
  }

  /**
   * Checks if `value` is `undefined`.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   */
  function isUndefined(value) {
    return value === undefined;
  }

  /**
   * Produces an array of object`'s own enumerable property names.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names.
   * @example
   *
   * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
   * // => ['one', 'two', 'three'] (order is not guaranteed)
   */
  var keys = !nativeKeys ? shimKeys : function(object) {
    // avoid iterating over the `prototype` property
    return typeof object == 'function' && propertyIsEnumerable.call(object, 'prototype')
      ? shimKeys(object)
      : nativeKeys(object);
  };

  /**
   * Creates an object composed of the specified properties. Property names may
   * be specified as individual arguments or as arrays of property names.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to pluck.
   * @param {Object} [prop1, prop2, ...] The properties to pick.
   * @returns {Object} Returns an object composed of the picked properties.
   * @example
   *
   * _.pick({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'name', 'age');
   * // => { 'name': 'moe', 'age': 40 }
   */
  function pick(object) {
    var prop,
        index = 0,
        props = concat.apply(ArrayProto, arguments),
        length = props.length,
        result = {};

    // start `index` at `1` to skip `object`
    while (++index < length) {
      prop = props[index];
      if (prop in object) {
        result[prop] = object[prop];
      }
    }
    return result;
  }

  /**
   * Gets the size of `value` by returning `value.length` if `value` is a string
   * or array, or the number of own enumerable properties if `value` is an object.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Array|Object|String} value The value to inspect.
   * @returns {Number} Returns `value.length` if `value` is a string or array,
   *  or the number of own enumerable properties if `value` is an object.
   * @example
   *
   * _.size([1, 2]);
   * // => 2
   *
   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
   * // => 3
   *
   * _.size('curly');
   * // => 5
   */
  function size(value) {
    if (!value) {
      return 0;
    }
    var length = value.length;
    return length === length >>> 0 ? value.length : keys(value).length;
  }

  /**
   * Produces an array of `object`'s own enumerable property values.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * _.values({ 'one': 1, 'two': 2, 'three': 3 });
   * // => [1, 2, 3]
   */
  var values = createIterator({
    'args': 'object',
    'init': '[]',
    'inLoop': 'result.push(iteratee[index])'
  });

  /*--------------------------------------------------------------------------*/

  /**
   * Escapes a string for inclusion in HTML, replacing `&`, `<`, `"`, and `'`
   * characters.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} string The string to escape.
   * @returns {String} Returns the escaped string.
   * @example
   *
   * _.escape('Curly, Larry & Moe');
   * // => "Curly, Larry &amp; Moe"
   */
  function escape(string) {
    return string == null ? '' : (string + '').replace(reUnescapedHtml, escapeHtmlChar);
  }

  /**
   * This function returns the first argument passed to it.
   * Note: It is used throughout Lo-Dash as a default callback.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Mixed} value Any value.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * var moe = { 'name': 'moe' };
   * moe === _.identity(moe);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Adds functions properties of `object` to the `lodash` function and chainable
   * wrapper.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object of function properties to add to `lodash`.
   * @example
   *
   * _.mixin({
   *   'capitalize': function(string) {
   *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
   *   }
   * });
   *
   * _.capitalize('curly');
   * // => 'Curly'
   *
   * _('larry').capitalize();
   * // => 'Larry'
   */
  function mixin(object) {
    forEach(functions(object), function(methodName) {
      var func = lodash[methodName] = object[methodName];

      LoDash.prototype[methodName] = function() {
        var args = [this._wrapped];
        if (arguments.length) {
          push.apply(args, arguments);
        }
        var result = func.apply(lodash, args);
        if (this._chain) {
          result = new LoDash(result);
          result._chain = true;
        }
        return result;
      };
    });
  }

  /**
   * Reverts the '_' variable to its previous value and returns a reference to
   * the `lodash` function.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @returns {Function} Returns the `lodash` function.
   * @example
   *
   * var lodash = _.noConflict();
   */
  function noConflict() {
    window._ = oldDash;
    return this;
  }

  /**
   * Resolves the value of `property` on `object`. If `property` is a function
   * it will be invoked and its result returned, else the property value is
   * returned. If `object` is falsey, then `null` is returned.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object to inspect.
   * @param {String} property The property to get the result of.
   * @returns {Mixed} Returns the resolved value.
   * @example
   *
   * var object = {
   *   'cheese': 'crumpets',
   *   'stuff': function() {
   *     return 'nonsense';
   *   }
   * };
   *
   * _.result(object, 'cheese');
   * // => 'crumpets'
   *
   * _.result(object, 'stuff');
   * // => 'nonsense'
   */
  function result(object, property) {
    // based on Backbone's private `getValue` function
    // https://github.com/documentcloud/backbone/blob/0.9.2/backbone.js#L1419-1424
    if (!object) {
      return null;
    }
    var value = object[property];
    return toString.call(value) == funcClass ? object[property]() : value;
  }

  /**
   * A micro-templating method that handles arbitrary delimiters, preserves
   * whitespace, and correctly escapes quotes within interpolated code.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} text The template text.
   * @param {Obect} data The data object used to populate the text.
   * @param {Object} options The options object.
   * @returns {Function|String} Returns a compiled function when no `data` object
   *  is given, else it returns the interpolated text.
   * @example
   *
   * // using compiled template
   * var compiled = _.template('hello: <%= name %>');
   * compiled({ 'name': 'moe' });
   * // => 'hello: moe'
   *
   * var list = '<% _.forEach(people, function(name) { %> <li><%= name %></li> <% }); %>';
   * _.template(list, { 'people': ['moe', 'curly', 'larry'] });
   * // => '<li>moe</li><li>curly</li><li>larry</li>'
   *
   * var template = _.template('<b><%- value %></b>');
   * template({ 'value': '<script>' });
   * // => '<b>&lt;script></b>'
   *
   * // using `print`
   * var compiled = _.template('<% print("Hello " + epithet); %>');
   * compiled({ 'epithet': 'stooge' });
   * // => 'Hello stooge.'
   *
   * // using custom template settings
   * _.templateSettings = {
   *   'interpolate': /\{\{(.+?)\}\}/g
   * };
   *
   * var template = _.template('Hello {{ name }}!');
   * template({ 'name': 'Mustache' });
   * // => 'Hello Mustache!'
   *
   * // using the `variable` option
   * _.template('<%= data.hasWith %>', { 'hasWith': 'no' }, { 'variable': 'data' });
   * // => 'no'
   *
   * // using the `source` property
   * <script>
   *   JST.project = <%= _.template(jstText).source %>;
   * </script>
   */
  function template(text, data, options) {
    // based on John Resig's `tmpl` implementation
    // http://ejohn.org/blog/javascript-micro-templating/
    // and Laura Doktorova's doT.js
    // https://github.com/olado/doT
    options || (options = {});

    var isEvaluating,
        result,
        escapeDelimiter = options.escape,
        evaluateDelimiter = options.evaluate,
        interpolateDelimiter = options.interpolate,
        settings = lodash.templateSettings,
        variable = options.variable;

    // use default settings if no options object is provided
    if (escapeDelimiter == null) {
      escapeDelimiter = settings.escape;
    }
    if (evaluateDelimiter == null) {
      evaluateDelimiter = settings.evaluate;
    }
    if (interpolateDelimiter == null) {
      interpolateDelimiter = settings.interpolate;
    }

    // tokenize delimiters to avoid escaping them
    if (escapeDelimiter) {
      text = text.replace(escapeDelimiter, tokenizeEscape);
    }
    if (interpolateDelimiter) {
      text = text.replace(interpolateDelimiter, tokenizeInterpolate);
    }
    if (evaluateDelimiter != lastEvaluateDelimiter) {
      // generate `reEvaluateDelimiter` to match `_.templateSettings.evaluate`
      // and internal `<e%- %>`, `<e%= %>` delimiters
      lastEvaluateDelimiter = evaluateDelimiter;
      reEvaluateDelimiter = RegExp(
        (evaluateDelimiter ? evaluateDelimiter.source : '($^)') +
        '|<e%-([\\s\\S]+?)%>|<e%=([\\s\\S]+?)%>'
      , 'g');
    }
    isEvaluating = tokenized.length;
    text = text.replace(reEvaluateDelimiter, tokenizeEvaluate);
    isEvaluating = isEvaluating != tokenized.length;

    // escape characters that cannot be included in string literals and
    // detokenize delimiter code snippets
    text = "__p += '" + text
      .replace(reUnescapedString, escapeStringChar)
      .replace(reToken, detokenize) + "';\n";

    // clear stored code snippets
    tokenized.length = 0;

    // if `options.variable` is not specified and the template contains "evaluate"
    // delimiters, wrap a with-statement around the generated code to add the
    // data object to the top of the scope chain
    if (!variable) {
      variable = settings.variable || lastVariable || 'obj';

      if (isEvaluating) {
        text = 'with (' + variable + ') {\n' + text + '\n}\n';
      }
      else {
        if (variable != lastVariable) {
          // generate `reDoubleVariable` to match references like `obj.obj` inside
          // transformed "escape" and "interpolate" delimiters
          lastVariable = variable;
          reDoubleVariable = RegExp('(\\(\\s*)' + variable + '\\.' + variable + '\\b', 'g');
        }
        // avoid a with-statement by prepending data object references to property names
        text = text
          .replace(reInsertVariable, '$&' + variable + '.')
          .replace(reDoubleVariable, '$1__d');
      }
    }

    // cleanup code by stripping empty strings
    text = ( isEvaluating ? text.replace(reEmptyStringLeading, '') : text)
      .replace(reEmptyStringMiddle, '$1')
      .replace(reEmptyStringTrailing, '$1;');

    // frame code as the function body
    text = 'function(' + variable + ') {\n' +
      variable + ' || (' + variable + ' = {});\n' +
      'var __t, __p = \'\', __e = _.escape' +
      (isEvaluating
        ? ', __j = Array.prototype.join;\n' +
          'function print() { __p += __j.call(arguments, \'\') }\n'
        : ', __d = ' + variable + '.' + variable + ' || ' + variable + ';\n'
      ) +
      text +
      'return __p\n}';

    // add a sourceURL for easier debugging
    // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
    if (useSourceURL) {
      text += '\n//@ sourceURL=/lodash/template/source[' + (templateCounter++) + ']';
    }

    try {
      result = Function('_', 'return ' + text)(lodash);
    } catch(e) {
      result = function() { throw e; };
    }

    if (data) {
      return result(data);
    }
    // provide the compiled function's source via its `toString` method, in
    // supported environments, or the `source` property as a convenience for
    // build time precompilation
    result.source = text;
    return result;
  }

  /**
   * Executes the `callback` function `n` times. The `callback` is bound to
   * `thisArg` and invoked with 1 argument; (index).
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Number} n The number of times to execute the callback.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @example
   *
   * _.times(3, function() { genie.grantWish(); });
   * // => calls `genie.grantWish()` 3 times
   *
   * _.times(3, function() { this.grantWish(); }, genie);
   * // => also calls `genie.grantWish()` 3 times
   */
  function times(n, callback, thisArg) {
    var index = -1;
    if (thisArg) {
      while (++index < n) {
        callback.call(thisArg, index);
      }
    } else {
      while (++index < n) {
        callback(index);
      }
    }
  }

  /**
   * Generates a unique id. If `prefix` is passed, the id will be appended to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} [prefix] The value to prefix the id with.
   * @returns {Number|String} Returns a numeric id if no prefix is passed, else
   *  a string id may be returned.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   */
  function uniqueId(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps the value in a `lodash` wrapper object.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {Mixed} value The value to wrap.
   * @returns {Object} Returns the wrapper object.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * var youngest = _.chain(stooges)
   *     .sortBy(function(stooge) { return stooge.age; })
   *     .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })
   *     .first()
   *     .value();
   * // => 'moe is 40'
   */
  function chain(value) {
    value = new LoDash(value);
    value._chain = true;
    return value;
  }

  /**
   * Invokes `interceptor` with the `value` as the first argument, and then
   * returns `value`. The purpose of this method is to "tap into" a method chain,
   * in order to perform operations on intermediate results within the chain.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {Mixed} value The value to pass to `callback`.
   * @param {Function} interceptor The function to invoke.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * _.chain([1,2,3,200])
   *  .filter(function(num) { return num % 2 == 0; })
   *  .tap(alert)
   *  .map(function(num) { return num * num })
   *  .value();
   * // => // [2, 200] (alerted)
   * // => [4, 40000]
   */
  function tap(value, interceptor) {
    interceptor(value);
    return value;
  }

  /**
   * Enables method chaining on the wrapper object.
   *
   * @name chain
   * @deprecated
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapper object.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperChain() {
    this._chain = true;
    return this;
  }

  /**
   * Extracts the wrapped value.
   *
   * @name value
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapped value.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperValue() {
    return this._wrapped;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type String
   */
  lodash.VERSION = '0.4.1';

  // assign static methods
  lodash.after = after;
  lodash.bind = bind;
  lodash.bindAll = bindAll;
  lodash.chain = chain;
  lodash.clone = clone;
  lodash.compact = compact;
  lodash.compose = compose;
  lodash.contains = contains;
  lodash.debounce = debounce;
  lodash.defaults = defaults;
  lodash.defer = defer;
  lodash.delay = delay;
  lodash.difference = difference;
  lodash.escape = escape;
  lodash.every = every;
  lodash.extend = extend;
  lodash.filter = filter;
  lodash.find = find;
  lodash.first = first;
  lodash.flatten = flatten;
  lodash.forEach = forEach;
  lodash.forIn = forIn;
  lodash.forOwn = forOwn;
  lodash.functions = functions;
  lodash.groupBy = groupBy;
  lodash.has = has;
  lodash.identity = identity;
  lodash.indexOf = indexOf;
  lodash.initial = initial;
  lodash.intersection = intersection;
  lodash.invoke = invoke;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isBoolean = isBoolean;
  lodash.isDate = isDate;
  lodash.isElement = isElement;
  lodash.isEmpty = isEmpty;
  lodash.isEqual = isEqual;
  lodash.isFinite = isFinite;
  lodash.isFunction = isFunction;
  lodash.isNaN = isNaN;
  lodash.isNull = isNull;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isRegExp = isRegExp;
  lodash.isString = isString;
  lodash.isUndefined = isUndefined;
  lodash.keys = keys;
  lodash.last = last;
  lodash.lastIndexOf = lastIndexOf;
  lodash.map = map;
  lodash.max = max;
  lodash.memoize = memoize;
  lodash.min = min;
  lodash.mixin = mixin;
  lodash.noConflict = noConflict;
  lodash.once = once;
  lodash.partial = partial;
  lodash.pick = pick;
  lodash.pluck = pluck;
  lodash.range = range;
  lodash.reduce = reduce;
  lodash.reduceRight = reduceRight;
  lodash.reject = reject;
  lodash.rest = rest;
  lodash.result = result;
  lodash.shuffle = shuffle;
  lodash.size = size;
  lodash.some = some;
  lodash.sortBy = sortBy;
  lodash.sortedIndex = sortedIndex;
  lodash.tap = tap;
  lodash.template = template;
  lodash.throttle = throttle;
  lodash.times = times;
  lodash.toArray = toArray;
  lodash.union = union;
  lodash.uniq = uniq;
  lodash.uniqueId = uniqueId;
  lodash.values = values;
  lodash.without = without;
  lodash.wrap = wrap;
  lodash.zip = zip;
  lodash.zipObject = zipObject;

  // assign aliases
  lodash.all = every;
  lodash.any = some;
  lodash.collect = map;
  lodash.detect = find;
  lodash.each = forEach;
  lodash.foldl = reduce;
  lodash.foldr = reduceRight;
  lodash.head = first;
  lodash.include = contains;
  lodash.inject = reduce;
  lodash.methods = functions;
  lodash.select = filter;
  lodash.tail = rest;
  lodash.take = first;
  lodash.unique = uniq;

  // add pseudo private properties used and removed during the build process
  lodash._iteratorTemplate = iteratorTemplate;
  lodash._shimKeys = shimKeys;

  /*--------------------------------------------------------------------------*/

  // assign private `LoDash` constructor's prototype
  LoDash.prototype = lodash.prototype;

  // add all static functions to `LoDash.prototype`
  mixin(lodash);

  // add `LoDash.prototype.chain` after calling `mixin()` to avoid overwriting
  // it with the wrapped `lodash.chain`
  LoDash.prototype.chain = wrapperChain;
  LoDash.prototype.value = wrapperValue;

  // add all mutator Array functions to the wrapper.
  forEach(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
    var func = ArrayProto[methodName];

    LoDash.prototype[methodName] = function() {
      var value = this._wrapped;
      func.apply(value, arguments);

      // IE compatibility mode and IE < 9 have buggy Array `shift()` and `splice()`
      // functions that fail to remove the last element, `value[0]`, of
      // array-like objects even though the `length` property is set to `0`.
      // The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
      // is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
      if (value.length === 0) {
        delete value[0];
      }
      if (this._chain) {
        value = new LoDash(value);
        value._chain = true;
      }
      return value;
    };
  });

  // add all accessor Array functions to the wrapper.
  forEach(['concat', 'join', 'slice'], function(methodName) {
    var func = ArrayProto[methodName];

    LoDash.prototype[methodName] = function() {
      var value = this._wrapped,
          result = func.apply(value, arguments);

      if (this._chain) {
        result = new LoDash(result);
        result._chain = true;
      }
      return result;
    };
  });

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash was injected by a third-party script and not intended to be
    // loaded as a module. The global assignment can be reverted in the Lo-Dash
    // module via its `noConflict()` method.
    window._ = lodash;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define('lodash',[],function() {
      return lodash;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports) {
    // in Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = lodash)._ = lodash;
    }
    // in Narwhal or RingoJS v0.7.0-
    else {
      freeExports._ = lodash;
    }
  }
  else {
    // in a browser or Rhino
    window._ = lodash;
  }
}(this));

define('thrust/util/array',['lodash'], function (_)
{
    
    /**
    @module thrust-util-array
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#first](http://underscorejs.org/#first)

    @for thrust-util-array
    @method first
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#first](http://underscorejs.org/#first)

    @method head
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#initial](http://underscorejs.org/#initial)

    @method initial
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#last](http://underscorejs.org/#last)

    @method last
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#rest](http://underscorejs.org/#rest)

    @method tail
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#rest](http://underscorejs.org/#rest)

    @method rest
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#compact](http://underscorejs.org/#compact)

    @method compact
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#flatten](http://underscorejs.org/#flatten)

    @method flatten
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#without](http://underscorejs.org/#without)

    @method without
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#union](http://underscorejs.org/#union)

    @method union
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#intersection](http://underscorejs.org/#intersection)

    @method intersection
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#difference](http://underscorejs.org/#difference)

    @method difference
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#uniq](http://underscorejs.org/#uniq)

    @method uniq
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#uniq](http://underscorejs.org/#uniq)

    @method unique
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#zip](http://underscorejs.org/#zip)

    @method zip
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#indexOf](http://underscorejs.org/#indexOf)

    @method indexOf
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#lastIndexOf](http://underscorejs.org/#lastIndexOf)

    @method lastIndexOf
    **/

    /**
        This method is an underscore/lodash helper.
        For documentation please see [http://underscorejs.org/#range](http://underscorejs.org/#range)

    @method range
    **/

    var exports = _.pick(_, 'first', 'head', 'initial', 'last', 'tail', 'rest', 'compact', 'flatten', 'without', 'union', 'intersection', 'difference', 'uniq', 'unique', 'zip', 'indexOf', 'lastIndexOf', 'range');
    return exports;
});
/// <reference path="collection.js" />
define('thrust/util/collection',['lodash'], function (_)
{
    
    /**
    @module thrust-util-collection
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#each](http://underscorejs.org/#each)

    @for thrust-util-collection
    @method each
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#each](http://underscorejs.org/#each)

    @method forEach
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#map](http://underscorejs.org/#map)

    @method map
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#map](http://underscorejs.org/#map)

    @method collect
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduce](http://underscorejs.org/#reduce)

    @method reduce
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduce](http://underscorejs.org/#reduce)

    @method inject
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduce](http://underscorejs.org/#reduce)

    @method foldl
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduceRight](http://underscorejs.org/#reduceRight)

    @method foldr
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reduceRight](http://underscorejs.org/#reduceRight)

    @method reduceRight
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#find](http://underscorejs.org/#find)

    @method find
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#find](http://underscorejs.org/#find)

    @method detect
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#filter](http://underscorejs.org/#filter)

    @method filter
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#filter](http://underscorejs.org/#filter)

    @method select
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#reject](http://underscorejs.org/#reject)

    @method reject
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#all](http://underscorejs.org/#all)

    @method all
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#all](http://underscorejs.org/#all)

    @method every
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#any](http://underscorejs.org/#any)

    @method any
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#any](http://underscorejs.org/#any)

    @method some
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#include](http://underscorejs.org/#include)

    @method include
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#include](http://underscorejs.org/#include)

    @method contains
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#invoke](http://underscorejs.org/#invoke)

    @method invoke
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#pluck](http://underscorejs.org/#pluck)

    @method pluck
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#max](http://underscorejs.org/#max)

    @method max
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#min](http://underscorejs.org/#min)

    @method min
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#sortBy](http://underscorejs.org/#sortBy)

    @method sortBy
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#groupBy](http://underscorejs.org/#groupBy)

    @method groupBy
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#sortedIndex](http://underscorejs.org/#sortedIndex)

    @method sortedIndex
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#shuffle](http://underscorejs.org/#shuffle)

    @method shuffle
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#toArray](http://underscorejs.org/#toArray)

    @method toArray
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#size](http://underscorejs.org/#size)

    @method size
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#extend](http://underscorejs.org/#extend)

    @method extend
    **/

    var exports = _.pick(_, 'each', 'forEach', 'map', 'collect', 'reduce', 'inject', 'foldl', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select', 'reject', 'all', 'every', 'any', 'some', 'include',
        'contains', 'invoke', 'pluck', 'max', 'min', 'sortBy', 'groupBy', 'sortedIndex', 'shuffle', 'toArray', 'size', 'extend');
    return exports;
});
define('thrust/util/function',['lodash'], function (_)
{
    
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
define('thrust/util/object',['lodash'], function (_)
{
    
    /**
    @module thrust-util-obj
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#keys](http://underscorejs.org/#keys)

    @for thrust-util-obj
    @method keys
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#values](http://underscorejs.org/#values)

    @method values
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#functions](http://underscorejs.org/#functions)

    @method functions
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#functions](http://underscorejs.org/#functions)

    @method methods
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#pick](http://underscorejs.org/#pick)

    @method pick
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#defaults](http://underscorejs.org/#defaults)

    @method defaults
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#clone](http://underscorejs.org/#clone)

    @method clone
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#tap](http://underscorejs.org/#tap)

    @method tap
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#has](http://underscorejs.org/#has)

    @method has
    **/

    var exports = _.pick(_, 'keys', 'methods', 'functions', 'methods', 'pick', 'defaults', 'clone', 'tap', 'has');

    /**
    Inverts an object.  The keys become values, and the values become keys.
    Does not do any copying.

    @method invert
    @param {Object} obj The object to invert.
    @returns {Object} The inverted object.
    **/
    exports.invert = function (obj)
    {
        var result = {};
        for (var i in obj)
            if (hasOwn.call(obj, i))
                result[obj[i]] = i;
        return result;
    };
    
    return exports;
});
/*!
 * jQuery JavaScript lib v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
define('thrust/util/lib/type',['thrust/util/collection'],
function (uCollection)
{
    
    var toString = Object.prototype.toString,
        class2type = {};
    
    var type = function (obj)
    {
        return obj == null ?
            String(obj) :
            class2type[toString.call(obj)] || "object";
    };

    uCollection.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (name, i)
    {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    return { type: type };
});
define('thrust/util/type',['lodash', './lib/type'],
function (_, type)
{
    
    /**
    @module thrust-util-type
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isEqual](http://underscorejs.org/#isEqual)

    @for thrust-util-type
    @method isEqual
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isEmpty](http://underscorejs.org/#isEmpty)

    @method isEmpty
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isElement](http://underscorejs.org/#isElement)

    @method isElement
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isArray](http://underscorejs.org/#isArray)

    @method isArray
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isObject](http://underscorejs.org/#isObject)

    @method isObject
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isArguments](http://underscorejs.org/#isArguments)

    @method isArguments
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isFunction](http://underscorejs.org/#isFunction)

    @method isFunction
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isString](http://underscorejs.org/#isString)

    @method isString
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isNumber](http://underscorejs.org/#isNumber)

    @method isNumber
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isFinite](http://underscorejs.org/#isFinite)

    @method isFinite
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isBoolean](http://underscorejs.org/#isBoolean)

    @method isBoolean
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isDate](http://underscorejs.org/#isDate)

    @method isDate
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isRegExp](http://underscorejs.org/#isRegExp)

    @method isRegExp
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isNaN](http://underscorejs.org/#isNaN)

    @method isNaN
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isNull](http://underscorejs.org/#isNull)

    @method isNull
    **/

    /**
    This method is an underscore/lodash helper.
    For documentation please see [http://underscorejs.org/#isUndefined](http://underscorejs.org/#isUndefined)

    @method isUndefined
    **/

    var exports = _.pick(_, 'isEqual', 'isEmpty', 'isElement', 'isArray', 'isObject', 'isArguments', 'isFunction', 'isString', 'isNumber', 'isFinite', 'isBoolean', 'isDate', 'isRegExp', 'isNaN', 'isNull', 'isUndefined');

    _.extend(exports, {
        /**
        Returns the type of the given Object

        NOTE: currently this type has been loaded from jQuery source code.

        @method type
        **/
        type: type.type,
        /**
        Checks is the object is array like, like the aruguments object, but not a string, oe array.
        jQuery objects for example would report as array like.
        As well as knockout observable arrays report as array like.

        @method isArrayLike
        @param {Object} o The object to check
        @returns {Boolean} Is it true or false.
        **/
        isArrayLike: function (o)
        {
            return (o && !exports.isString(o) && o.length !== undefined) || false;
        },
        /**
        Checks if the given object is array or array like.

        @method isArrayOrArrayLike
        @param {Object} o The object to check
        @returns {Boolean} Is it true or false.
        **/
        isArrayOrArrayLike: function (o)
        {
            return exports.isArray(o) || (exports.isArrayLike(o));
        }
    });

    return exports;
});

define('thrust/util/constants',[],function()
{
    
    return {
    };
});

define('thrust/util/guid',['./type'],
function (type)
{
    
    /**
    @module thrust-util
    **/

    var S4 = function ()
    {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/,
    emtptyGuid = '00000000-0000-0000-0000-000000000000';

    var exports = {
        /**
        Returns a new sudo guid, limiations in JavaScript make must more reliable guids fairly difficult to create.

        @for thrust-util
        @method newGuid
        @returns {Guid} The new guid.
        **/
        newGuid: function () { return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()); },
        /**
        Returns an empty guid.

        @method emptyGuid
        @returns {Guid} The emtpty guid.
        **/
        emptyGuid: function () { return emtptyGuid; },
        /**
        Checks if the given string is a guid.

        @method isGuid
        @param {Guid} guid
        @returns {Boolean} If the guid is a guid or not.
        **/
        isGuid: function (guid)
        {
            return type.isString(guid) ? guidRegex.test(guid) : false;
        },
        /**
        Checks if the Guid is an Empty Guid

        @method isGuidEmpty
        @param {Guid} guid
        @returns {Boolean} If the guid is a guid or not.
        **/
        isGuidEmpty: function (guid) { return guid === emtptyGuid; }
    };
    return exports;
});
define('thrust/util/property',['./type'],
function (uType)
{
    
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
/*!
 * jQuery JavaScript lib v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
define('thrust/util/lib/param',['thrust/util/collection', 'thrust/util/type', 'module'],
function (uCollection, uType, module)
{
    
    var r20 = /%20/g,
        rbracket = /\[\]$/;
    var param = function (a, traditional)
    {
        var prefix,
            s = [],
            add = function (key, value)
            {
                // If value is a function, invoke it and return its value
                value = uType.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined)
        {
            traditional = !!module.config().traditionalEncoding;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (uType.isArrayOrArrayLike(a))
        {
            // Serialize the form elements
            uCollection.each(a, function (x)
            {
                add(x.name, x.value);
            });
        }
        else
        {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a)
            {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    function buildParams(prefix, obj, traditional, add)
    {
        if (jQuery.isArray(obj))
        {
            // Serialize array item.
            jQuery.each(obj, function (i, v)
            {
                if (traditional || rbracket.test(prefix))
                {
                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else
                {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    // Note that rack (as of 1.0.0) can't currently deserialize
                    // nested arrays properly, and attempting to do so may cause
                    // a server error. Possible fixes are to modify rack's
                    // deserialization algorithm or to provide an option or flag
                    // to force array serialization to be shallow.
                    buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });

        }
        else if (!traditional && obj != null && typeof obj === "object")
        {
            // Serialize object item.
            for (var name in obj)
            {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else
        {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }
    return { param: param };
});
define('thrust/util/url',['./lib/param', 'module'],
function (param, module)
{
    /**
    @module thrust-util-url
    **/
    
    var urlPath = (module.config && module.config().path || ''),
        path = urlPath.lastIndexOf('/') === urlPath.length - 1 ? urlPath.substring(0, -1) : urlPath,
        doubleSlashRegex = /\/\//g;

    var exports = {
        /**
        jQuery param method to encode form parameters.

        @for thrust-util-url
        @method param
        **/
        param: param,
        /**
        Cleans up double slashs in a url, used by thrust/data

        @method cleanUrl
        @param {String} url The url to clean
        @retrusn {String} The cleaned url
        **/
        cleanUrl: function (url) { return url.replace(doubleSlashRegex, '/'); },
        /**
        Checks for existance of application path in the url, or http if the url is supposed to go to another location.

        @method fixupUrl
        @param {String} url The url to fixup
        @retrusn {String} The fixed url
        **/
        fixupUrl: function (url)
        {
            if (url.indexOf('http') === -1)
            {
                if (url.indexOf(urlPath) === -1)
                {
                    url = urlPath + url;
                }
                url = exports.cleanUrl(path + url);
            }
            return url;
        }
    };
    return exports;
});
define('thrust/util/string',[],function ()
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
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * when
 * A lightweight CommonJS Promises/A and when() implementation
 *
 * when is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 1.3.0
 */

(function(define) {
define('when/when',[],function() {
    var freeze, reduceArray, slice, undef;

    //
    // Public API
    //

    when.defer     = defer;
    when.reject    = reject;
    when.isPromise = isPromise;

    when.all       = all;
    when.some      = some;
    when.any       = any;

    when.map       = map;
    when.reduce    = reduce;

    when.chain     = chain;

    /** Object.freeze */
    freeze = Object.freeze || function(o) { return o; };

    /**
     * Trusted Promise constructor.  A Promise created from this constructor is
     * a trusted when.js promise.  Any other duck-typed promise is considered
     * untrusted.
     *
     * @constructor
     */
    function Promise() {}

    Promise.prototype = freeze({
        always: function(alwaysback, progback) {
            return this.then(alwaysback, alwaysback, progback);
        },

        otherwise: function(errback) {
            return this.then(undef, errback);
        }
    });

    /**
     * Create an already-resolved promise for the supplied value
     * @private
     *
     * @param value anything
     * @return {Promise}
     */
    function resolved(value) {

        var p = new Promise();

        p.then = function(callback) {
            try {
                return promise(callback ? callback(value) : value);
            } catch(e) {
                return rejected(e);
            }
        };

        return freeze(p);
    }

    /**
     * Create an already-rejected {@link Promise} with the supplied
     * rejection reason.
     * @private
     *
     * @param reason rejection reason
     * @return {Promise}
     */
    function rejected(reason) {

        var p = new Promise();

        p.then = function(callback, errback) {
            try {
                return errback ? promise(errback(reason)) : rejected(reason);
            } catch(e) {
                return rejected(e);
            }
        };

        return freeze(p);
    }

    /**
     * Returns a rejected promise for the supplied promiseOrValue. If
     * promiseOrValue is a value, it will be the rejection value of the
     * returned promise.  If promiseOrValue is a promise, its
     * completion value will be the rejected value of the returned promise
     *
     * @param promiseOrValue {*} the rejected value of the returned {@link Promise}
     *
     * @return {Promise} rejected {@link Promise}
     */
    function reject(promiseOrValue) {
        return when(promiseOrValue, function(value) {
            return rejected(value);
        });
    }

    /**
     * Creates a new, CommonJS compliant, Deferred with fully isolated
     * resolver and promise parts, either or both of which may be given out
     * safely to consumers.
     * The Deferred itself has the full API: resolve, reject, progress, and
     * then. The resolver has resolve, reject, and progress.  The promise
     * only has then.
     *
     * @memberOf when
     * @function
     *
     * @returns {Deferred}
     */
    function defer() {
        var deferred, promise, listeners, progressHandlers, _then, _progress, complete;

        listeners = [];
        progressHandlers = [];

        /**
         * Pre-resolution then() that adds the supplied callback, errback, and progback
         * functions to the registered listeners
         *
         * @private
         *
         * @param [callback] {Function} resolution handler
         * @param [errback] {Function} rejection handler
         * @param [progback] {Function} progress handler
         *
         * @throws {Error} if any argument is not null, undefined, or a Function
         */
        _then = function unresolvedThen(callback, errback, progback) {
            var deferred = defer();

            listeners.push(function(promise) {
                promise.then(callback, errback)
                    .then(deferred.resolve, deferred.reject, deferred.progress);
            });

            progback && progressHandlers.push(progback);

            return deferred.promise;
        };

        /**
         * Registers a handler for this {@link Deferred}'s {@link Promise}.  Even though all arguments
         * are optional, each argument that *is* supplied must be null, undefined, or a Function.
         * Any other value will cause an Error to be thrown.
         *
         * @memberOf Promise
         *
         * @param [callback] {Function} resolution handler
         * @param [errback] {Function} rejection handler
         * @param [progback] {Function} progress handler
         *
         * @throws {Error} if any argument is not null, undefined, or a Function
         */
        function then(callback, errback, progback) {
            return _then(callback, errback, progback);
        }

        /**
         * Resolves this {@link Deferred}'s {@link Promise} with val as the
         * resolution value.
         *
         * @memberOf Resolver
         *
         * @param val anything
         */
        function resolve(val) {
            complete(resolved(val));
        }

        /**
         * Rejects this {@link Deferred}'s {@link Promise} with err as the
         * reason.
         *
         * @memberOf Resolver
         *
         * @param err anything
         */
        function reject(err) {
            complete(rejected(err));
        }

        /**
         * @private
         * @param update
         */
        _progress = function(update) {
            var progress, i = 0;
            while (progress = progressHandlers[i++]) progress(update);
        };

        /**
         * Emits a progress update to all progress observers registered with
         * this {@link Deferred}'s {@link Promise}
         *
         * @memberOf Resolver
         *
         * @param update anything
         */
        function progress(update) {
            _progress(update);
        }

        /**
         * Transition from pre-resolution state to post-resolution state, notifying
         * all listeners of the resolution or rejection
         *
         * @private
         *
         * @param completed {Promise} the completed value of this deferred
         */
        complete = function(completed) {
            var listener, i = 0;

            // Replace _then with one that directly notifies with the result.
            _then = completed.then;

            // Replace complete so that this Deferred can only be completed
            // once. Also Replace _progress, so that subsequent attempts to issue
            // progress throw.
            complete = _progress = function alreadyCompleted() {
                // TODO: Consider silently returning here so that parties who
                // have a reference to the resolver cannot tell that the promise
                // has been resolved using try/catch
                throw new Error("already completed");
            };

            // Free progressHandlers array since we'll never issue progress events
            // for this promise again now that it's completed
            progressHandlers = undef;

            // Notify listeners
            // Traverse all listeners registered directly with this Deferred

            while (listener = listeners[i++]) {
                listener(completed);
            }

            listeners = [];
        };

        /**
         * The full Deferred object, with both {@link Promise} and {@link Resolver}
         * parts
         * @class Deferred
         * @name Deferred
         */
        deferred = {};

        // Promise and Resolver parts
        // Freeze Promise and Resolver APIs

        promise = new Promise();
        promise.then = deferred.then = then;

        /**
         * The {@link Promise} for this {@link Deferred}
         * @memberOf Deferred
         * @name promise
         * @type {Promise}
         */
        deferred.promise = freeze(promise);

        /**
         * The {@link Resolver} for this {@link Deferred}
         * @memberOf Deferred
         * @name resolver
         * @class Resolver
         */
        deferred.resolver = freeze({
            resolve:  (deferred.resolve  = resolve),
            reject:   (deferred.reject   = reject),
            progress: (deferred.progress = progress)
        });

        return deferred;
    }

    /**
     * Determines if promiseOrValue is a promise or not.  Uses the feature
     * test from http://wiki.commonjs.org/wiki/Promises/A to determine if
     * promiseOrValue is a promise.
     *
     * @param promiseOrValue anything
     *
     * @returns {Boolean} true if promiseOrValue is a {@link Promise}
     */
    function isPromise(promiseOrValue) {
        return promiseOrValue && typeof promiseOrValue.then === 'function';
    }

    /**
     * Register an observer for a promise or immediate value.
     *
     * @function
     * @name when
     * @namespace
     *
     * @param promiseOrValue anything
     * @param {Function} [callback] callback to be called when promiseOrValue is
     *   successfully resolved.  If promiseOrValue is an immediate value, callback
     *   will be invoked immediately.
     * @param {Function} [errback] callback to be called when promiseOrValue is
     *   rejected.
     * @param {Function} [progressHandler] callback to be called when progress updates
     *   are issued for promiseOrValue.
     *
     * @returns {Promise} a new {@link Promise} that will complete with the return
     *   value of callback or errback or the completion value of promiseOrValue if
     *   callback and/or errback is not supplied.
     */
    function when(promiseOrValue, callback, errback, progressHandler) {
        // Get a promise for the input promiseOrValue
        // See promise()
        var trustedPromise = promise(promiseOrValue);

        // Register promise handlers
        return trustedPromise.then(callback, errback, progressHandler);
    }

    /**
     * Returns promiseOrValue if promiseOrValue is a {@link Promise}, a new Promise if
     * promiseOrValue is a foreign promise, or a new, already-resolved {@link Promise}
     * whose resolution value is promiseOrValue if promiseOrValue is an immediate value.
     *
     * Note that this function is not safe to export since it will return its
     * input when promiseOrValue is a {@link Promise}
     *
     * @private
     *
     * @param promiseOrValue anything
     *
     * @returns Guaranteed to return a trusted Promise.  If promiseOrValue is a when.js {@link Promise}
     *   returns promiseOrValue, otherwise, returns a new, already-resolved, when.js {@link Promise}
     *   whose resolution value is:
     *   * the resolution value of promiseOrValue if it's a foreign promise, or
     *   * promiseOrValue if it's a value
     */
    function promise(promiseOrValue) {
        var promise, deferred;

        if(promiseOrValue instanceof Promise) {
            // It's a when.js promise, so we trust it
            promise = promiseOrValue;

        } else {
            // It's not a when.js promise.  Check to see if it's a foreign promise
            // or a value.

            deferred = defer();
            if(isPromise(promiseOrValue)) {
                // It's a compliant promise, but we don't know where it came from,
                // so we don't trust its implementation entirely.  Introduce a trusted
                // middleman when.js promise

                // IMPORTANT: This is the only place when.js should ever call .then() on
                // an untrusted promise.
                promiseOrValue.then(deferred.resolve, deferred.reject, deferred.progress);
                promise = deferred.promise;

            } else {
                // It's a value, not a promise.  Create an already-resolved promise
                // for it.
                deferred.resolve(promiseOrValue);
                promise = deferred.promise;
            }
        }

        return promise;
    }

    /**
     * Return a promise that will resolve when howMany of the supplied promisesOrValues
     * have resolved. The resolution value of the returned promise will be an array of
     * length howMany containing the resolutions values of the triggering promisesOrValues.
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param howMany
     * @param [callback]
     * @param [errback]
     * @param [progressHandler]
     *
     * @returns {Promise}
     */
    function some(promisesOrValues, howMany, callback, errback, progressHandler) {

        checkCallbacks(2, arguments);

        return when(promisesOrValues, function(promisesOrValues) {

            var toResolve, results, ret, deferred, resolver, rejecter, handleProgress, len, i;

            len = promisesOrValues.length >>> 0;

            toResolve = Math.max(0, Math.min(howMany, len));
            results = [];
            deferred = defer();
            ret = when(deferred, callback, errback, progressHandler);

            // Wrapper so that resolver can be replaced
            function resolve(val) {
                resolver(val);
            }

            // Wrapper so that rejecter can be replaced
            function reject(err) {
                rejecter(err);
            }

            // Wrapper so that progress can be replaced
            function progress(update) {
                handleProgress(update);
            }

            function complete() {
                resolver = rejecter = handleProgress = noop;
            }

            // No items in the input, resolve immediately
            if (!toResolve) {
                deferred.resolve(results);

            } else {
                // Resolver for promises.  Captures the value and resolves
                // the returned promise when toResolve reaches zero.
                // Overwrites resolver var with a noop once promise has
                // be resolved to cover case where n < promises.length
                resolver = function(val) {
                    // This orders the values based on promise resolution order
                    // Another strategy would be to use the original position of
                    // the corresponding promise.
                    results.push(val);

                    if (!--toResolve) {
                        complete();
                        deferred.resolve(results);
                    }
                };

                // Rejecter for promises.  Rejects returned promise
                // immediately, and overwrites rejecter var with a noop
                // once promise to cover case where n < promises.length.
                // TODO: Consider rejecting only when N (or promises.length - N?)
                // promises have been rejected instead of only one?
                rejecter = function(err) {
                    complete();
                    deferred.reject(err);
                };

                handleProgress = deferred.progress;

                // TODO: Replace while with forEach
                for(i = 0; i < len; ++i) {
                    if(i in promisesOrValues) {
                        when(promisesOrValues[i], resolve, reject, progress);
                    }
                }
            }

            return ret;
        });
    }

    /**
     * Return a promise that will resolve only once all the supplied promisesOrValues
     * have resolved. The resolution value of the returned promise will be an array
     * containing the resolution values of each of the promisesOrValues.
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array|Promise} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param [callback] {Function}
     * @param [errback] {Function}
     * @param [progressHandler] {Function}
     *
     * @returns {Promise}
     */
    function all(promisesOrValues, callback, errback, progressHandler) {

        checkCallbacks(1, arguments);

        return when(promisesOrValues, function(promisesOrValues) {
            return _reduce(promisesOrValues, reduceIntoArray, []);
        }).then(callback, errback, progressHandler);
    }

    function reduceIntoArray(current, val, i) {
        current[i] = val;
        return current;
    }

    /**
     * Return a promise that will resolve when any one of the supplied promisesOrValues
     * has resolved. The resolution value of the returned promise will be the resolution
     * value of the triggering promiseOrValue.
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array|Promise} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param [callback] {Function}
     * @param [errback] {Function}
     * @param [progressHandler] {Function}
     *
     * @returns {Promise}
     */
    function any(promisesOrValues, callback, errback, progressHandler) {

        function unwrapSingleResult(val) {
            return callback ? callback(val[0]) : val[0];
        }

        return some(promisesOrValues, 1, unwrapSingleResult, errback, progressHandler);
    }

    /**
     * Traditional map function, similar to `Array.prototype.map()`, but allows
     * input to contain {@link Promise}s and/or values, and mapFunc may return
     * either a value or a {@link Promise}
     *
     * @memberOf when
     *
     * @param promise {Array|Promise} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param mapFunc {Function} mapping function mapFunc(value) which may return
     *      either a {@link Promise} or value
     *
     * @returns {Promise} a {@link Promise} that will resolve to an array containing
     *      the mapped output values.
     */
    function map(promise, mapFunc) {
        return when(promise, function(array) {
            return _map(array, mapFunc);
        });
    }

    /**
     * Private map helper to map an array of promises
     * @private
     *
     * @param promisesOrValues {Array}
     * @param mapFunc {Function}
     * @return {Promise}
     */
    function _map(promisesOrValues, mapFunc) {

        var results, len, i;

        // Since we know the resulting length, we can preallocate the results
        // array to avoid array expansions.
        len = promisesOrValues.length >>> 0;
        results = new Array(len);

        // Since mapFunc may be async, get all invocations of it into flight
        // asap, and then use reduce() to collect all the results
        for(i = 0; i < len; i++) {
            if(i in promisesOrValues)
                results[i] = when(promisesOrValues[i], mapFunc);
        }

        // Could use all() here, but that would result in another array
        // being allocated, i.e. map() would end up allocating 2 arrays
        // of size len instead of just 1.  Since all() uses reduce()
        // anyway, avoid the additional allocation by calling reduce
        // directly.
        return _reduce(results, reduceIntoArray, results);
    }

    /**
     * Traditional reduce function, similar to `Array.prototype.reduce()`, but
     * input may contain {@link Promise}s and/or values, and reduceFunc
     * may return either a value or a {@link Promise}, *and* initialValue may
     * be a {@link Promise} for the starting value.
     *
     * @memberOf when
     *
     * @param promise {Array|Promise} array of anything, may contain a mix
     *      of {@link Promise}s and values.  May also be a {@link Promise} for
     *      an array.
     * @param reduceFunc {Function} reduce function reduce(currentValue, nextValue, index, total),
     *      where total is the total number of items being reduced, and will be the same
     *      in each call to reduceFunc.
     * @param initialValue starting value, or a {@link Promise} for the starting value
     *
     * @returns {Promise} that will resolve to the final reduced value
     */
    function reduce(promise, reduceFunc, initialValue) {
        var args = slice.call(arguments, 1);
        return when(promise, function(array) {
            return _reduce.apply(undef, [array].concat(args));
        });
    }

    /**
     * Private reduce to reduce an array of promises
     * @private
     *
     * @param promisesOrValues {Array}
     * @param reduceFunc {Function}
     * @param initialValue {*}
     * @return {Promise}
     */
    function _reduce(promisesOrValues, reduceFunc, initialValue) {

        var total, args;

        total = promisesOrValues.length;

        // Skip promisesOrValues, since it will be used as 'this' in the call
        // to the actual reduce engine below.

        // Wrap the supplied reduceFunc with one that handles promises and then
        // delegates to the supplied.

        args = [
            function (current, val, i) {
                return when(current, function (c) {
                    return when(val, function (value) {
                        return reduceFunc(c, value, i, total);
                    });
                });
            }
        ];

        if (arguments.length > 2) args.push(initialValue);

        return reduceArray.apply(promisesOrValues, args);
    }

    /**
     * Ensure that resolution of promiseOrValue will complete resolver with the completion
     * value of promiseOrValue, or instead with resolveValue if it is provided.
     *
     * @memberOf when
     *
     * @param promiseOrValue
     * @param resolver {Resolver}
     * @param [resolveValue] anything
     *
     * @returns {Promise}
     */
    function chain(promiseOrValue, resolver, resolveValue) {
        var useResolveValue = arguments.length > 2;

        return when(promiseOrValue,
            function(val) {
                if(useResolveValue) val = resolveValue;
                resolver.resolve(val);
                return val;
            },
            function(e) {
                resolver.reject(e);
                return rejected(e);
            },
            resolver.progress
        );
    }

    //
    // Utility functions
    //

    /**
     * Helper that checks arrayOfCallbacks to ensure that each element is either
     * a function, or null or undefined.
     *
     * @private
     *
     * @param arrayOfCallbacks {Array} array to check
     * @throws {Error} if any element of arrayOfCallbacks is something other than
     * a Functions, null, or undefined.
     */
    function checkCallbacks(start, arrayOfCallbacks) {
        var arg, i = arrayOfCallbacks.length;
        while(i > start) {
            arg = arrayOfCallbacks[--i];
            if (arg != null && typeof arg != 'function') throw new Error('callback is not a function');
        }
    }

    /**
     * No-Op function used in method replacement
     * @private
     */
    function noop() {}

    slice = [].slice;

    // ES5 reduce implementation if native not available
    // See: http://es5.github.com/#x15.4.4.21 as there are many
    // specifics and edge cases.
    reduceArray = [].reduce ||
        function(reduceFunc /*, initialValue */) {
            // ES5 dictates that reduce.length === 1

            // This implementation deviates from ES5 spec in the following ways:
            // 1. It does not check if reduceFunc is a Callable

            var arr, args, reduced, len, i;

            i = 0;
            arr = Object(this);
            len = arr.length >>> 0;
            args = arguments;

            // If no initialValue, use first item of array (we know length !== 0 here)
            // and adjust i to start at second item
            if(args.length <= 1) {
                // Skip to the first real element in the array
                for(;;) {
                    if(i in arr) {
                        reduced = arr[i++];
                        break;
                    }

                    // If we reached the end of the array without finding any real
                    // elements, it's a TypeError
                    if(++i >= len) {
                        throw new TypeError();
                    }
                }
            } else {
                // If initialValue provided, use it
                reduced = args[1];
            }

            // Do the actual reduce
            for(;i < len; ++i) {
                // Skip holes
                if(i in arr)
                    reduced = reduceFunc(reduced, arr[i], i, arr);
            }

            return reduced;
        };

    return when;
});
})(typeof define == 'function'
    ? define
    : function (factory) { typeof module != 'undefined'
        ? (module.exports = factory())
        : (this.when      = factory());
    }
    // Boilerplate for AMD, Node, and browser global
);

define('when', ['when/when'], function (main) { return main; });

/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * This is a drop-in replacement for the when module that sets up automatic
 * debug output for promises created or consumed by when.js.  Use this
 * instead of when to help with debugging.
 *
 * WARNING: This module **should never** be use this in a production environment.
 * It exposes details of the promise
 *
 * In an AMD environment, you can simply change your path or package mappings:
 *
 * paths: {
 *   // 'when': 'path/to/when/when'
 *   'when': 'path/to/when/debug'
 * }
 *
 * or
 *
 * packages: [
 *   // { name: 'when', location: 'path/to/when', main: 'when' }
 *   { name: 'when', location: 'path/to/when', main: 'debug' }
 * ]
 *
 * In a CommonJS environment, you can directly require this module where
 * you would normally require 'when':
 *
 * // var when = require('when');
 * var when = require('when/debug');
 *
 * Or you can temporarily modify the package.js to point main at debug.
 * For example, when/package.json:
 *
 * ...
 * "main": "./debug"
 * ...
 *
 * @author brian@hovercraftstudios.com
 */
(function(define) {
define('when/debug',['./when'], function(when) {

    var promiseId, freeze, pending, exceptionsToRethrow, undef;

    promiseId = 0;
    freeze = Object.freeze || function(o) { return o; };
    pending = {};

    exceptionsToRethrow = {
        RangeError: 1,
        ReferenceError: 1,
        SyntaxError: 1,
        TypeError: 1
    };

    /**
     * Setup debug output handlers for the supplied promise.
     * @param p {Promise} A trusted (when.js) promise
     * @return p
     */
    function debugPromise(p) {
        // TODO: Need to find a way for promises returned by .then()
        // to also be debug promises.
        p.then(
            undef,
            function(err) {
                if(p.id) {
                    console.error(p.toString());
                } else {
                    console.error('[object Promise] REJECTED:', err);
                }
            }
        );

        return p;
    }

    function wrapCallback(cb) {
        if(typeof cb != 'function') return cb;

        return function(v) {
            try {
                return cb(v);
            } catch(err) {
                if(err) {
                    if (err.name in exceptionsToRethrow) {
                        setTimeout(function() {
                            throw err;
                        }, 0);
                    } else if (err.stack) {
                        console.error(err.stack);
                    }
                }

                throw err;
            }
        }
    }

    /**
     * Helper to form debug string for promises depending on their
     * current state
     * @param name
     * @param id
     * @param status
     * @param value
     */
    function toString(name, id, status, value) {
        var s = '[object ' + name + ' ' + id + '] ' + status;
        if(value !== pending) s += ': ' + value;
        return s;
    }

    function F() {}
    function beget(o) {
        F.prototype = o;
        o = new F();
        F.prototype = undef;

        return o;
    }

    /**
     * Replacement for when() that sets up debug logging on the
     * returned promise.
     */
    function whenDebug() {
        return debugPromise(when.apply(null, arguments));
    }

    /**
     * Replacement for when.defer() that sets up debug logging
     * on the created Deferred, its resolver, and its promise.
     * @param [id] anything optional identifier for this Deferred that will show
     * up in debug output
     * @return {Deferred} a Deferred with debug logging
     */
    function deferDebug() {
        var d, status, value, origResolve, origReject, origThen, id;

        // Delegate to create a Deferred;
        d = when.defer();

        status = 'pending';
        value = pending;

        // if no id provided, generate one.  Not sure if this is
        // useful or not.
        id = arguments[arguments.length - 1];
        if(id === undef) id = ++promiseId;

        // Promise and resolver are frozen, so have to delegate
        // in order to setup toString() on promise, resolver,
        // and deferred
        d.promise = beget(d.promise);
        d.promise.toString = function() {
            return toString('Promise', id, status, value);
        };

        d.resolver = beget(d.resolver);
        d.resolver.toString = function() {
            return toString('Resolver', id, status, value);
        };

        origResolve = d.resolver.resolve;
        d.resolve = d.resolver.resolve = function(val) {
            value = val;
            status = 'resolving';
//            console.log(d.resolver.toString());
            return origResolve.apply(undef, arguments);
        };

        origReject = d.resolver.reject;
        d.reject = d.resolver.reject = function(err) {
            value = err;
            status = 'REJECTING';
//            console.error(d.resolver.toString());
            return origReject.apply(undef, arguments);
        };

        d.toString = function() {
            return toString('Deferred', id, status, value);
        };

        // Setup final state change handlers
        d.then(
            function(v) { status = 'resolved'; return v; },
            function(e) { status = 'REJECTED'; throw e; }
        );

        // Experimenting with setting up ways to also debug promises returned
        // by .then().  Also need to find a way to extend the id in a way that
        // makes it obvious the returned promise is NOT the original, but is
        // related to it--it's downstream in the promise chain.
        origThen = d.promise.then;
        d.then = d.promise.then = function(cb, eb, pb) {
            var args, p, id;

            id = d.id + '+';

            args = [];

            if(arguments.length > 0) args[0] = wrapCallback(cb, id);
            if(arguments.length > 1) args[1] = wrapCallback(eb, id);
            if(arguments.length > 2) args[2] = wrapCallback(pb, id);

            var p = origThen.apply(null, args);

            p.id = id;
            p = beget(p);
            p.toString = function() {
                return toString('Promise', p.id, status, value);
            };
            
            // See below. Not sure if debug promises should be frozen
            return freeze(p);
        };

        // Add an id to all directly created promises.  It'd be great
        // to find a way to propagate this id to promise created by .then()
        d.id = d.promise.id = d.resolver.id = id;

        // Attach debug handlers after the substitute promise
        // has been setup, so the id can be logged.
        debugPromise(d.promise);

        // TODO: Should we still freeze these?
        // Seems safer for now to err on the side of caution and freeze them,
        // but it could be useful to all them to be modified during debugging.
        freeze(d.promise);
        freeze(d.resolver);

        return d;
    }

    whenDebug.defer = deferDebug;
    whenDebug.isPromise = when.isPromise;

    // For each method we haven't already replaced, replace it with
    // one that sets up debug logging on the returned promise
    for(var p in when) {
        if(when.hasOwnProperty(p) && !(p in whenDebug)) {
            (function(p, orig) {
                whenDebug[p] = function() {
                    return debugPromise(orig.apply(when, arguments));
                };
            })(p, when[p]);
        }
    }

    return whenDebug;

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when      = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);

/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * apply.js
 * Helper for using arguments-based and variadic callbacks with any
 * {@link Promise} that resolves to an array.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/apply',[],function() {

    var toString = Object.prototype.toString;
    
    /**
     * Creates a function that accepts a function that takes individual
     * arguments (it can be variadic, too), and returns a new function that
     * takes a single array as its only param:
     *
     * function argBased(a, b, c) {
     *   return a + b + c;
     * }
     *
     * argBased(1, 2, 3); // 6
     *
     * // Create an array-based version of argBased
     * var arrayBased = apply(argBased);
     * var inputs = [1, 2, 3];
     *
     * arrayBased(inputs); // 6
     *
     * With promises:
     *
     * var d = when.defer();
     * d.promise.then(arrayBased);
     *
     * d.resolve([1, 2, 3]); // arrayBased called with args 1, 2, 3 -> 6
     *
     * @param f {Function} arguments-based function
     *
     * @returns {Function} a new function that accepts an array
     */
    return function(f) {
        /**
         * @param array {Array} must be an array of arguments to use to apply the original function
         *
         * @returns the result of applying f with the arguments in array.
         */
        return function(array) {
            // It better be an array
            if(toString.call(array) != '[object Array]') throw new Error('apply called with non-array arg');

            return f.apply(null, array);
        }
    };

});
})(typeof define == 'function'
    ? define
    : function (factory) { typeof module != 'undefined'
        ? (module.exports  = factory())
        : (this.when_apply = factory());
    }
    // Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * delay.js
 *
 * Helper that returns a promise that resolves after a delay.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/delay',['./when'], function(when) {

    var undef;

    /**
     * Creates a new promise that will resolve after a msec delay.  If promise
     * is supplied, the delay will start *after* the supplied promise is resolved.
     *
     * Usage:
     * // Do something after 1 second, similar to using setTimeout
     * delay(1000).then(doSomething);
     * // or
     * when(delay(1000), doSomething);
     *
     * // Do something 1 second after triggeringPromise resolves
     * delay(triggeringPromise, 1000).then(doSomething, handleRejection);
     * // or
     * when(delay(triggeringPromise, 1000), doSomething, handleRejection);
     *
     * @param [promise] anything - any promise or value after which the delay will start
     * @param msec {Number} delay in milliseconds
     */
    return function delay(promise, msec) {
        if(arguments.length < 2) {
            msec = promise >>> 0;
            promise = undef;
        }

        return when(promise, function(val) {
            var deferred = when.defer();
            setTimeout(function() {
                deferred.resolve(val);
            }, msec);
            return deferred.promise;
        });
    };

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when_delay = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);



/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * timeout.js
 *
 * Helper that returns a promise that rejects after a specified timeout,
 * if not explicitly resolved or rejected before that.
 *
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define('when/timeout',['./when'], function(when) {

    var undef;

    /**
     * Returns a new promise that will automatically reject after msec if
     * the supplied promise doesn't resolve or reject before that.
     *
     * Usage:
     *
     * var d = when.defer();
     * // Setup d however you need
     *
     * // return a new promise that will timeout if we don't resolve/reject first
     * return timeout(d, 1000);
     *
     * @param promise anything - any promise or value that should trigger
     *  the returned promise to resolve or reject before the msec timeout
     * @param msec {Number} timeout in milliseconds
     *
     * @returns {Promise}
     */
    return function timeout(promise, msec) {
        var deferred, timeout;

        deferred = when.defer();

        timeout = setTimeout(function onTimeout() {
            timeout && deferred.reject(new Error('timed out'));
        }, msec);

        function cancelTimeout() {
            clearTimeout(timeout);
            timeout = undef;
        }

        when(promise, deferred.resolve, deferred.reject);

        return deferred.then(
            function(value) {
                cancelTimeout();
                return value;
            },
            function(reason) {
                cancelTimeout();
                throw reason;
            }
        );
    };

});
})(typeof define == 'function'
    ? define
    : function (deps, factory) { typeof module != 'undefined'
        ? (module.exports = factory(require('./when')))
        : (this.when_timeout = factory(this.when));
    }
    // Boilerplate for AMD, Node, and browser global
);



define('thrust/util/when',['when/debug', 'when/apply', 'when/delay', 'when/timeout', 'thrust/util/array'],
function (when, apply, delay, timeout, util)
{
    /**
    @module thrust-util-when
    **/

    /**
    when.apply, used to apply when results over a function, similar to jQuerys Deferred.
    See for more information: [https://github.com/cujojs/when/wiki/when-apply](https://github.com/cujojs/when/wiki/when-apply)

    @for thrust-util-when
    @method when.apply
    **/
    when.apply = apply,
    /**
    when.delay, creates a promise that resolves in x ms, using setTimeout.
    See for more information: [https://github.com/cujojs/when/wiki/when-delay](https://github.com/cujojs/when/wiki/when-delay)

    @method when.delay
    **/
    when.delay = delay;
    /**
    when.timeout, creates a promise that will timeout if x ms if not resolved.
    See for more information: [https://github.com/cujojs/when/wiki/when-timeout](https://github.com/cujojs/when/wiki/when-timeout)

    @method when.timeout
    **/
    when.timeout = timeout;

    return {
        /**
        Access to whenjs, the main library for promises.

        @method when
        **/
        when: when,
        /**
        Flatten and filter arrays down to just the existing promises.

        @method flattenToPromises 
        @param {Array} Array to flatten, and filter.
        @returns {Array of Promises} 
        **/
        flattenToPromises: function (array)
        {
            return util.flatten(array).filter(function (x)
            {
                return when.isPromise(x);
            })
        }
    };
});
/*!
 * jQuery JavaScript lib v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
define('thrust/util/lib/extend',['thrust/util/collection', 'thrust/util/type'],
function (uCollection, uType)
{
    
    var extend = function ()
    {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean")
        {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !uType.isFunction(target))
        {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (length === i)
        {
            target = this;
            --i;
        }

        for (; i < length; i++)
        {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null)
            {
                // Extend the base object
                for (name in options)
                {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy)
                    {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (uType.isObject(copy) || (copyIsArray = uType.isArray(copy))))
                    {
                        if (copyIsArray)
                        {
                            copyIsArray = false;
                            clone = src && uType.isArray(src) ? src : [];

                        } else
                        {
                            clone = src && uType.isObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined)
                    {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };
    return {
        altExtend: extend,
        deepCopy: function ()
        {
            var args = Array.prototype.slice.call(arguments);
            return extend.apply(null, [true].concat(args));
        }
    };
});
define('thrust/util/lib/camelcase',[],function()
{
    
    /// <summary>
    /// Import jQuerys camelcase method.
    /// </summary>
    /// <returns></returns>
    var rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function (all, letter)
        {
            return (letter + "").toUpperCase();
        };

    var exports = {
        camelCase: function (string)
        {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        unCamelCase: function (str)
        {
            return str.replace(/([A-Z])/g, function (all, s) { return '-' + s.toLowerCase(); });
        }
    };

    return exports;
});
define('thrust/util/main',[
    'lodash',
    //#region Our Methods
    './array',
    './collection',
    './function',
    './object',
    './type',
    './constants',
    './guid',
    './property',
    './url',
    './string',
    './when',
    //#endregion
    //#region Third Party Methods
    './lib/extend',
    './lib/camelcase'
    //#endregion
],
function (_, uArray, uCollection, uFunction, uObject, uType)
{
    
    /**
    @class thrust-util
    @uses thrust-util-array
    @uses thrust-util-collection
    @uses thrust-util-func
    @uses thrust-util-obj
    @uses thrust-util-type
    @uses thrust-util-url
    @uses thrust-util-when
    **/

    var args = Array.prototype.slice.call(arguments, 1);
    // Bring everything together.
    var exports = uCollection.extend.apply({
        /**
        Reference to lodash
        @property _
        @type {_}
        **/
        _: _,
        /**
        Reference to array methods
        @property array
        @type {Object}
        **/
        array: uArray,
        /**
        Reference to collection methods
        @property collection
        @type {Object}
        **/
        collection: uCollection,
        /**
        Reference to function methods
        @property function
        @type {Object}
        **/
        func: uFunction,
        /**
        Reference to object methods
        @property obj
        @type {Object}
        **/
        obj: uObject,
        /**
        Reference to type methods
        @property type
        @type {Object}
        **/
        type: uType
    }, args);
    return exports;
});
define('thrust/util', ['thrust/util/main'], function (main) { return main; });

define('thrust/log',['thrust/config', 'thrust/util'],
function (tConfig, util)
{
    /**
        A basic logger for the thrust framework.
        Disables debug logging when thrust is not in debug mode.

    @module thrust
    @submodule log
    **/
    
    // Log levels
    var LEVEL = {
        DEBUG: 4,
        INFO: 3,
        WARN: 2,
        ERROR: 1
    };

    // Declare our variables
    var console = window.console,
        timers = {},
        log = (console && console.log) || false,
        warn = (console && console.warn) || false,
        info = (console && console.info) || false,
        error = (console && console.error) || false,
        time = (console && console.time) || false,
        timeEnd = (console && console.timeEnd) || false,
        slice = Array.prototype.slice,
        configLevel = tConfig.log.level || LEVEL.ERROR,
        logLevel = LEVEL[configLevel] || (typeof configLevel === 'string' && LEVEL[configLevel.toUpperCase()]) || (typeof configLevel  === 'number' && configLevel) || LEVEL.ERROR;

    // Various loggers to handle IE8/9 support.
    var logRunner = function (consoleMethod, logType)
    {
        // Show logs when enabled or if they are errors
        var args = slice.call(arguments, 1);
        if (consoleMethod)
        {
            if (consoleMethod.apply)
                consoleMethod.apply(console, args);
            else
                consoleMethod(args);
        }
        else if (!consoleMethod && log)
        {
            if (log.apply)
                log.apply(console, args);
            else
                log(args);
        }
    };

    /**
    A basic logger for the thrust framework.
        Disables debug logging when thrust is not in debug mode.

    @class Log
    **/
    var Log = {
        /**
        Logs a debug type message using the console log method
        
        @method debug
        **/
        debug: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                var args = slice.call(arguments);
                args.unshift(log);

                logRunner.apply(this, args, 'log');
            }
        },
        /**
        Logs a info type message using the console info method if available, otherwise it uses the console log method.

        @method info
        **/
        info: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.INFO)
            {
                var args = slice.call(arguments);
                args.unshift(info);

                logRunner.apply(this, args, 'info');
            }
        },
        /**
        Logs a warn type message using the console warn method if available, otherwise it uses the console log method.

        @method warn
        **/
        warn: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.WARN)
            {
                var args = slice.call(arguments);
                args.unshift(warn);

                logRunner.apply(this, args, 'warn');
            }
        },
        /**
        Logs a error type message using the console error method if available, otherwise it uses the console log method.

        @method error
        **/
        error: function ()
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.ERROR)
            {
                var args = slice.call(arguments);
                args.unshift(error);

                logRunner.apply(this, args, 'error');
            }
        },
        /**
        Logs a time type message using the console time method if available, otherwise it uses the console log method.

        @method time
        **/
        time: function (message)
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                timers[message] = { start: new Date().getTime() };
                var msg = util.format('{0}: timer started', message),
                    args = slice.call(arguments, 1);
                args.unshift(msg);
                args.unshift(time);

                logRunner.apply(this, args);
            }
        },
        /**
        Logs a timeEnd type message using the console timeEnd method if available, otherwise it uses the console log method.
        Causes the timer to end, for the given message.

        @method timeEnd
        **/
        timeEnd: function (message)
        {
            // Short circuit if logging is disabled.  This is as close to noop as we can get, incase there is a direct reference to this method.
            if (!tConfig.log.enabled) return;
            if (logLevel >= LEVEL.DEBUG)
            {
                timers[message].end = new Date.getTime();
                var time = timers[message].end - timers[message].start,
                    msg = util.format('{0}: {1}ms', message, time);
                var args = slice.call(arguments, 1);
                args.unshift(msg);
                args.unshift(timeEnd);

                logRunner.apply(this, args);
            }
        }
    };

    return Log;
});

define('thrust/ignite',['thrust/config', 'thrust/util'],
function(config, util)
{
    var isArray = util.isArray,
        toArray = util.toArray,
        each = util.each,
        isObject = util.isObject,
        reconcileArrays = function (from, to)
        {
            each(from, function (x, i)
            {
                if (isArray(x))
                {
                    to[i] = toArray(to[i]);
                }
                else if (isObject(x))
                {
                    reconcileArrays(x, to[i]);
                }
            });
        };

    /**
    Contructs a wire spec for thrust to launch from.

    @module thrust
    @submodule ignite
    **/
    return function (settings)
    {
        var localConfig = util.deepCopy({}, config, settings);
        reconcileArrays(config, localConfig);

        var properties = {
                __conventions: []
            },
            spec = {
                name: localConfig.name || 'global',
                config: localConfig,
                thrust: {
                    resolve: 'thrust',
                    properties: properties
                },
                plugins: [{ module: 'wire/debug' }]
            };

        // Load all the thrust-js plugins, defined in the config.
        var plugins = localConfig.plugins;
        for (var i = 0, iLen = plugins.length; i < iLen; i++)
        {
            var name = plugins[i],
                plugin = name;

            name = name.substring(name.lastIndexOf('/') + 1);
            
            var pluginSpec = spec[name] = {
                resolve: plugin,
                properties: { __conventions: [] }
            };
            properties[name] = { $ref: name };

            var conventions = localConfig[name].conventions;
            for (var z = 0, zLen = conventions.length; z < zLen; z++)
            {
                var cname = conventions[z],
                    convention = cname;
                cname = name + '-convention-' + cname.substring(cname.lastIndexOf('/') + 1);

                spec[cname] = { create: convention };
                pluginSpec.properties.__conventions.push({ $ref: cname });
                properties.__conventions.push({ $ref: cname });
            }
        }

        var modules = localConfig.modules;
        for (var i = 0, iLen = modules.length; i < iLen; i++)
        {
            var module = modules[i],
                name = modules[i];

            var moduleSpec = spec[name] = {
                resolve: {
                    module: 'thrust/module',
                    args: [{ resolve: module }, name]
                },
                init: {
                    thrustCreate: [{ $ref: 'thrust' }]
                }
            };
        }

        return spec;
    };
});
define('thrust/module',['thrust/util', 'thrust/log'],
function (util, log)
{
    var type = util.type,
        format = util.format,
        thrustCache = {},
        /**
        Moves all properties, that should exist outside of the core, into

        @method moveToCore
        @private
        @param {Object} from Object to extract items from
        @param {Object} to Object to place items on
        @param {Array} list Items to move from to the other object
        **/
        moveToCore = function (from, to, list)
        {
            for (var i = 0, iLen = list.length; i < iLen; i++)
            {
                to[list[i]] = from[list[i]];
                delete from[list[i]];
            }
        },
        getEventNamespace = function (name, prefix)
        {
            if (!prefix) prefix = 'module-'; return '.' + (name === 'global' ? 'global' : prefix + name.replace(/\./g, '-'));
        },
        __optionalMethods = [     // Optional methods that may be on a module
            'start',
            'stop',
            'ready'
        ];

    /**
    The module is the heart of the core, every module gets one facade per module.

    @class Module
    @param {Thrust} thrust The thrust instance
    @param {Object} def The module definition
    @param {String} [name] The module name.
    **/
    var Module = function (/* $ref */ thrust, def, name)
    {
        name = this.name = (name || def.name);
        this.instance = def;
        this.instance.name = (this.instance.name || name);

        if (!this.instance.name)
            throw new Error('All Modules must have a name!');

        // Modules must have an init method and a destroy method, it's up to the module developer to populate these methods.
        for (var i = 0, iLen = thrust.__requiredMethods.length; i < iLen; i++)
            if (!def[thrust.__requiredMethods[i]])
                throw new Error('Required "{0}" method not found on module "{1}"!'.format(thrust.__requiredMethods[i], name));

        // If the module name is undefined, bring the name into the module.
        if (util.type(def.name) === 'undefined')
            def.name = name;

        var mid = this.mid = util.uniqueId('m');
        var thrustModule = thrustCache[mid] = {
            _started: false,
            name: (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-'),
            module: this
        };

        var facades = thrustModule.facades = {};
        if (!thrust.__conventionPluckPropertiesCache) thrust.__conventionPluckPropertiesCache = util.flatten(util.pluck(thrust.__conventions || [], 'properties'));

        // Move all special properties off to the core's internal method.
        moveToCore(this.instance, thrustModule, thrust.__requiredMethods);
        moveToCore(this.instance, thrustModule, __optionalMethods);
        moveToCore(this.instance, thrustModule, thrust.__conventionPluckPropertiesCache);

        util.safeInvoke(thrust.__conventions, 'create', thrust, this, facades);

        this.__namespace = getEventNamespace(this.instance.name);

        this.thrust = thrust;
    };

    var callFacadeMethods = function (method, mid)
    {
        var results = [];
        for (var i in thrustCache[mid].facades)
        {
            var moduleCache = thrustCache[mid],
                facade = moduleCache.facades[i];
            log.debug(format('Core: Calling facade "{0}" {1}()', i, method));
            if (facade[method] && type(facade) === 'object')
                results.push(facade[method].call(facade));
        }
        return results;
    };

    Module.prototype = {
        /**
        Getter/Setter for convention methods.
        Gets the value convention property (defined in the properties array of a facade).
        Sets the value of a convention property (for storing convention configuration)

        @param {String} property The property to get or set
        @param {object} [value] The value to set
        @method convention
        @returns {Object} The valaue.
        **/
        convention: function (property, value)
        {
            if (typeof value !== 'undefined')
            {
                thrustCache[this.mid][property] = value;
                return;
            }
            return thrustCache[this.mid][property];
        },
        /**
        Injects this module into the given thrust instance.

        @method thrustCreate
        @param {Thrust} thrust The thrust instance.
        **/
        thrustCreate: function (thrust)
        {
            thrust.__injectModule(this);
        },
        /**
        Makes a call to all the modules facades
        The order of the call depends on the order required.
        During the startup stage (init, start, ready) facades are called first.
        During the shutdown state (stop, destroy) facades are called last.
        This allows modules to startup and shutdown will all the tools it had to begin with.

        @method coreCall
        @protected
        @param {String} method the method to call
        @param {Boolean} facadeAfter calls facade methods before or after module method.
        @param {Array} args Args to be passed onto the module method.
        **/
        coreCall: function (method, facadeAfter, args)
        {
            var results = [],
                that = this;
            if (!facadeAfter)
            {
                results.push(callFacadeMethods(method, that.mid));
            }

            var m = thrustCache[that.mid][method];
            if (m)
            {
                results.push(m.apply(that.instance, args));
            }

            if (facadeAfter)
            {
                results.push(callFacadeMethods(method, that.mid));
            }

            return util.flatten(results);
        },
        /**
        Start the module, inside the thrust container it was created on.

        @method start
        **/
        start: function ()
        {
            var that = this;
            that.thrust.start(that.name);
        },
        /**
        Stop the module, inside the thrust container it was created on.

        @method start
        **/
        stop: function ()
        {
            var that = this;
            that.thrust.stop(that.name);
        }
    };

    return Module;
});
/**
 * @license RequireJS domReady 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady',[],function () {
    

    var isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [],
        isTop, testDiv, scrollIntervalId;

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i++) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch(e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        if (document.readyState === "complete" ||
            document.readyState === "interactive") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.0';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * wire/base plugin
 * Base wire plugin that provides properties, init, and destroy facets, and
 * a proxy for plain JS objects.
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define) {
define('wire/base',['when'], function(when) {
    var tos, createObject, whenAll, chain;

    tos = Object.prototype.toString;

    whenAll = when.all;
    chain = when.chain;
    
	// In case Object.create isn't available
	function T() {}

	function objectCreate(prototype) {
		T.prototype = prototype;
		return new T();
	}

	createObject = Object.create || objectCreate;

    function invoke(func, facet, args, wire) {
        return when(wire(args),
			function (resolvedArgs) {
				return facet.invoke(func, (tos.call(resolvedArgs) == '[object Array]')
					? resolvedArgs
					: [resolvedArgs]);
			}
		);
    }

    function invokeAll(facet, wire) {
		var options = facet.options;

		if(typeof options == 'string') {
			return invoke(options, facet, [], wire);

		} else {
			var promises, func;
			promises = [];

			for(func in options) {
				promises.push(invoke(func, facet, options[func], wire));
			}

			return whenAll(promises);
		}
	}

    /**
     * Factory that handles cases where you need to create an object literal
     * that has a property whose name would trigger another wire factory.
     * For example, if you need an object literal with a property named "create",
     * which would normally cause wire to try to construct an instance using
     * a constructor or other function, and will probably result in an error,
     * or an unexpected result:
     * myObject: {
     *      create: "foo"
     *    ...
     * }
     *
     * You can use the literal factory to force creation of an object literal:
     * myObject: {
     *    literal: {
     *      create: "foo"
     *    }
     * }
     *
     * which will result in myObject.create == "foo" rather than attempting
     * to create an instance of an AMD module whose id is "foo".
     */
	function literalFactory(resolver, spec /*, wire */) {
		resolver.resolve(spec.literal);
	}

	function protoFactory(resolver, spec, wire) {
		var parentRef, promise;
        
        parentRef = spec.prototype;
        
        promise = typeof parentRef === 'string'
                ? wire.resolveRef(parentRef)
                : wire(parentRef);
        
        when(promise,
			function(parent) {
				var child = createObject(parent);
				resolver.resolve(child);
			},
            resolver.reject
		);
	}

	function propertiesFacet(resolver, facet, wire) {
		var options, promises, prop;
		promises = [];
		options = facet.options;

		for(prop in options) {
			promises.push(setProperty(facet, prop, options[prop], wire));
		}

        whenAll(promises, resolver.resolve, resolver.reject);
	}

	function setProperty(proxy, name, val, wire) {
		var wired = wire(val, name, proxy.path);
		when(wired,
            function(resolvedValue) {
			    proxy.set(name, resolvedValue);
		    }
        );

		return wired;
	}

	function invokerFacet(resolver, facet, wire) {
		chain(invokeAll(facet, wire), resolver);
	}

	function pojoProxy(object /*, spec */) {
		return {
			get: function(property) {
				return object[property];
			},
			set: function(property, value) {
				object[property] = value;
				return value;
			},
			invoke: function(method, args) {
				if(typeof method === 'string') {
					method = object[method];
				}

				return method.apply(object, args);
			},
			destroy: function() {}
		};
	}

    //noinspection JSUnusedLocalSymbols
    /**
     * Wrapper for use with when.reduce that calls the supplied destroyFunc
     * @param [unused]
     * @param destroyFunc {Function} destroy function to call
     */
    function destroyReducer(unused, destroyFunc) {
        return destroyFunc();
    }

	return {
		wire$plugin: function(ready, destroyed /*, options */) {
            // Components in the current context that will be destroyed
            // when this context is destroyed
			var destroyFuncs = [];

			when(destroyed, function() {
                when.reduce(destroyFuncs, destroyReducer, {});
			});

			function destroyFacet(resolver, facet, wire) {
				destroyFuncs.push(function destroyObject() {
					return invokeAll(facet, wire);
				});

                // This resolver is just related to *collecting* the functions to
                // invoke when the component is destroyed.
				resolver.resolve();
			}

			return {
				factories: {
					literal: literalFactory,
					prototype: protoFactory
				},
				facets: {
					// properties facet.  Sets properties on components
					// after creation.
					properties: {
						configure: propertiesFacet
					},
					// init facet.  Invokes methods on components during
					// the "init" stage.
					init: {
						initialize: invokerFacet
					},
					// ready facet.  Invokes methods on components during
					// the "ready" stage.
					ready: {
						ready: invokerFacet
					},
					// destroy facet.  Registers methods to be invoked
					// on components when the enclosing context is destroyed
					destroy: {
						ready: destroyFacet
					}
				},
				proxies: [
					pojoProxy
				]
			};
		}
	};
});
})(typeof define == 'function'
	// use define for AMD if available
	? define
    : typeof module != 'undefined'
        ? function(deps, factory) {
            module.exports = factory.apply(this, deps.map(function(x) {
				return require(x);
			}));
        }
	    // If no define or module, attach to current context.
	    : function(deps, factory) { this.wire_base = factory(this.when); }
);



(function (global, define)
{
    define('wire/resolver',['require', 'when', './base'], function (require, when, basePlugin)
    {
        var functionParameterRegex = /^function.*?\((.*?)\)/i,
        functionParameter$refRegex = /\/\*.?\$ref(.*?)\*\/(.*)/im,
        functionBody$refRegex = /\/\*.*\$ref(.*?)\*\/.*?this\.(.*?)$/im;

        var analyzeFunctionParameters, analyzeFunctionBody, analyzeFunctionPrototype, analyzeFunction;

        var hasOwn = Object.prototype.hasOwnProperty;

        analyzeFunctionParameters = function (functionContent)
        {
            var allFunctionParameters = functionParameterRegex.exec(functionContent),
                functionParameters = allFunctionParameters && allFunctionParameters[1].split(',');

            if (functionParameters)
            {
                var functionParameterBindingValues = [];
                for (var i = 0, iLen = functionParameters.length; i < iLen; i++)
                {
                    var arg = functionParameters[i].trim();
                    var result = functionParameter$refRegex.exec(arg);
                    if (result)
                    {
                        var explicitBindingValue = result[1].trim(),
                            implicitBindingValue = result[2].trim();

                        if (explicitBindingValue)
                        {
                            functionParameterBindingValues.push({ $ref: explicitBindingValue.replace(':', '').trim() });
                        }
                        else
                        {
                            functionParameterBindingValues.push({ $ref: implicitBindingValue });
                        }
                    }
                    else
                    {
                        functionParameterBindingValues.push(null);
                    }
                }
                return functionParameterBindingValues;
            }

            return [];
        };

        function flatten(array, shallow)
        {
            var result = [];
            if (!array)
            {
                return result;
            }
            var value,
                index = -1,
                length = array.length;

            while (++index < length)
            {
                value = array[index];
                if (isArray(value))
                {
                    push.apply(result, shallow ? value : flatten(value));
                }
                else
                {
                    result.push(value);
                }
            }
            return result;
        }

        analyzeFunctionBody = function (functionBody)
        {
            var splitFunctionBody = _.flatten(functionBody.split(',').map(function (x) { return x.split(';'); }));

            var functionBodyBindingValues = {};
            for (var i = 0, iLen = splitFunctionBody.length; i < iLen; i++)
            {
                var content = splitFunctionBody[i].trim();
                var result = functionBody$refRegex.exec(content);
                if (result)
                {
                    var explicitBindingValue = result[1].trim(),
                        implicitBindingValue = result[2].trim();

                    console.log(explicitBindingValue, implicitBindingValue);

                    if (explicitBindingValue)
                    {
                        functionBodyBindingValues[implicitBindingValue] = explicitBindingValue.replace(':', '').trim();
                    }
                    else
                    {
                        functionBodyBindingValues[implicitBindingValue] = implicitBindingValue;
                    }
                }
            }

            return functionBodyBindingValues;
        };

        analyzeFunctionPrototype = function (functionPrototype)
        {
            var functionPrototypeBindingValues = {};
            for (var i in functionPrototype)
            {
                if (hasOwn.call(functionPrototype, i))
                {
                    var protoItem = functionPrototype[i];
                    if (typeof protoItem === 'string' && protoItem.indexOf('$ref') === 0)
                    {
                        var indexOfColon = protoItem.indexOf(':')
                        if (indexOfColon > -1)
                            functionPrototypeBindingValues[i] = protoItem.substring(indexOfColon + 1).trim();
                        else
                            functionPrototypeBindingValues[i] = i;
                    }
                        // Potentially made recursive, for nested references?
                        // The potential complex dependancies are mind boggling
                    else if (typeof protoItem === 'object' && '$ref' in protoItem)
                    {
                        functionPrototypeBindingValues[i] = protoItem.$ref;
                    }
                }
            }
            return functionPrototypeBindingValues;
        };

        analyzeFunction = function (func)
        {
            if (typeof func === 'function')
            {
                var functionContent = func.toString(),
                    parameterMap = analyzeFunctionParameters(functionContent);

                return {
                    parameters: parameterMap
                };
            }
            return false;
        }

        return {
            analyzeFunction: analyzeFunction
        };
    });
})(this,
    typeof define == 'function'
    // use define for AMD if available
    ? define
    // Browser
    // If no define or module, attach to current context.
    : typeof module != 'undefined'
        ? function(deps, factory) {
            module.exports = factory.apply(this, [require].concat(deps.slice(1).map(function(x) {
                return require(x);
            })));
        }
        : function(deps, factory) {
            this.wire = factory(
                // Fake require()
                function(modules, callback) { callback(modules); },
                // dependencies
                this.when, this.wire_base
            );
        }
);
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * wire
 * Javascript IOC Container
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 0.8.1
 */

(function(global, define){
define('wire/wire',['require', 'when', './base', './resolver'], function(require, when, basePlugin, resolverAnalyzer) {

	

	var tos, arrayProto, apIndexOf, apSlice, rootSpec, rootContext, delegate, emptyObject,
		defer, chain, whenAll, isArray, indexOf, lifecycleSteps, undef;

	wire.version = "0.8.1";

	rootSpec = global['wire'] || {};
	lifecycleSteps = ['create', 'configure', 'initialize', 'connect', 'ready'];

	emptyObject = {};

	tos = Object.prototype.toString;

	arrayProto = Array.prototype;
	apSlice = arrayProto.slice;
	apIndexOf = arrayProto.indexOf;

	// Polyfills

	/**
	 * Object.create
	 */
	delegate = Object.create || createObject;

	/**
	 * Array.isArray
	 */
	isArray = Array.isArray || function (it) {
		return tos.call(it) == '[object Array]';
	};

	/**
	 * Array.prototype.indexOf
	 */
	indexOf = apIndexOf
			? function (array, item) {
				return apIndexOf.call(array, item);
			}
			: function (array, item) {
				for (var i = 0, len = array.length; i < len; i++) {
					if (array[i] === item) return i;
				}

				return -1;
			};

	emptyObject = {};

	// Local refs to when.js
	defer = when.defer;
	chain = when.chain;
	whenAll = when.all;

	/**
	 * Helper to reject a deferred when another is rejected
	 * @param resolver {Object} resolver to reject
	 */
	function chainReject(resolver) {
		return function (err) {
			resolver.reject(err);
		};
	}

	/**
	 * Creates an already-rejected Deferred using err as the rejection reason
	 * @param err anything - the rejection reason
	 */
	function rejected(err) {
		var d = defer();
		d.reject(err);
		return d.promise;
	}

	/**
	 * Abstract the platform's loader
	 * @param moduleId {String} moduleId to load
	 * @returns {Promise} a promise that resolves to the loaded module
	 */
	var loadModule = define.amd
		? function(moduleId) {
			// TODO: Choose loadModule implementation based on platform
			var deferred = defer();

			require([moduleId], deferred.resolve);

			return deferred.promise;
		}
		: require;

	//
	// AMD Module API
	//

	/**
	 * The top-level wire function that wires contexts as direct children
	 * of the (possibly implicit) root context.  It ensures that the root
	 * context has been wired before wiring children.
	 *
	 * @public
	 *
	 * @param spec {String|Array|*}
	 */
	function wire(spec) {

		// If the root context is not yet wired, wire it first
		if (!rootContext) {
			rootContext = wireContext(rootSpec);
		}

		// Use the rootContext to wire all new contexts.
		return when(rootContext,
			function (root) {
				return root.wire(spec);
			}
		);
	}

	//
	// AMD loader plugin API
	//

	//noinspection JSUnusedLocalSymbols
	/**
	 * AMD Loader plugin API
	 * @param name {String} spec module id, or comma-separated list of module ids
	 * @param require unused
	 * @param callback {Function|Promise} callback to call or promise to resolve when wiring is completed
	 * @param config unused
	 */
	function amdLoad(name, require, callback, config) {
		var resolver = callback.resolve
			? callback
			: {
				resolve: callback,
				reject: function (err) { throw err; }
			};

		// If it's a string, try to split on ',' since it could be a comma-separated
		// list of spec module ids
		chain(wire(name.split(',')), resolver);
	}

	wire.load = amdLoad;

	//
	// AMD Builder plugin API
	//

	// pluginBuilder: './build/amd/builder'
	// cram > v0.2 will support pluginBuilder property
	wire['pluginBuilder'] = './build/amd/builder';

	//
	// Private functions
	//

	/**
	 * Creates a new context from the supplied specs, with the supplied parent context.
	 * If specs is an {Array}, it may be a mixed array of string module ids, and object
	 * literal specs.  All spec module ids will be loaded, and then all specs will be
	 * merged from left-to-right (rightmost wins), and the resulting, merged spec will
	 * be wired.
	 *
	 * @private
	 *
	 * @param specs {String|Array|*}
	 * @param parent {Object} parent content
	 *
	 * @return {Promise} a promise for the new context
	 */
	function wireContext(specs, parent) {
		// Do the actual wiring after all specs have been loaded
		function doWireContexts(spec) {
			return when(createScope(spec, parent),
				function (scope) {
					return scope;
				}
			);
		}

		return when(ensureAllSpecsLoaded(isArray(specs) ? specs : [specs]), doWireContexts);
	}

	/**
	 * Given a mixed array of strings and non-strings, returns a promise that will resolve
	 * to an array containing resolved modules by loading all the strings found in the
	 * specs array as module ids
	 * @private
	 *
	 * @param specs {Array} mixed array of strings and non-strings
	 *
	 * @returns {Promise} a promise that resolves to an array of resolved modules
	 */
	function ensureAllSpecsLoaded(specs) {
		return when.reduce(specs, function(merged, module) {
			return isString(module)
				? when(loadModule(module), function(spec) { return mixinSpec(merged, spec); })
				: mixinSpec(merged, module)
		}, {});
	}

	/**
	 * Do the work of creating a new scope and fully wiring its contents
	 * @private
	 *
	 * @param scopeDef {Object} The spec (or portion of a spec) to be wired into a new scope
	 * @param parent {scope} scope to use as the parent, and thus from which to inherit
	 *  plugins, components, etc.
	 * @param [scopeName] {String} optional name for the new scope
	 *
	 * @return {Promise} a promise for the new scope
	 */
	function createScope(scopeDef, parent, scopeName) {
		var scope, scopeParent, local, proxied, objects,
				pluginApi, resolvers, factories, facets, listeners, proxies,
				modulesToLoad, moduleLoadPromises,
				wireApi, modulesReady, scopeReady, scopeDestroyed,
				contextPromise, doDestroy;

		// Empty parent scope if none provided
		parent = parent || {};

		initFromParent(parent);
		initPluginApi();

		// TODO: Find a better way to load and scan the base plugin
		scanPlugin(basePlugin);

		contextPromise = initContextPromise(scopeDef, scopeReady);

		createComponents(local, scopeDef);

		// Once all modules are loaded, all the components can finish
		ensureAllModulesLoaded();

		// Setup overwritable doDestroy so that this context
		// can only be destroyed once
		doDestroy = function () {
			// Retain a do-nothing doDestroy() func, in case
			// it is called again for some reason.
			doDestroy = function () {
			};

			return destroyContext();
		};

		// Return promise
		// Context will be ready when this promise resolves
		return scopeReady.promise;

		//
		// Initialization
		//

		function initFromParent(parent) {
			local = {};

			// Descend scope and plugins from parent so that this scope can
			// use them directly via the prototype chain
			objects = initWireApi(delegate(parent.objects || {}));
			resolvers = delegate(parent.resolvers || {});
			factories = delegate(parent.factories || {});
			facets = delegate(parent.facets || {});


			// Set/override integral resolvers and factories
			resolvers.wire   = wireResolver;

			factories.module = moduleFactory;
			factories.create = instanceFactory;
			factories.wire   = wireFactory;
			factories.resolve = resolverFactory;

			listeners = delegateArray(parent.listeners);// ? [].concat(parent.listeners) : [];

			// Proxies is an array, have to concat
			proxies = delegateArray(parent.proxies);// ? [].concat(parent.proxies) : [];
			proxied = [];

			modulesToLoad = [];
			moduleLoadPromises = {};
			modulesReady = defer();

			scopeReady = defer();
			scopeDestroyed = defer();

			// A proxy of this scope that can be used as a parent to
			// any child scopes that may be created.
			scopeParent = {
				name: scopeName,
				objects: objects,
				destroyed: scopeDestroyed
			};

			// Full scope definition.  This will be given to sub-scopes,
			// but should never be given to child contexts
			scope = delegate(scopeParent);

			scope.local = local;
			scope.resolvers = resolvers;
			scope.factories = factories;
			scope.facets = facets;
			scope.listeners = listeners;
			scope.proxies = proxies;
			scope.resolveRef = doResolveRef;
			scope.destroy = destroy;
			scope.path = createPath(scopeName, parent.path);

			// When the parent begins its destroy phase, this child must
			// begin its destroy phase and complete it before the parent.
			// The context hierarchy will be destroyed from child to parent.
			if (parent.destroyed) {
				when(parent.destroyed, destroy);
			}
		}

		function initWireApi(objects) {
			wireApi = objects.wire = wireChild;
			wireApi.destroy = objects.destroy = apiDestroy;

			// Consider deprecating resolve
			// Any reference you could resolve using this should simply be
			// injected instead.
			wireApi.resolve = objects.resolve = apiResolveRef;

			return delegate(objects);
		}

		function initPluginApi() {
			// Plugin API
			// wire() API that is passed to plugins.
			pluginApi = function (spec, name, path) {
				// Why the promise trickery here?
				// Some factory deep in the promise chain (see wireFactory, for example)
				// may need to actually return a promise *as the result of wiring*, and not
				// have it be resolved in the chain.  So, it may return
				var d = defer();
				when(createItem(spec, createPath(name, path)), function(val) {
					d.resolve(getResolvedValue(val));
				}, d.reject);

				return d.promise;
			};

			pluginApi.resolveRef = apiResolveRef;
		}

		function initContextPromise(scopeDef, scopeReady) {
			var promises = [];

			// Setup a promise for each item in this scope
			for (var name in scopeDef) {
				if (scopeDef.hasOwnProperty(name)) {
					promises.push(local[name] = objects[name] = defer());
				}
			}

			// When all scope item promises are resolved, the scope
			// is resolved.
			// When this scope is ready, resolve the contextPromise
			// with the objects that were created
			return chain(whenAll(promises), scopeReady, objects);
		}

		//
		// Context Startup
		//

		function createComponents(names, scopeDef) {
			// Process/create each item in scope and resolve its
			// promise when completed.
			for (var name in names) {
				// No need to check hasOwnProperty since we know names
				// only contains scopeDef's own prop names.
				createScopeItem(name, scopeDef[name], objects[name]);
			}
		}

		function ensureAllModulesLoaded() {
			// Once all modules have been loaded, resolve modulesReady
			whenAll(modulesToLoad, function (modules) {
				modulesReady.resolve(modules);
				moduleLoadPromises = modulesToLoad = null;
			});
		}

		//
		// Context Destroy
		//

		function destroyContext() {
			var p, promises, pDeferred, i;

			scopeDestroyed.resolve();

			// TODO: Clear out the context prototypes?

			promises = [];
			for (i = 0; (p = proxied[i++]);) {
				pDeferred = defer();
				promises.push(pDeferred);
				processListeners(pDeferred, 'destroy', p);
			}

			// *After* listeners are processed,
			whenAll(promises, function () {
				function deleteAll(container) {
					for(var p in container) delete container[p];
				}

				deleteAll(local);
				deleteAll(objects);
				deleteAll(scope);

				var p, i;

				for (i = 0; (p = proxied[i++]);) {
					p.destroy();
				}

				// Free Objects
				local = objects = scope = proxied = proxies = parent
						= resolvers = factories = facets
						= wireApi = undef;

				// Free Arrays
				listeners = undef;
			});

			return scopeDestroyed;
		}

		//
		// Context API
		//

		// API of a wired context that is returned, via promise, to
		// the caller.  It will also have properties for all the
		// objects that were created in this scope.

		/**
		 * Resolves a reference in the current context, using any reference resolvers
		 * available in the current context
		 *
		 * @param ref {String} reference name (may contain resolver prefix, e.g. "resolver!refname"
		 */
		function apiResolveRef(ref) {
			return when(doResolveRef(ref));
		}

		/**
		 * Destroys the current context
		 */
		function apiDestroy() {
			return destroy();
		}

		/**
		 * Wires a child spec with this context as its parent
		 * @param spec
		 */
		function wireChild(spec) {
			return wireContext(spec, scopeParent);
		}

		//
		// Scope functions
		//

		function createPath(name, basePath) {
			var path = basePath || scope.path;

			return (path && name) ? (path + '.' + name) : name;
		}

		function createScopeItem(name, val, itemPromise) {
			// NOTE: Order is important here.
			// The object & local property assignment MUST happen before
			// the chain resolves so that the concrete item is in place.
			// Otherwise, the whole scope can be marked as resolved before
			// the final item has been resolved.
			var p = createItem(val, name);

			return when(p, function (resolved) {
				resolved = getResolvedValue(resolved);
				objects[name] = local[name] = resolved;
				itemPromise.resolve(resolved);
			}, chainReject(itemPromise));
		}

		function createItem(val, name) {
			var created;

			if (isRef(val)) {
				// Reference
				created = resolveRef(val, name);

			} else if (isArray(val)) {
				// Array
				created = createArray(val, name);

			} else if (isStrictlyObject(val)) {
				// Module or nested scope
				created = createModule(val, name);

			} else {
				// Plain value
				created = val;
			}

			return created;
		}

		function getModule(moduleId, spec) {
			var module, loadPromise;

			if (isString(moduleId)) {
				var m = moduleLoadPromises[moduleId];

				if (!m) {
					modulesToLoad.push(moduleId);
					m = moduleLoadPromises[moduleId] = {
						id: moduleId,
						deferred: defer()
					};

					moduleLoadPromises[moduleId] = m;
					loadPromise = when(loadModule(moduleId), function (module) {
						scanPlugin(module, spec);
						chain(modulesReady, m.deferred, module);
					});

					modulesToLoad.push(loadPromise);
				}

				module = m.deferred;

			} else {
				module = moduleId;
				scanPlugin(module);
			}

			return module;
		}

		function scanPlugin(module, spec) {
			if (module && isFunction(module.wire$plugin)) {
				var plugin = module.wire$plugin(contextPromise, scopeDestroyed.promise, spec);
				if (plugin) {
					addPlugin(plugin.resolvers, resolvers);
					addPlugin(plugin.factories, factories);
					addPlugin(plugin.facets, facets);

					listeners.push(plugin);

					addProxies(plugin.proxies);
				}
			}
		}

		function addProxies(proxiesToAdd) {
			if (!proxiesToAdd) return;

			var newProxies, p, i = 0;

			newProxies = [];
			while (p = proxiesToAdd[i++]) {
				if (indexOf(proxies, p) < 0) {
					newProxies.push(p)
				}
			}

			scope.proxies = proxies = newProxies.concat(proxies);
		}

		function addPlugin(src, registry) {
			for (var name in src) {
				if (registry.hasOwnProperty(name)) {
					throw new Error("Two plugins for same type in scope: " + name);
				}

				registry[name] = src[name];
			}
		}

		function createArray(arrayDef, name) {
			// Minor optimization, if it's an empty array spec, just return
			// an empty array.
			return arrayDef.length
					? when.map(arrayDef, function(item) {
						return createItem(item, name + '[]');
					})
					: [];
		}

		function createModule(spec, name) {

			// Look for a factory, then use it to create the object
			return when(findFactory(spec),
					function (factory) {
						var factoryPromise = defer();

						if (!spec.id) spec.id = name;

						factory(factoryPromise.resolver, spec, pluginApi);

						return processObject(factoryPromise, spec);
					},
					function () {
						// No factory found, treat object spec as a nested scope
						return createScope(spec, scope, name);
					}
			);
		}

		function findFactory(spec) {

			// FIXME: Should not have to wait for all modules to load,
			// but rather only the module containing the particular
			// factory we need.  But how to know which factory before
			// they are all loaded?
			// Maybe need a special syntax for factories, something like:
			// create: "factory!whatever-arg-the-factory-takes"
			// args: [factory args here]

			function getFactory() {
				var f, factory;

				for (f in factories) {
					if (spec.hasOwnProperty(f)) {
						factory = factories[f];
						break;
					}
				}

				// Intentionally returns undefined if no factory found
				return factory;
			}

			return getFactory() || when(modulesReady, function () {
				return getFactory() || rejected(spec);
			});
		}

		/**
		 * When the target component has been created, create its proxy,
		 * then push it through all its lifecycle stages.
		 *
		 * @private
		 *
		 * @param target the component being created, may be a promise
		 * @param spec the component's spec (the portion of the overall spec used to
		 *  create the target component)
		 *
		 * @returns {Promise} a promise for the fully wired component
		 */
		function processObject(target, spec) {

			return when(target,
				function (object) {

					var proxy = createProxy(object, spec);
					proxied.push(proxy);

					// Push the object through the lifecycle steps, processing
					// facets at each step.
					return when.reduce(lifecycleSteps,
							function (object, step) {
								return processFacets(step, proxy);
							}, proxy);
				}
			);
		}

		function createProxy(object, spec) {
			var proxier, proxy, id, i;

			i = 0;
			id = spec.id;

			while ((proxier = proxies[i++]) && !(proxy = proxier(object, spec))) {}

			proxy.target = object;
			proxy.spec = spec;
			proxy.id = id;
			proxy.path = createPath(id);

			return proxy;
		}

		function processFacets(step, proxy) {
			var promises, options, name, spec;
			promises = [];
			spec = proxy.spec;

			for (name in facets) {
				options = spec[name];
				if (options) {
					processStep(promises, facets[name], step, proxy, options);
				}
			}

			var d = defer();

			whenAll(promises,
				function () { processListeners(d, step, proxy); },
				chainReject(d)
			);

			return d;
		}

		function processListeners(promise, step, proxy) {
			var listenerPromises = [];
			for (var i = 0; i < listeners.length; i++) {
				processStep(listenerPromises, listeners[i], step, proxy);
			}

			// FIXME: Use only proxy here, caller should resolve target
			return chain(whenAll(listenerPromises), promise, proxy.target);
		}

		function processStep(promises, processor, step, proxy, options) {
			var facet, facetPromise;

			if (processor && processor[step]) {
				facetPromise = defer();
				promises.push(facetPromise);

				facet = delegate(proxy);
				facet.options = options;
				processor[step](facetPromise.resolver, facet, pluginApi);
			}
		}

		//
		// Built-in Factories
		//

		/**
		 * Factory that loads an AMD module
		 *
		 * @param resolver {Resolver} resolver to resolve with the created component
		 * @param spec {Object} portion of the spec for the component to be created
		 */
		function moduleFactory(resolver, spec /*, wire */) {
			chain(getModule(spec.module, spec), resolver);
		}

		/**
		 * Factory that uses an AMD module either directly, or as a
		 * constructor or plain function to create the resulting item.
		 *
		 * @param resolver {Resolver} resolver to resolve with the created component
		 * @param spec {Object} portion of the spec for the component to be created
		 */
		function instanceFactory(resolver, spec /*, wire */) {
			var fail, create, module, args, isConstructor, name;

			fail = chainReject(resolver);
			name = spec.id;

			create = spec.create;
			if (isStrictlyObject(create)) {
				module = create.module;
				args = create.args;
				isConstructor = create.isConstructor;
			} else {
				module = create;
			}

			// Load the module, and use it to create the object
			function handleModule(module) {
				function resolve(resolvedArgs) {
					try {
						var instantiated = instantiate(module, resolvedArgs, isConstructor);
						resolver.resolve(instantiated);
					} catch (e) {
						resolver.reject(e);
					}
				}

				try {
					// We'll either use the module directly, or we need
					// to instantiate/invoke it.
					if (isFunction(module)) {
						// Instantiate or invoke it and use the result
						if (args) {
							args = isArray(args) ? args : [args];
							when(createArray(args, name), resolve, fail);

						} else {
							// No args, don't need to process them, so can directly
							// insantiate the module and resolve
							resolve([]);

						}

					} else {
						// Simply use the module as is
						resolver.resolve(module);

					}
				} catch (e) {
					fail(e);
				}
			}

			when(getModule(module, spec), handleModule, fail);
		}
		
		/**
        * Factory that uses an AMD module either directly, or as a
        * constructor or plain function to create the resulting item.
		* In addition it also attempts to automatically resolve any items defined by
		* the creating function.
        *
        * @param resolver {Resolver} resolver to resolve with the created component
        * @param spec {Object} portion of the spec for the component to be created
        */
        function resolverFactory(resolver, spec /*, wire*/)
        {
            var fail, resolve, module, args, isConstructor, name;

            fail = chainReject(resolver);
            name = spec.id;

            resolve = spec.resolve;
            if (isStrictlyObject(resolve))
            {
                module = resolve.module;
                args = resolve.args;
                isConstructor = resolve.isConstructor;
            }
            else
            {
                module = resolve;
            }

            // Load the module, and use it to resolve the object
            function handleModule(module)
            {
                function resolve(resolvedArgs)
                {
                    try
                    {
                        var instantiated = instantiate(module, resolvedArgs, isConstructor);
                        resolver.resolve(instantiated);
                    } catch (e)
                    {
                        resolver.reject(e);
                    }
                }

                try
                {
                    // We'll either use the module directly, or we need
                    // to instantiate/invoke it.
                    if (isFunction(module))
                    {
                        // Run analyizer here
                        var analysis = resolverAnalyzer.analyzeFunction(module);
                        var params = analysis.parameters;

                        // Assumption here is that args array supplied to wire contains
                        //      enough to cover the null holes in the parameters.
                        if (args)
                        {
                            var argI = 0;
                            for (var i = 0, iLen = params.length; i < iLen; i++)
                            {
                                if (params[i] === null)
                                    params[i] = args[argI++];
                            }
                        }
                        args = params;

                        // Include resolver store here, and capture all the missing items from the spec and bring them in.

                        // Instantiate or invoke it and use the result
                        if (args)
                        {
                            args = isArray(args) ? args : [args];
                            when(createArray(args, name), resolve, fail);
                        }
                        else
                        {
                            // No args, don't need to process them, so can directly
                            // insantiate the module and resolve
                            resolve([]);

                        }

                    } else
                    {
                        // Simply use the module as is
                        resolver.resolve(module);

                    }
                } catch (e)
                {
                    fail(e);
                }
            }

            when(getModule(module, spec), handleModule, fail);
        }

		/**
		 * Factory that creates either a child context, or a *function* that will create
		 * that child context.  In the case that a child is created, this factory returns
		 * a promise that will resolve when the child has completed wiring.
		 *
		 * @param resolver {Resolver} resolver to resolve with the created component
		 * @param spec {Object} portion of the spec for the component to be created
		 */
		function wireFactory(resolver, spec/*, wire */) {
			var options, module, get, defer, waitParent;

			options = spec.wire;

			// Get child spec and options
			if (isString(options)) {
				module = options;
			} else {
				module = options.spec;
				waitParent = options.waitParent;
				defer  = options.defer;
				get    = options.get;
			}

			// Trying to use both get and defer is an error
			if(defer && get) {
				resolver.reject("you can't use defer and get at the same time");
				return;
			}

			function createChild(/** {Object|String}? */ mixin) {
				var spec = mixin ? [].concat(module, mixin) : module;
				return wireChild(spec);
			}

			if (defer) {
				// Resolve with the createChild *function* itself
				// which can be used later to wire the spec
				resolver.resolve(createChild);

			} else if (get) {
				// Wire a new scope, and get a named component from it to use
				// as the component currently being wired.
				when(loadModule(module), function(spec) {
					return when(createItem(spec, get), function(scope) {
						return doResolveRef(get, {}, scope);
					});
				}).then(resolver.resolve, resolver.reject);

			} else if(waitParent) {

				var childPromise = when(contextPromise, function() {
					return createChild();
				});

				resolver.resolve(new PromiseKeeper(childPromise));

			} else {
				resolver.resolve(createChild());

			}
		}

		//
		// Reference resolution
		//

		function resolveRef(ref, name) {
			var refName = ref.$ref;

			return doResolveRef(refName, ref, name == refName ? parent.objects : objects);
		}

		function doResolveRef(refName, refObj, scope) {
			var promise, deferred, split, resolverName;

			scope = scope || objects;

			if (refName in scope) {
				promise = scope[refName];

			} else {
				deferred = defer();
				split = refName.indexOf('!');

				if (split > 0) {
					resolverName = refName.substring(0, split);
					refName = refName.substring(split + 1);
					// Wait for modules, since the reference may need to be
					// resolved by a resolver plugin
					when(modulesReady, function () {

						var resolver = resolvers[resolverName];

						if (resolver) {
							resolver(deferred.resolver, refName, refObj||{}, pluginApi);
						} else {
							deferred.reject("No resolver found for ref: " + refName);
						}
					});

				} else {
					deferred.reject("Cannot resolve ref: " + refName);
				}

				promise = deferred.promise;
			}

			return promise;
		}

		/**
		 * Builtin reference resolver that resolves to the context-specific
		 * wire function.
		 *
		 * @param resolver {Resolver} resolver to resolve
		 */
		function wireResolver(resolver /*, name, refObj, wire*/) {
			resolver.resolve(wireApi);
		}

		//
		// Destroy
		//

		/**
		 * Destroy the current context.  Waits for the context to finish
		 * wiring and then immediately destroys it.
		 *
		 * @return {Promise} a promise that will resolve once the context
		 * has been destroyed
		 */
		function destroy() {
			return when(scopeReady, doDestroy, doDestroy);
		}

	} // createScope

	/**
	 * Add components in from to those in to.  If duplicates are found, it
	 * is an error.
	 * @param to {Object} target object
	 * @param from {Object} source object
	 */
	function mixinSpec(to, from) {
		for (var name in from) {
			if (from.hasOwnProperty(name) && !(name in emptyObject)) {
				if (to.hasOwnProperty(name)) {
					throw new Error("Duplicate component name in sibling specs: " + name);
				} else {
					to[name] = from[name];
				}
			}
		}

		return to;
	}

	function isRef(it) {
		return it && it.hasOwnProperty('$ref');
	}

	function isString(it) {
		return typeof it == 'string';
	}

	function isStrictlyObject(it) {
		// In IE7 tos.call(null) is '[object Object]'
		// so we need to check to see if 'it' is
		// even set
		return it && tos.call(it) == '[object Object]';
	}

	/**
	 * Standard function test
	 * @param it
	 */
	function isFunction(it) {
		return typeof it == 'function';
	}

	/**
	 * Creates a new {Array} with the same contents as array
	 * @param array {Array}
	 * @return {Array} a new {Array} with the same contents as array. If array is falsey,
	 *  returns a new empty {Array}
	 */
	function delegateArray(array) {
		return array ? [].concat(array) : [];
	}

	// In case Object.create isn't available
	function T() {
	}

	/**
	 * Object.create shim
	 * @param prototype
	 */
	function createObject(prototype) {
		var created;

		T.prototype = prototype;
		created = new T();
		T.prototype = undef;

		return created;
	}

	/**
	 * Constructor used to beget objects that wire needs to create using new.
	 * @param ctor {Function} real constructor to be invoked
	 * @param args {Array} arguments to be supplied to ctor
	 */
	function Begetter(ctor, args) {
		return ctor.apply(this, args);
	}

	/**
	 * Creates an object by either invoking ctor as a function and returning the result,
	 * or by calling new ctor().  It uses a simple heuristic to try to guess which approach
	 * is the "right" one.
	 *
	 * @param ctor {Function} function or constructor to invoke
	 * @param args {Array} array of arguments to pass to ctor in either case
	 *
	 * @returns The result of invoking ctor with args, with or without new, depending on
	 * the strategy selected.
	 */
	function instantiate(ctor, args, forceConstructor) {

		var begotten;

		if (forceConstructor || isConstructor(ctor)) {
			Begetter.prototype = ctor.prototype;
			Begetter.prototype.constructor = ctor;
			begotten = new Begetter(ctor, args);

			Begetter.prototype = undef;

		} else {
			begotten = ctor.apply(null, args);

		}

		return begotten;
	}

	/**
	 * Determines whether the supplied function should be invoked directly or
	 * should be invoked using new in order to create the object to be wired.
	 *
	 * @param func {Function} determine whether this should be called using new or not
	 *
	 * @returns true iff func should be invoked using new, false otherwise.
	 */
	function isConstructor(func) {
		var is = false, p;
		for (p in func.prototype) {
			if (p !== undef) {
				is = true;
				break;
			}
		}

		return is;
	}

	/**
	 * Special object to hold a Promise that should not be resolved, but
	 * rather should be passed through a promise chain *as the resolution value*
	 * @param val
	 */
	function PromiseKeeper(val) {
		this.value = val;
	}

	/**
	 * If it is a PromiseKeeper, return it.value, otherwise return it.  See
	 * PromiseKeeper above for an explanation.
	 * @param it anything
	 */
	function getResolvedValue(it) {
		return it instanceof PromiseKeeper ? it.value : it;
	}

	return wire;
});
})(this,
	typeof define == 'function'
	// use define for AMD if available
	? define
	// Browser
	// If no define or module, attach to current context.
	: typeof module != 'undefined'
		? function(deps, factory) {
			module.exports = factory.apply(this, [require].concat(deps.slice(1).map(function(x) {
				return require(x);
			})));
		}
		: function(deps, factory) {
			this.wire = factory(
				// Fake require()
				function(modules, callback) { callback(modules); },
				// dependencies
				this.when, this.wire_base
			);
	}
);
define('wire', ['wire/wire'], function (main) { return main; });

define('thrust/main',[
    'thrust/log', 'thrust/util', 'thrust/config', './ignite', 'thrust/module', 'domReady', 'wire', 'module'
],
function (log, util, tConfig, igniteSpec, Module, domReady, wire, module)
{
    /**
        The thrust application!

    @module thrust
    @main thrust
    **/
    

    var INIT = 'init',
        START = 'start',
        READY = 'ready',
        STOP = 'stop',
        DESTROY = 'destroy',
        COUNTDOWN = 'countdown',
        IGNITE = 'ignite',
        ORBIT = 'orbit',
        DEORBIT = 'deorbit',
        SPLASHDOWN = 'splashdown',
        memoize = util.memoize,
        when = util.when,
        type = util.type,
        slice = Array.prototype.slice,
        format = util.format;

    var timeStart = new Date().getTime();

    util.deepCopy(tConfig, module.config());

    /**
        The primary thrust class.
    
    @class Thrust
    @constructor
    @param {String} name The name of this thrust instance
    @returns {Thrust}
    **/
    var Thrust = function (/* $ref */ name)
    {
        this.name = name;
        this.modules = {};
        log.info(name);
    };

    //#region Runner Factories
    var runRunnerFactory, runnerFactory, allRunnerFactory;
    runRunnerFactory = memoize(function (method)
    {
        var conventionMethod = (method === STOP && START) || (method === DESTROY && INIT) || method,
            conventionValue = !(method === STOP || method === DESTROY),
            unsetReady = method === STOP,
            conventionCheck = conventionMethod !== method,
            conventionName = '{0}-status'.format(conventionMethod),
            runner = runnerFactory(method, conventionName, conventionValue, unsetReady),
            logMessage = ('Core: {0}ing module "{{0}}" failed!'.format());

        return function (name)
        {
            var that = this,
                mod = that.modules[name],
                args = slice.call(arguments, 1);

            if ((conventionCheck && mod.convention(conventionName)) || !mod.convention(conventionName))
            {
                if (tConfig.throwErrors)
                {
                    return runner(that, name, mod, args);
                }
                else
                {
                    try
                    {
                        return runner(that, name, mod, args);
                    }
                    catch (e)
                    {
                        log.error(format(logMessage, name), e, e.stack);
                    }
                }
            }
        };
    });

    runnerFactory = memoize(function (method, conventionName, conventionValue, unsetReady)
    {
        var eventName = 'thrust-module-{0}'.format(method),
            infoFormat = 'Thrust: {0}ing module "{{0}}"'.format(method.charAt(0).toUpperCase() + method.substring(1)),
            debugFormat = 'Thrust: Calling module "{{0}}" {0}()'.format(method),
            compAfter = method === STOP || method === DESTROY || false;

        return function (that, name, mod, args)
        {
            log.info(format(infoFormat, name));
            log.debug(format(conventionName, name));
            return when.all(mod.coreCall(method, compAfter, args)).then(function ()
            {
                that.core.fire(eventName, name);
                mod.convention(conventionName, conventionValue);
                if (unsetReady) mod.convention(READY + '-status', false);
            });
        };
    });

    allRunnerFactory = memoize(function (method)
    {
        var infoFormat = 'Thrust: {0}ing all autoStart modules...'.format(method.charAt(0).toUpperCase() + method.substring(1)),
            pluralName = 'thrust-{0}ing'.format(method),
            checkAutoStart = method === INIT || method === START;

        return function (that)
        {
            log.info(infoFormat);
            that.core.fire(pluralName);
            var modules = that.modules,
                results = [];

            util.each(modules, function(x, i)
            {
                if (!checkAutoStart || (checkAutoStart && x.convention('autoStart')))
                    results.push(that[method](i));
            });

            return results;
        };
    });
    //#endregion
    
    Thrust.prototype = Thrust.fn = {
        /**
            Required methods, that every module must implement.
    
        @property __requiredMethods
        @protected
        **/
        __requiredMethods: [     // Required methods that must be on every module
            'init',
            'destroy'
        ],
        /**
            Creates a new thrust module.

        @method create
        @param {String} name The unique module name.
        @param {Object} module The module defintion.
        @param {Boolean} preBuild Has this module been prebuilt, in other words has it been created, by wire.js and needs to be injected.
        @returns {Module} The new module instance.
        **/
        create: function (name, module, preBuilt)
        {
            log.debug(util.format('Thrust: Creating new instance of "{0}"', name));

            var oldModule;
            if (preBuilt)
            {
                oldModule = module;
                module = module.instance;
            }

            if (!preBuilt)
                module = new Module(this, module, name);
            else
                module = oldModule;

            // Modules cannot have duplicate names, choose a new one.
            if (this.modules[module.name])
                throw new Error('Duplicate module name "{0}".'.format(name));

            // m is the cores internal module.
            this.modules[module.name] = module;

            log.info(util.format('Core: Created module "{0}"', name));
            // Notify the core that a module has been created.
            this.core.fire('thrust-module-create', name);

            if (this.core.started && module.convention('autoStart'))
                this.core.start(module.name);

            return module;
        },
        //#region Global Runners
        /**
            Begins the countdown to thrusts start.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method countdown
        @async
        @returns {Promise} The promise of when the countdown is completed.
        **/
        countdown: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                util.safeInvoke(that.__conventions, COUNTDOWN, that),
                that.init()
            ]))
                .then(function () { that.core.fire('thrust-inited'); })
                .then(that.ignite.bind(that));
        },
        /**
            Begins the ingition as thrust starts up.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method ignite
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        ignite: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                util.safeInvoke(that.__conventions, IGNITE, that),
                that.start()
            ]))
                .then(function () { that.core.fire('thrust-started'); })
                .then(that.orbit.bind(that));
        },
        /**
            Thrust prepares for orbit.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method orbit
        @async
        @returns {Promise} The promise of when thrust is in orbit.
        **/
        orbit: function ()
        {
            var that = this;

            var domReadyDefer = when.defer();
            domReadyDefer.then(function () { that.core.fire('thrust-dom-ready'); });
            domReady(function () { domReadyDefer.resolve(); });

            return util.when.all(util.flatten([
                domReadyDefer.promise,
                util.safeInvoke(that.__conventions, ORBIT, that),
                that.ready()
            ]))
                .then(function () { that.core.fire('thrust-ready'); })
                .then(that.inOrbit.bind(that));
        },
        inOrbit: function ()
        {
            var that = this;

            var timeEnd = new Date().getTime();

            that.started = true;

            //alert('Started in ' + (timeEnd - timeStart) + 'ms');
            log.info('Started in ' + (timeEnd - timeStart) + 'ms');
        },
        /**
            Begins the deorbit as thrust shutdown.
            Shutdown can be deferred by returning a promise from any convention, or module method.

        @method deorbit
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        deorbit: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                that.stop(),
                util.safeInvoke(that.__conventions, DEORBIT, that)
            ]))
                .then(function () { that.core.fire('thrust-stopped'); })
                .then(that.orbit.bind(that));
        },
        /**
            Begins the splashdown as thrust shutdown.
            Shutdown can be deferred by returning a promise from any convention, or module method.

        @method splashdown
        @async
        @returns {Promise} The promise of when the ingition is completed.
        **/
        splashdown: function ()
        {
            var that = this;
            return util.when.all(util.flatten([
                that.stop(),
                util.safeInvoke(that.__conventions, SPLASHDOWN, that)
            ]))
                .then(function () { that.core.fire('thrust-destroyed'); })
                .then(that.orbit.bind(that));
        },
        //#endregion
        //#region Module runners
        /**
            Begins the initalization process for a module.  This runs as part of the
                countdown phase, during start up, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method init
        @param {String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be inited.
        @returns {Promise} The promise of when the init is completed.
        **/
        init: memoize(function (name)
        {
            var that = this, method = INIT;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            return when.all(util.flatten(runRunnerFactory(method).apply(that, arguments)));
        }),
        /**
            Begins the startup process for a module.  This runs as part of the
                ignite phase, during start up, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method start
        @param {String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        start: function (name)
        {
            var that = this, method = START;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            var items = [],
                mod = that.modules[name];

            if (!mod.convention(INIT + '-status'))
            {
                items.push(that.init.apply(that, arguments));
            }

            items.push(runRunnerFactory(method).apply(that, arguments));

            if (that.started)
            {
                items.push(that.ready.apply(that, arguments));
            }

            return when.all(util.flatten(items));
        },
        /**
            Begins the ready process for a module.  This runs as part of the
                orbit phase, during ready, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method ready
        @param {String} [name] The name of the module.  If name is null, all modules
            that return the property autoStart will be started.
        @returns {Promise} The promise of when the init is completed.
        **/
        ready: function (name)
        {
            var that = this, method = READY;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            var items = [],
                mod = that.modules[name];
            if (!mod.convention(START + '-status'))
            {
                items.push(that.start.apply(that, arguments));
            }

            items.push(runRunnerFactory(method).apply(that, arguments));

            return when.all(util.flatten(items));
        },
        /**
            Begins the stop process for a module.  This runs as part of the
                deorbit phase, during stop, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method stop
        @param {String} [name] The name of the module.  If name is null, all modules
            will be stopped.
        @returns {Promise} The promise of when the stop is completed.
        **/
        stop: function (name)
        {
            var that = this, method = STOP;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            return util.flatten(runRunnerFactory(method).apply(that, arguments));
        },
        /**
            Begins the destroy process for a module.  This runs as part of the
                slashdown phase, during destroy, or in order, when creating modules.
            Loading can be deferred by returning a promise from any convention, or module method.

        @method destroy
        @param {String} [name] The name of the module.  If name is null, all modules
            will be destroyed.
        @returns {Promise} The promise of when the destroy is completed.
        **/
        destroy: function (name)
        {
            var that = this, method = DESTROY;

            var result = !name && allRunnerFactory(method)(that);
            if (result)
                return result;

            if (!module.convention(STOP + '-status'))
            {
                this.stop.apply(that, arguments);
            }

            return util.flatten(runRunnerFactory(method).apply(that, arguments));
        },
        //#endregion
        /**
            Injects a preconstructed module into the thrust instance.

        @method __injectModule
        @private
        @param {Module} module The module to inject.
        **/
        __injectModule: function (module)
        {
            this.create(module.name, module, true);
        },
        /**
        Creates a module from the given definition object, with the given name.

        @method createModule
        @param {String} name The module name
        @param {Object} moduleDefn The module definition
        **/
        createModule: function (name, moduleDefn)
        {
            var that = this;
            if (that.modules[name]) return that.modules[name];

            var module = new Module(that, moduleDefn, name);

            that.__injectModule(module);

            return module;
        }
    };

    var instances = {};
    /**
        Initalizes a new Thrust instance based on the given settings.

    @method launch
    @static
    @param {Object} settings The module to inject
    **/
    Thrust.launch = function (settings)
    {
        var setupDefer = util.when.defer();

        setupDefer.then(function (context)
        {
            var thrust = context.thrust;
            instances[thrust.name] = thrust;
            thrust.config = settings;
            thrust.countdown();

            return context;
        })
        .then(function (context)
        {
            window.thrust = context.thrust;
        });

        wire(igniteSpec(settings)).then(setupDefer.resolve);

        return setupDefer.promise;
    };

    /**
    Gets a named thrust stance if it exists.

    @method getInstance
    @static
    @param {String} name The instance name
    **/
    Thrust.getInstance = function (name)
    {
        return instances[name] || false;
    };

    /**
    Creates a new module and hands it off to the given instance, if that instance exists.

    @method createModule
    @static
    @param {String} instanceName The thrust instance name
    @param {String} name The module name
    @param {Object} moduleDefn The module definition
    **/
    Thrust.createModule = function (instanceName, name, moduleDefn)
    {
        var instance = Thrust.getInstance(instanceName);
        if (instance)
        {
            var module = new Module(that, moduleDefn, name);
            instance.__injectModule(module);
            return module;
        }
    };

    return Thrust;
});

define('thrust', ['thrust/main'], function (main) { return main; });

/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * aop
 * Aspect Oriented Programming for Javascript
 *
 * aop is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 0.5.3
 */
(function (define) {
define('aop',[],function () {

	var ap, prepend, append, slice, isArray, freeze;

	freeze = Object.freeze || function (o) { return o; };

	ap      = Array.prototype;
	prepend = ap.unshift;
	append  = ap.push;
	slice   = ap.slice;

	isArray = Array.isArray || function(it) {
		return Object.prototype.toString.call(it) == '[object Array]';
	};

	/**
	 * Helper to convert arguments to an array
	 * @param a {Arguments} arguments
	 * @return {Array}
	 */
	function argsToArray(a) {
		return slice.call(a);
	}

	function forEach(array, func) {
		for (var i = 0, len = array.length; i < len; ++i) {
			func(array[i]);
		}
	}

	function forEachReverse(array, func) {
		for (var i = array.length - 1; i >= 0; --i) {
			func(array[i]);
		}
	}

	var iterators = {
		   // Before uses reverse iteration
		   before: forEachReverse
	   };

	// All other advice types use forward iteration
	// Around is a special case that uses recursion rather than
	// iteration.  See Advisor._callAroundAdvice
	iterators.on
		= iterators.afterReturning
		= iterators.afterThrowing
		= iterators.after
		= forEach;

	function proceedAlreadyCalled() { throw new Error("proceed() may only be called once"); }

	function Advisor(target, func) {

		var orig, advisor, advised;

		this.target = target;
		this.func = func;
		   this.aspects = [];

		orig = this.orig = target[func];
		advisor = this;

		advised = this.advised = function() {
			var context, args, result, afterType, exception;

			   context = this;

			function callOrig(args) {
				var result = orig.apply(context, args);
				advisor._callSimpleAdvice('on', context, args);

				return result;
			}

			function callAfter(afterType, args) {
				advisor._callSimpleAdvice(afterType, context, args);
			}

			args = argsToArray(arguments);
			afterType = 'afterReturning';

			advisor._callSimpleAdvice('before', context, args);

			try {
				result = advisor._callAroundAdvice(context, func, args, callOrig);
			} catch(e) {
				result = exception = e;
				   // Switch to afterThrowing
				afterType = 'afterThrowing';
			   }

			args = [result];

			callAfter(afterType, args);
			callAfter('after', args);

			if(exception) {
				throw exception;
			}

			return result;
		};

		advised._advisor = this;
	}

	Advisor.prototype = {

		   /**
			* Invoke all advice functions in the supplied context, with the supplied args
			*
			* @param adviceType
			* @param context
			* @param args
			*/
		_callSimpleAdvice: function(adviceType, context, args) {

			// before advice runs LIFO, from most-recently added to least-recently added.
			// All other advice is FIFO
			var iterator = iterators[adviceType];

			   iterator(this.aspects, function(aspect) {
				   var advice = aspect[adviceType];
				   advice && advice.apply(context, args);
			   });
		},

		/**
		 * Invoke all around advice and then the original method
		 *
		 * @param context
		 * @param method
		 * @param args
		 * @param orig
		 */
		_callAroundAdvice: function (context, method, args, orig) {
			var len, aspects;

			aspects = this.aspects;
			len = aspects.length;

			/**
			 * Call the next function in the around chain, which will either be another around
			 * advice, or the orig method.
			 * @param i {Number} index of the around advice
			 * @param args {Array} arguments with with to call the next around advice
			 */
			function callNext(i, args) {
				var aspect;
				// Skip to next aspect that has around advice
				while (i >= 0 && (aspect = aspects[i]) && typeof aspect.around !== 'function') --i;

				// If we exhausted all aspects, finally call the original
				// Otherwise, if we found another around, call it
				return (i < 0) ? orig.call(context, args) : callAround(aspect.around, i, args);
			}

			function callAround(around, i, args) {
				var proceed, joinpoint;

				/**
				 * Create proceed function that calls the next around advice, or the original.  Overwrites itself so that it can only be called once.
				 * @param [args] {Array} optional arguments to use instead of the original arguments
				 */
				proceed = function (args) {
					proceed = proceedAlreadyCalled;
					return callNext(i - 1, args);
				};

				// Joinpoint is immutable
				joinpoint = freeze({
					target: context,
					method: method,
					args: args,
					proceed: function (/* newArgs */) {
						// if new arguments were provided, use them
						return proceed(arguments.length > 0 ? argsToArray(arguments) : args);
					}
				});

				// Call supplied around advice function
				return around.call(context, joinpoint);
			}

			return callNext(len - 1, args);
		},

		/**
		 * Adds the supplied aspect to the advised target method
		 *
		 * @param aspect
		 */
		add: function(aspect) {

			var aspects, advisor;

			advisor = this;
			aspects = advisor.aspects;

			aspects.push(aspect);

			return {
				remove: function () {
					for (var i = aspects.length; i >= 0; --i) {
						if (aspects[i] === aspect) {
							aspects.splice(i, 1);
							break;
						}
					}

					// If there are no aspects left, restore the original method
					if (!aspects.length) {
						advisor.remove();
					}
				}
			};
		},

		/**
		 * Removes the Advisor and thus, all aspects from the advised target method, and
		 * restores the original target method, copying back all properties that may have
		 * been added or updated on the advised function.
		 */
		remove: function () {
			delete this.advised._advisor;
			this.target[this.func] = this.orig;
		}
	};

	// Returns the advisor for the target object-function pair.  A new advisor
	// will be created if one does not already exist.
	Advisor.get = function(target, func) {
		if(!(func in target)) return;

		var advisor, advised;

		advised = target[func];

		if(typeof advised !== 'function') throw new Error('Advice can only be applied to functions: ' + func);

		advisor = advised._advisor;
		if(!advisor) {
			advisor = new Advisor(target, func);
			target[func] = advisor.advised;
		}

		return advisor;
	};

	function addAspectToMethod(target, method, aspect) {
		var advisor = Advisor.get(target, method);

		return advisor && advisor.add(aspect);
	}

	function addAspectToAll(target, methodArray, aspect) {
		var removers, added, f, i;

		removers = [];
		i = 0;
		while((f = methodArray[i++])) {
			   added = addAspectToMethod(target, f, aspect);
			   added && removers.push(added);
		}

		return {
			   remove: function() {
				   for (var i = removers.length - 1; i >= 0; --i) {
					   removers[i].remove();
				   }
			   }
		   };
	   }

	function addAspect(target, pointcut, aspect) {
		// pointcut can be: string, Array of strings, RegExp, Function(targetObject): Array of strings
		// advice can be: object, Function(targetObject, targetMethodName)

		var pointcutType, remove;

		   target = findTarget(target);

		if (isArray(pointcut)) {
			remove = addAspectToAll(target, pointcut, aspect);

		} else {
			pointcutType = typeof pointcut;

			if (pointcutType === 'string') {
				if (typeof target[pointcut] === 'function') {
					remove = addAspectToMethod(target, pointcut, aspect);
				}

			} else if (pointcutType === 'function') {
				remove = addAspectToAll(target, pointcut(target), aspect);

			} else {
				// Assume the pointcut is a RegExp
				for (var p in target) {
					// TODO: Decide whether hasOwnProperty is correct here
					// Only apply to own properties that are functions, and match the pointcut regexp
					if (typeof target[p] === 'function' && pointcut.test(p)) {
						// if(object.hasOwnProperty(p) && typeof object[p] === 'function' && pointcut.test(p)) {
						remove = addAspectToMethod(target, p, aspect);

					}
				}

			}
		}

		return remove;

	}

	function findTarget(target) {
		return target.prototype || target;
	}

	// Create an API function for the specified advice type
	function adviceApi(type) {
		return function(target, func, adviceFunc) {
			var aspect = {};
			aspect[type] = adviceFunc;

			return addAspect(target, func, aspect);
		};
	}

	// Public API
	return {
		// General add aspect
		// Returns a function that will remove the newly-added aspect
		add:            addAspect,

		// Add a single, specific type of advice
		// returns a function that will remove the newly-added advice
		before:         adviceApi('before'),
		around:         adviceApi('around'),
		on:             adviceApi('on'),
		afterReturning: adviceApi('afterReturning'),
		afterThrowing:  adviceApi('afterThrowing'),
		after:          adviceApi('after')
	};

});
})(typeof define == 'function'
	? define
	: function (factory) {
	typeof module != 'undefined'
		? (module.exports = factory())
		: (this.aop = factory());
	}
	// Boilerplate for AMD, Node, and browser global
);

define('thrust/convention',[
    'thrust/util'
],
function (util)
{
    /**
        A Convention allows thrust to be as extendable as possible, by giving extension points at every step along the way.

    @module thrust
    @submodule convention
    **/

    /**
        The convention class, takes an overloaded set of methods, for any method that needs to be overloaded.

    @class Convention
    @constructor
    @param {Object} methods An object of applicable methods.
    **/
    var Convention = function (methods)
    {
        if (!(this instanceof Convention))
            return new Convention(methods);

        util.extend(this, methods);
    };

    Convention.fn = Convention.prototype = {
        /**
            These properties are stripped off of any module, and held in a private space for other convention methods to use.
        @property properties
        @optional
        **/
        properties: [],
        /**
            This is called during create of a module, generally used to create a facade, that is then bound to the module.
        @method create
        @optional
        @param {Thrust} thrust The thrust instance.
        @param {Module} module The module instance.
        @param {Object} facades All the facades already attached to the module.
        **/
        create: util.noop,
        /**
            This method is called during the thrust init phase, or an individual module's init phase

        @method init
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        init: util.noop,
        /**
            This method is called during the thrust start phase, or an individual module's start phase

        @method start
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        start: util.noop,
        /**
            This method is called during the thrust ready phase, or an individual module's ready phase

        @method ready
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ready: util.noop,
        /**
            This method is called during the thrust stop phase, or an individual module's stop phase

        @method stop
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        stop: util.noop,
        /**
            This method is called during the thrust destroy phase, or an individual module's destroy phase

        @method destroy
        @optional
        @param {Object} facades The facades for the module.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        destroy: util.noop,
        /**
            This is called during the init phase of a Thrust instance.
        @method countdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        countdown: util.noop,
        /**
            This is called during the start phase of a Thrust instance.
        @method ignite
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        ignite: util.noop,
        /**
            This is called during the ready phase of a Thrust instance.
        @method orbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        orbit: util.noop,
        /**
            This is called during the stop phase of a Thrust instance.
        @method deorbit
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        deorbit: util.noop,
        /**
            This is called during the destroy phase of a Thrust instance.
        @method splashdown
        @optional
        @param {Thrust} thrust The thrust instance.
        @returns {Promise} A promise may be returned, to delay the next phase from begining.
        **/
        splashdown: util.noop
    };

    return Convention;
});
define('thrust/events',[
    'thrust/util', 'thrust/log', 'thrust/config'
],
function (util, log, tConfig)
{
    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @module thrust
    @submodule Events
    **/

    
    //     Backbone.js 0.9.1
    //     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Backbone may be freely distributed under the MIT license.
    //     For all details and documentation:
    //     http://backbonejs.org

    var slice = Array.prototype.slice,
        format = util.format,
        asyncFire,
        when = util.when,
        size = util.size,
        each = util.each,
        extend = util.extend;

    var eventSplitter = /\s+/, _trigger, triggerCallback, triggerAsyncCallback, triggerNodes, ALL = 'all', STARALL = '*all', normalizeEvents, getNamespaceData, _offProcessNode;
    /**
    Normalizes the given events to the expected namespace.

    @method normalizeEvents
    @private
    @param {String} events The events delimited by a space
    @param {String} namespace The namespace, including prefixed '.'
    **/
    normalizeEvents = function (events, namespace)
    {
        events = events.split(eventSplitter);
        for (var i = 0, iLen = events.length; i < iLen; i++)
        {
            events[i] = events[i] + namespace;
        }
        return events.join(' ');
    };

    /**
    Trigger one or many events, firing all bound callbacks. Callbacks are
    passed the same arguments as `trigger` is, apart from the event name
    (unless you're listening on `"all"`, which will cause your callback to
    receive the true name of the event as the first argument).

    @method _trigger
    @private
    @param {Boolean} async Fire event async or sync
    @param {Object} events The events to be fired.
        delimited by a space.
    @param [args]* The arguments to pass onto the callback methods.
    @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
             If sync then returns an array of the return values.
             If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    _trigger = function (async, events)
    {
        var that = this, event, node, calls, tail, args, all, rest, namespace, rVals = {}, rVal, onceNodes;
        if (!(calls = this._callbacks)) return that;
        all = calls.all;
        events = events.split(eventSplitter);
        rest = slice.call(arguments, 2);

        while (event = events.shift())
        {
            if (node = calls[event])
            {
                rVal = triggerNodes(that, event, async, node, rest);
                rVals[event] = async ? when.all(rVal) : rVal;
            }
            if (node = all)
            {
                triggerNodes(that, ALL, async, node, [event].concat(rest));
            }
        }

        if (size(rVals) === 1)
            for (var i in rVals)
                return rVals[i];
        return rVals;
    };

    /**
    Triggers all events on a node.
    Also unbinds any node that is set to only be called once.

    @method triggerNodes
    @private
    @param {Object} that The event container context.
    @param {String} event The event to be bound or unbound.
    @param {Boolean} async Fire event async or sync
    @param {Object} node The node linked list.
    @param {Array} args The arguments to pass onto the triggered nodes

    **/
    triggerNodes = function (that, event, async, nodeList, args)
    {
        var tail, rVals = [], onceNodes = [];

        each(nodeList, function (node)
        {
            tail = node.tail;
            while ((node = node.next) !== tail)
            {
                rVals.push(triggerCallback(async, node.callback, node.context || that, args));
                node.once && onceNodes.push(node);
            }
        });
        if (onceNodes.length) each(onceNodes, function (x) { that.unsubscribe(event, x.callback, x.context, x.namespace); });

        return rVals;
    };

    /**
    Invokes a trigger callback

    @method triggerCallback
    @private
    @param {Boolean} async Fire event async or sync
    @param {Function} callback The callback method
    @param {Object} context The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Object} The returned value.
        For async calls, this is a promise
        For sync calls this is the value from the method.
    **/
    triggerCallback = function (async, callback, context, args)
    {
        if (async)
        {
            return when.delay(0).then(triggerAsyncCallback(callback, context, args));
        }
        else
        {
            try { return callback.apply(context, args); }
            catch (e) { if (tConfig.throwErrors) throw e; }
        }
    };

    /**
    Creates an async event handler

    @method asyncEventFactory
    @private
    @param {Function} callback The callback method
    @param {Object} that The calling context
    @param {Array} args The arguments to call the callback with.
    @returns {Function} The callback for the given arguments.
    **/
    triggerAsyncCallback = function (callback, context, args)
    {
        return function ()
        {
            return callback.apply(context, args);
        };
    };

    /**
    Resubscribes to the appropriate events

    @method _offProcessNode
    @private
    @param {Object} that The event context
    @param {String} event The event
    @param {Object} node The node linked list.
    @param {Function} [callback] The event callback to unsubscribe
    @param {Object} [context] The event context to unsubscribe
    @param {String} [namespace] The namespace to unsubscribe
    **/
    _offProcessNode = function (that, event, node, callback, context)
    {
        var tail, cb, ctx, ns;
        tail = node.tail;
        while ((node = node.next) !== tail)
        {
            cb = node.callback;
            ctx = node.context;
            ns = node.namespace;
            if ((callback && cb !== callback) || (context && ctx !== context))
            {
                that.subscribe(event + (ns && ('.' + ns) || ''), cb, ctx);
            }
        }
    };

    /**
    Gets the namespace information, the real event to pass back onto the methods.

    @method getNamespaceData
    @private
    @param {String} event The event to capture namespace data from.
    @returns {Object} Containing event and namespace.
    **/
    getNamespaceData = function(event)
    {
        var nsIndex = (event || '').indexOf('.'),
            hasNs = nsIndex > -1,
            namespace = hasNs ? event.substring(nsIndex + 1) : undefined,
            event = hasNs ? event.substring(0, nsIndex) : event;

        if (nsIndex === 0)
            event = STARALL;

        return { event: event, namespace: namespace };
    };

    /**
    Thrust Events are based off of the Backbone event model, with special additions.

    * Events can be fired asyncronously.
    * Events can be namespaced.

    @class Events
    **/
    var Events = {
        /**
        Bind one or more space separated events, `events`, to a `callback`
        function. Passing `"all"` will bind the callback to all events fired.

        @method subscribe
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @param {Boolean} once Call this event only once.
        @chainable
        **/
        subscribe: function (events, callback, context, once)
        {
            var calls, event, node, tail, list, nd;
            this.__namespace && (events = normalizeEvents(events, this.__namespace));

            events = events.split(eventSplitter);
            calls = this._callbacks || (this._callbacks = {});

            // Create an immutable callback list, allowing traversal during
            // modification.  The tail is an empty object that will always be used
            // as the next node.
            while (event = events.shift())
            {
                nd = getNamespaceData(event);
                event = nd.event;
                list = calls[event] || (calls[event] = {});
                list = list[nd.namespace];
                node = list ? list.tail : {};
                node.next = tail = {};
                node.context = context;
                node.callback = callback;
                node.namespace = nd.namespace;
                node.once = once;
                calls[event][nd.namespace] = { tail: tail, next: list ? list.next : node };
            }

            return this;
        },
        /**
        Bind one or more space separated events, `events`, to a `callback`
        function. Passing `"all"` will bind the callback to all events fired.

        Each event will only be called once.

        @method once
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @chainable
        **/
        once: function (events, callback, context)
        {
            return this.subscribe(events, onceCallback, context, true);
        },
        /**
        Remove one or many callbacks. If `context` is null, removes all callbacks
        with that function. If `callback` is null, removes all callbacks for the
        event. If `event` is null, removes all bound callbacks for all events.

        @method unsubscribe
        @param {String} events Spave seperated events
        @param {Function} callback The callback method to be called when the events are fired.
        @param {Object} context The context to bind the calling function to.
        @chainable
        **/
        unsubscribe: function (events, callback, context)
        {
            var event, calls, node, nd, ourNs, namespace, that = this, hasNs;

            ourNs = that.__namespace; ourNs && (ourNs = ourNs.substring(1));
            // No events, or removing *all* events.
            if (!(calls = that._callbacks)) return;
            if (!(events || callback || context))
            {
                if (!ourNs)
                    delete that._callbacks;
                else
                {
                    var cbs = that._callbacks;
                    for (var i in cbs)
                    {
                        delete cbs[i][ourNs];
                        if (size(cbs[i]) === 0) delete cbs[i];
                    }
                }
                return that;
            }

            // Loop through the listed events and contexts, splicing them out of the
            // linked list of callbacks if appropriate.
            ourNs && (events = normalizeEvents(events, that.__namespace));
            events = events ? events.split(eventSplitter) : _.keys(calls);
            while (event = events.shift())
            {
                nd = getNamespaceData(event);
                event = nd.event;
                namespace = nd.namespace;
                hasNs = !!namespace;
                if (!ourNs)
                {
                    node = calls[event];
                    delete calls[event];
                }
                else if (calls[event])
                {
                    node = calls[event][ourNs];
                    delete calls[event][ourNs];
                    if (size(calls[event]) === 0) delete calls[event];
                }
                if (!node || !(callback || context)) continue;

                /*if (event !== STARALL)
                {
                    node = calls[event];
                    delete calls[event];
                    if (!node) continue;
                }*/
                if (event !== STARALL && !callback)
                {
                    _offProcessNode(that, event, node, callback, context);
                }
                else if (event === ALL || !callback)
                {
                    for (var i in calls)
                    {
                        if (hasNs)
                        {
                            delete calls[i];
                        }
                        else
                        {
                            node = calls[i];
                            delete calls[i];
                            _offProcessNode(that, i, node, callback, context);
                        }
                    }
                }
                else
                {
                    _offProcessNode(that, event, node, callback, context);
                }
            }
            return that;
        },
        /**
            Trigger one or many events, firing all bound callbacks. Callbacks are
            passed the same arguments as `trigger` is, apart from the event name
            (unless you're listening on `"all"`, which will cause your callback to
            receive the true name of the event as the first argument).
        
            @method fire
            @param {Object} events The events to be fired.
                delimited by a space.
            @param [args]* The arguments to pass onto the callback methods.
            @returns {Array of Values} If more than on event is fired, an Object of Arrays is returned.
        **/
        fire: function (events)
        {
            return _trigger.apply(this, [false].concat(slice.call(arguments)));
        },
        __pubSubName: 'Events',
        /**
        Init's the Event module.
        This is only required if you wish to use fire.async, and namespacing.

        @method initEvents
        @chainable
        **/
        initEvents: function ()
        {
            this.publish = this.fire = Events.fire.bind(this);
            this.fire.async = asyncFire.bind(this);
            this.initEvents = null;
            this.__pubSubName = this.name || 'Events';
            if (this.name && !this.__namespace) this.__namespace = '.' + this.name;

            return this;
        },
        /**
        Extends Events into the given object.

        @method extend
        @param {Object} to The object ot extend events onto
        @param {Boolean} [init] Optionally init the events.
        **/
        extend: function (to, init)
        {
            extend(to, Events);
            delete to.extend;
            init && to.initEvents();
        }
    };

    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        fire.async runs its events immediately.
    
        @method fire.async
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @async
        @returns {Array of Promise} If more than on event is fired, an Object of Promise Arrays is returned.
    **/
    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        publish.async runs its events immediately.
        publish.async is an alias for fire.
    
        @method publish.async
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @async
        @returns {Array of Promise} If more than on event is fired, an Object of Promise Arrays is returned.
    **/
    asyncFire = function (events)
    {
        return _trigger.apply(this, [true].concat(slice.call(arguments)));
    };

    /**
        Trigger one or many events, firing all bound callbacks. Callbacks are
        passed the same arguments as `trigger` is, apart from the event name
        (unless you're listening on `"all"`, which will cause your callback to
        receive the true name of the event as the first argument).

        publish is an alias for fire.
    
        @method publish
        @param {Object} events The events to be fired.
            delimited by a space.
        @param [args]* The arguments to pass onto the callback methods.
        @returns If async then returns a Promise, where the first argument contains all the returned values, as an array
                 If sync then returns an array of the return values.
                 If more than one event, returns an object of arrays or promises, with the key for each event.
    **/
    Events.publish = Events.fire;

    return Events;
});

define('thrust/facade',[
    'thrust/util'
],
function (util)
{
    /**

    The Facade module offers the ability to create an interface or similar concept.
    With the Facade in thrust, it allows you to capture events from a module, when loaded via convention.
    Facades are mainly for use in thrust plugins.

    @module thrust
    @submodule Facade
    **/

    /**
    Facades are mainly for use in thrust plugins.

    Facade has these built in methods:
    * init
    * start
    * ready
    * stop
    * destroy

    Behind the scenes the facade methods, invoke any conventions loaded for the plugin.

    @class Facade
    **/

    var Facade,
        facadeMethods = ['init', 'start', 'ready', 'stop', 'destroy'],
        conventionFunctionFactory = function (name)
        {
            return function ()
            {
                var that = this;
                var returnValues = [];
                if (that.__conventions)
                {
                    return util.safeInvoke(that.__conventions, name, that, that.module);
                }
            };
        },
        methodWrap = function(method)
        {
            return function (f)
            {
                f.apply(this, arguments);
                return method.apply(this, arguments);
            };
        },
        defaultPrototype = {};


    for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
    {
        var method = facadeMethods[i];
        defaultPrototype[method] = conventionFunctionFactory(method);
    }

    /**
    Facade init

    Called during the init phase of a module startup.

    @method init
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade start

    Called during the start phase of a module startup.

    @method start
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade ready

    Called during the ready phase of a module startup.

    @method ready
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade stop

    Called during the init phase of a module startup.

    @method stop
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/

    /**
    Facade destroy

    Called during the destroy phase of a module startup.

    @method destroy
    @returns Promise any facade method may optionally return a promise to delay the start of the next phase.
    **/


    return {
        createFacade: function(initMethod)
        {
            var Facade = function (module)
            {
                initMethod.apply(this, arguments);

                for (var i = 0, iLen = facadeMethods.length; i < iLen; i++)
                {
                    var method = facadeMethods[i];
                    if (this[method] !== defaultPrototype[method])
                    {
                        this[method] = util.wrap(this[method], methodWrap(defaultPrototype[method]));
                    }
                }

                this.module = module;
                this.init();
            };

            Facade.fn = Facade.prototype = util.extend({}, defaultPrototype);
            
            return Facade;
        }
    };
});
define('thrust/core/convention/autostart',['thrust/convention'],
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
define('thrust/core/convention/container',['thrust/convention', 'thrust/util'],
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
define('thrust/core/convention/facade',['thrust/convention'],
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
define('thrust/core/convention/subscription',[
    'thrust/convention',
    'thrust/util',
    'thrust/events'
],
function (Convention, util, Events)
{
    /**
    The facade convention, creates the core facade for each module.

    @module thrust-core-convention
    **/
    var type = util.type,
        SUBSCRIPTIONS = 'subscriptions',
        FUNCTION = 'function',
        STRING = 'string',
        ARRAY = 'array';

    /**
    The subscription property defines, predefined subscriptions for a module.

    By default the context of the subscription method, when run, will be your module,
        it can be optionally defined by passing in an array.
    
    Basic usage:

        subscription: {
            'event-name1': myMethodHere,
            'event-name2': 'methodDefinedOnTheModule',
            'event-name3': [myMethodHere, myMethodContext],
            'event-name4': ['methondDefinedOnTheModule', myMethodContext]
        }

    @for thrust-core-convention
    @property subscriptions
    **/
    return new Convention({
        properties: [SUBSCRIPTIONS],
        start: function (facade)
        {
            var module = facade.module,
                subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && !subscriptions._subscriptionsSet)
            {
                var moduleInstance = module.instance;
                for (var subscription in subscriptions)
                {
                    var definition = subscriptions[subscription];
                    if (type(definition) === FUNCTION)
                    {
                        definition = [subscription, definition, moduleInstance];
                    }
                    else if (type(definition) === STRING)
                    {
                        definition = [subscription, moduleInstance[definition], moduleInstance];
                    }
                    else if (type(definition) === ARRAY)
                    {
                        if (type(definition[0]) === STRING)
                        {
                            definition[0] = moduleInstance[definition[0]];
                        }
                        definition.unshift(subscription);
                    }
                    facade.subscribe.apply(facade, definition);
                }
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = true;
            }
        },
        stop: function (facade)
        {
            var module = facade.module,
                subscriptions = module.convention(SUBSCRIPTIONS);

            if (subscriptions && subscriptions._subscriptionsSet)
            {
                module.convention(SUBSCRIPTIONS)._subscriptionsSet = false;
            }
        }
    });
});
/*!
 * jQuery JavaScript Library v1.8.0pre
 * http://jquery.com/
 *
 * Copyright (c) 2012 jQuery Foundation and other contributors
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2012, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Aug 01 2012 01:51:52 GMT-0600 (Mountain Daylight Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// IE doesn't match non-breaking spaces with \s
	rtrim = core_rnotwhite.test("\xA0") ? (/^[\s\xA0]+|[\s\xA0]+$/g) : /^\s+|\s+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.0pre",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" || ( document.readyState !== "loading" && document.addEventListener ) ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) && ( !options.unique || !self.has( arg ) ) ) {
								list.push( arg );
							} else if ( arg && arg.length ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return typeof obj === "object" ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Preliminary tests
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, window.getComputedStyle was used here
		// instead of getComputedStyle because it gave a better gzip size.
		// The difference between window.getComputedStyle and getComputedStyle is
		// 7 bytes
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}
		if ( !queue.length && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			if ( (tmp = jQuery._data( elements[ i ], type + "queueHooks" )) && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") > -1 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			// Pregenerate a single jQuery object for reuse with .is()
			jqcur = jQuery(this);
			jqcur.context = this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #xxxx)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					jqcur[0] = cur;
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = jqcur.is( sel );
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8 –
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	dirruns,
	sortOrder,
	siblingCheck,
	assertGetIdNotName,

	document = window.document,
	docElem = document.documentElement,

	strundefined = "undefined",
	hasDuplicate = false,
	baseHasDuplicate = true,
	done = 0,
	slice = [].slice,
	push = [].push,

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",
	pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
	combinators = whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*",
	groups = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + attributes + "|" + pseudos.replace( 2, 7 ) + "|[^\\\\(),])+",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcombinators = new RegExp( "^" + combinators ),

	// All simple (non-comma) selectors, excluding insignifant trailing whitespace
	rgroups = new RegExp( groups + "?(?=" + whitespace + "*,|$)", "g" ),

	// A selector, or everything after leading whitespace
	// Optionally followed in either case by a ")" for terminating sub-selectors
	rselector = new RegExp( "^(?:(?!,)(?:(?:^|,)" + whitespace + "*" + groups + ")*?|" + whitespace + "*(.*?))(\\)|$)" ),

	// All combinators and selector components (attribute test, tag, pseudo, etc.), the latter appearing together when consecutive
	rtokens = new RegExp( groups.slice( 19, -6 ) + "\\x20\\t\\r\\n\\f>+~])+|" + combinators, "g" ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "[-", "[-\\*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|nth|last|first)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"POS": new RegExp( pos, "ig" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	classCache = {},
	cachedClasses = [],
	compilerCache = {},
	cachedSelectors = [],

	// Mark a function for use in filtering
	markFunction = function( fn ) {
		fn.sizzleFilter = true;
		return fn;
	},

	// Returns a function to use in pseudos for input types
	createInputFunction = function( type ) {
		return function( elem ) {
			// Check the input's nodeName and type
			return elem.nodeName.toLowerCase() === "input" && elem.type === type;
		};
	},

	// Returns a function to use in pseudos for buttons
	createButtonFunction = function( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	},

	// Used for testing something on an element
	assert = function( fn ) {
		var pass = false,
			div = document.createElement("div");
		try {
			pass = fn( div );
		} catch (e) {}
		// release memory in IE
		div = null;
		return pass;
	},

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length ===
			// buggy browsers will return more than the correct 0
			2 + document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	}),

	// Check if the browser returns only elements
	// when doing getElementsByTagName("*")
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return div.getElementsByTagName("*").length === 0;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
			return false;
		}

		// Safari caches class attributes, doesn't catch changes (in 3.2)
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length !== 1;
	});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector, context, results, seed, xml );
};

var Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	match: matchExpr,

	order: [ "ID", "TAG" ],

	attrHandle: {},

	createPseudo: markFunction,

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var argument,
				unquoted = match[4];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Relinquish our claim on characters in `unquoted` from a closing parenthesis on
			if ( unquoted && (argument = rselector.exec( unquoted )) && argument.pop() ) {

				match[0] = match[0].slice( 0, argument[0].length - unquoted.length - 1 );
				unquoted = argument[0].slice( 0, -1 );
			}

			// Quoted or unquoted, we have the full argument
			// Return only captures needed by the pseudo filter method (type and argument)
			match.splice( 2, 3, unquoted || match[3] );
			return match;
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className ];
			if ( !pattern ) {
				pattern = classCache[ className ] = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" );
				cachedClasses.push( className );
				// Avoid too large of a cache
				if ( cachedClasses.length > Expr.cacheLength ) {
					delete classCache[ cachedClasses.shift() ];
				}
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			if ( !operator ) {
				return function( elem ) {
					return Sizzle.attr( elem, name ) != null;
				};
			}

			return function( elem ) {
				var result = Sizzle.attr( elem, name ),
					value = result + "";

				if ( result == null ) {
					return operator === "!=";
				}

				switch ( operator ) {
					case "=":
						return value === check;
					case "!=":
						return value !== check;
					case "^=":
						return check && value.indexOf( check ) === 0;
					case "*=":
						return check && value.indexOf( check ) > -1;
					case "$=":
						return check && value.substr( value.length - check.length ) === check;
					case "~=":
						return ( " " + value + " " ).indexOf( check ) > -1;
					case "|=":
						return value === check || value.substr( 0, check.length + 1 ) === check + "-";
				}
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				var doneName = done++;

				return function( elem ) {
					var parent, diff,
						count = 0,
						node = elem;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.sizset) ) {
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.sizset = ++count;
								if ( node === elem ) {
									break;
								}
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.sizset - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument, context, xml ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			var fn = Expr.pseudos[ pseudo ] || Expr.pseudos[ pseudo.toLowerCase() ];

			if ( !fn ) {
				Sizzle.error( "unsupported pseudo: " + pseudo );
			}

			// The user may set fn.sizzleFilter to indicate
			// that arguments are needed to create the filter function
			// just as Sizzle does
			if ( !fn.sizzleFilter ) {
				return fn;
			}

			return fn( argument, context, xml );
		}
	},

	pseudos: {
		"not": markFunction(function( selector, context, xml ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var matcher = compile( selector.replace( rtrim, "$1" ), context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputFunction("radio"),
		"checkbox": createInputFunction("checkbox"),
		"file": createInputFunction("file"),
		"password": createInputFunction("password"),
		"image": createInputFunction("image"),

		"submit": createButtonFunction("submit"),
		"reset": createButtonFunction("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},

	setFilters: {
		"first": function( elements, argument, not ) {
			return not ? elements.slice( 1 ) : [ elements[0] ];
		},

		"last": function( elements, argument, not ) {
			var elem = elements.pop();
			return not ? elements : [ elem ];
		},

		"even": function( elements, argument, not ) {
			var results = [],
				i = not ? 1 : 0,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"odd": function( elements, argument, not ) {
			var results = [],
				i = not ? 0 : 1,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"lt": function( elements, argument, not ) {
			return not ? elements.slice( +argument ) : elements.slice( 0, +argument );
		},

		"gt": function( elements, argument, not ) {
			return not ? elements.slice( 0, +argument + 1 ) : elements.slice( +argument + 1 );
		},

		"eq": function( elements, argument, not ) {
			var elem = elements.splice( +argument, 1 );
			return not ? elements : elem;
		}
	}
};

// Deprecated
Expr.setFilters["nth"] = Expr.setFilters["eq"];

// Back-compat
Expr.filters = Expr.pseudos;

// IE6/7 return a modified href
if ( !assertHrefNotNormalized ) {
	Expr.attrHandle = {
		"href": function( elem ) {
			return elem.getAttribute( "href", 2 );
		},
		"type": function( elem ) {
			return elem.getAttribute("type");
		}
	};
}

// Add getElementsByName if usable
if ( assertUsableName ) {
	Expr.order.push("NAME");
	Expr.find["NAME"] = function( name, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};
}

// Add getElementsByClassName if usable
if ( assertUsableClassName ) {
	Expr.order.splice( 1, 0, "CLASS" );
	Expr.find["CLASS"] = function( className, context, xml ) {
		if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
			return context.getElementsByClassName( className );
		}
	};
}

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem, results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

var isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
var contains = Sizzle.contains = docElem.compareDocumentPosition ?
	function( a, b ) {
		return !!( a.compareDocumentPosition( b ) & 16 );
	} :
	docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

Sizzle.attr = function( elem, name ) {
	var attr,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( Expr.attrHandle[ name ] ) {
		return Expr.attrHandle[ name ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( name );
	}
	attr = elem.getAttributeNode( name );
	return attr ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			attr.specified ? attr.value : null :
		null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	return (baseHasDuplicate = 0);
});


if ( docElem.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( ; (elem = results[i]); i++ ) {
				if ( elem === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
}

function handlePOSGroup( selector, posfilter, argument, contexts, seed, not ) {
	var results,
		fn = Expr.setFilters[ posfilter.toLowerCase() ];

	if ( !fn ) {
		Sizzle.error( posfilter );
	}

	if ( selector || !(results = seed) ) {
		multipleContexts( selector || "*", contexts, (results = []), seed );
	}

	return results.length > 0 ? fn( results, argument, not ) : [];
}

function handlePOS( selector, context, results, seed, groups ) {
	var match, not, anchor, ret, elements, currentContexts, part, lastIndex,
		i = 0,
		len = groups.length,
		rpos = matchExpr["POS"],
		// This is generated here in case matchExpr["POS"] is extended
		rposgroups = new RegExp( "^" + rpos.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			var i = 1,
				len = arguments.length - 2;
			for ( ; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		// Reset regex index to 0
		rpos.exec("");
		selector = groups[i];
		ret = [];
		anchor = 0;
		elements = seed;
		while ( (match = rpos.exec( selector )) ) {
			lastIndex = rpos.lastIndex = match.index + match[0].length;
			if ( lastIndex > anchor ) {
				part = selector.slice( anchor, match.index );
				anchor = lastIndex;
				currentContexts = [ context ];

				if ( rcombinators.test(part) ) {
					if ( elements ) {
						currentContexts = elements;
					}
					elements = seed;
				}

				if ( (not = rendsWithNot.test( part )) ) {
					part = part.slice( 0, -5 ).replace( rcombinators, "$&*" );
				}

				if ( match.length > 1 ) {
					match[0].replace( rposgroups, setUndefined );
				}
				elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
			}
		}

		if ( elements ) {
			ret = ret.concat( elements );

			if ( (part = selector.slice( anchor )) && part !== ")" ) {
				multipleContexts( part, ret, results, seed );
			} else {
				push.apply( results, ret );
			}
		} else {
			Sizzle( selector, context, results, seed );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}

function tokenize( selector, context, xml ) {
	var tokens, soFar, type,
		groups = [],
		i = 0,

		// Catch obvious selector issues: terminal ")"; nonempty fallback match
		// rselector never fails to match *something*
		match = rselector.exec( selector ),
		matched = !match.pop() && !match.pop(),
		selectorGroups = matched && selector.match( rgroups ) || [""],

		preFilters = Expr.preFilter,
		filters = Expr.filter,
		checkContext = !xml && context !== document;

	for ( ; (soFar = selectorGroups[i]) != null && matched; i++ ) {
		groups.push( tokens = [] );

		// Need to make sure we're within a narrower context if necessary
		// Adding a descendant combinator will generate what is needed
		if ( checkContext ) {
			soFar = " " + soFar;
		}

		while ( soFar ) {
			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				soFar = soFar.slice( match[0].length );

				// Cast descendant combinators to space
				matched = tokens.push({ part: match.pop().replace( rtrim, " " ), captures: match });
			}

			// Filters
			for ( type in filters ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match, context, xml )) ) ) {

					soFar = soFar.slice( match.shift().length );
					matched = tokens.push({ part: type, captures: match });
				}
			}

			if ( !matched ) {
				break;
			}
		}
	}

	if ( !matched ) {
		Sizzle.error( selector );
	}

	return groups;
}

function addCombinator( matcher, combinator, context ) {
	var dir = combinator.dir,
		doneName = done++;

	if ( !matcher ) {
		// If there is no matcher to check, check against the context
		matcher = function( elem ) {
			return elem === context;
		};
	}
	return combinator.first ?
		function( elem, context ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					return matcher( elem, context ) && elem;
				}
			}
		} :
		function( elem, context ) {
			var cache,
				dirkey = doneName + "." + dirruns,
				cachedkey = dirkey + "." + cachedruns;
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					if ( (cache = elem[ expando ]) === cachedkey ) {
						return elem.sizset;
					} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
						if ( elem.sizset ) {
							return elem;
						}
					} else {
						elem[ expando ] = cachedkey;
						if ( matcher( elem, context ) ) {
							elem.sizset = true;
							return elem;
						}
						elem.sizset = false;
					}
				}
			}
		};
}

function addMatcher( higher, deeper ) {
	return higher ?
		function( elem, context ) {
			var result = deeper( elem, context );
			return result && higher( result === true ? elem : result, context );
		} :
		deeper;
}

// ["TAG", ">", "ID", " ", "CLASS"]
function matcherFromTokens( tokens, context, xml ) {
	var token, matcher,
		i = 0;

	for ( ; (token = tokens[i]); i++ ) {
		if ( Expr.relative[ token.part ] ) {
			matcher = addCombinator( matcher, Expr.relative[ token.part ], context );
		} else {
			token.captures.push( context, xml );
			matcher = addMatcher( matcher, Expr.filter[ token.part ].apply( null, token.captures ) );
		}
	}

	return matcher;
}

function matcherFromGroupMatchers( matchers ) {
	return function( elem, context ) {
		var matcher,
			j = 0;
		for ( ; (matcher = matchers[j]); j++ ) {
			if ( matcher(elem, context) ) {
				return true;
			}
		}
		return false;
	};
}

var compile = Sizzle.compile = function( selector, context, xml ) {
	var tokens, group, i,
		cached = compilerCache[ selector ];

	// Return a cached group function if already generated (context dependent)
	if ( cached && cached.context === context ) {
		return cached;
	}

	// Generate a function of recursive functions that can be used to check each element
	group = tokenize( selector, context, xml );
	for ( i = 0; (tokens = group[i]); i++ ) {
		group[i] = matcherFromTokens( tokens, context, xml );
	}

	// Cache the compiled function
	cached = compilerCache[ selector ] = matcherFromGroupMatchers( group );
	cached.context = context;
	cached.runs = cached.dirruns = 0;
	cachedSelectors.push( selector );
	// Ensure only the most recent are cached
	if ( cachedSelectors.length > Expr.cacheLength ) {
		delete compilerCache[ cachedSelectors.shift() ];
	}
	return cached;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

var select = function( selector, context, results, seed, xml ) {
	// Remove excessive whitespace
	selector = selector.replace( rtrim, "$1" );
	var elements, matcher, i, len, elem, token,
		type, findContext, notTokens,
		match = selector.match( rgroups ),
		tokens = selector.match( rtokens ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr["POS"].test(selector) ) {
		return handlePOS( selector, context, results, seed, match );
	}

	if ( seed ) {
		elements = slice.call( seed, 0 );

	// To maintain document order, only narrow the
	// set if there is one group
	} else if ( match && match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		if ( tokens.length > 1 && contextNodeType === 9 && !xml &&
				(match = matchExpr["ID"].exec( tokens[0] )) ) {

			context = Expr.find["ID"]( match[1], context, xml )[0];
			if ( !context ) {
				return results;
			}

			selector = selector.slice( tokens.shift().length );
		}

		findContext = ( (match = rsibling.exec( tokens[0] )) && !match.index && context.parentNode ) || context;

		// Get the last token, excluding :not
		notTokens = tokens.pop();
		token = notTokens.split(":not")[0];

		for ( i = 0, len = Expr.order.length; i < len; i++ ) {
			type = Expr.order[i];

			if ( (match = matchExpr[ type ].exec( token )) ) {
				elements = Expr.find[ type ]( (match[1] || "").replace( rbackslash, "" ), findContext, xml );

				if ( elements == null ) {
					continue;
				}

				if ( token === notTokens ) {
					selector = selector.slice( 0, selector.length - notTokens.length ) +
						token.replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
					}
				}
				break;
			}
		}
	}

	// Only loop over the given elements once
	// If selector is empty, we're already done
	if ( selector ) {
		matcher = compile( selector, context, xml );
		dirruns = matcher.dirruns++;

		if ( elements == null ) {
			elements = Expr.find["TAG"]( "*", (rsibling.test( selector ) && context.parentNode) || context );
		}
		for ( i = 0; (elem = elements[i]); i++ ) {
			cachedruns = matcher.runs++;
			if ( matcher(elem, context) ) {
				results.push( elem );
			}
		}
	}

	return results;
};

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			rbuggyQSA = [],
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [":active"],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			div.innerHTML = "<select><option selected></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute("id"),
						nid = old || expando,
						newContext = rsibling.test( selector ) && context.parentNode || context;

					if ( old ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							selector.replace( rgroups, "[id='" + nid + "'] $&" )
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( Expr.match.PSEUDO );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	context = context || document;
	context = (context[0] || context).ownerDocument || context[0] || context;

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( typeof context.createDocumentFragment === "undefined" ) {
		context = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var j, safe, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			i = 0,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( safe = context === document && safeFragment; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = div || safe.appendChild( context.createElement("div") );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Remember the top-level container for proper cleanup
					div = safe.lastChild;
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			safe.removeChild( div );
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Deprecated, use jQuery.browser.webkit instead
// Maintained for back-compat only
if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};
	
})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = {},

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400,
		lineHeight: 1
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've used both window.getComputedStyle
// and getComputedStyle here to produce a better gzip size
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			ret = computed[ name ];
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	if ( val <= 0 ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				if ( elem.offsetWidth !== 0 || curCSS( elem, "display" ) !== "none" ) {
					return getWidthOrHeight( elem, name, extra );
				} else {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var // Document location
	ajaxLocation,
	// Document location segments
	ajaxLocParts,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( _ ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit, prevScale,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						prevScale = scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

						// Update scale, tolerating zeroes from tween.cur()
						scale = tween.cur() / target;

					// Stop looping if we've hit the mark or scale is unchanged
					} while ( scale !== 1 && scale !== prevScale );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				percent = 1 - ( remaining / animation.duration || 0 ),
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		this.pos = eased = jQuery.easing[ this.easing ]( percent, this.options.duration * percent, 0, 1, this.options.duration );
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var box, docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, top, left,
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure we're not dealing with a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return { top: 0, left: 0 };
	}

	box = elem.getBoundingClientRect();
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	top  = box.top  + scrollTop  - clientTop;
	left = box.left + scrollLeft - clientLeft;

	return { top: top, left: left };
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );

define('thrust/data/convention/facade',['thrust/convention'],
function (Convention)
{
    return new Convention({
        properties: ['requireData'],
        create: function (thrust, module, facades)
        {
            if (module.instance.data) throw new Error('"data" is a reserved property');
            facades.data = module.instance.data = thrust.data.createFacade(module);
        }
    });
});
define('thrust/data/convention/start',['thrust/convention', 'thrust/util'],
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
define('thrust/dom/convention/action',[
    'thrust/convention',
    'thrust/util',
    'jquery'
],
function (Convention, util, $)
{
    var type = util.type,
        ACTIONS = 'actions',
        FUNCTION = 'function',
        STRING = 'string',
        ARRAY = 'array';

    var actionHandlers = {
        _registrations: {},
        register: function (eventName, acionName, handler, context)
        {
            var that = this;
            if (!that._registrations[eventName])
                that._registrations[eventName] = {};

            if (!that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = handler;
                if (context) that._registrations[eventName][acionName].context = context;
            }
            else
                throw new Error('The action {1} handler "{0}" has already been taken!'.format(acionName, eventName));
        },
        unregister: function (eventName, acionName)
        {
            var that = this;
            if (that._registrations[eventName] && that._registrations[eventName][acionName])
            {
                that._registrations[eventName][acionName] = null;
                delete that._registrations[eventName][acionName];
            }
        },
        callbackFor: function (eventName, returnResults)
        {
            var that = this;
            var actionAttribute = 'data-action-' + eventName,
                returnResultsDefined = type(returnResults) !== 'undefined';

            return function ()
            {
                var attributeValue = $(this).attr(actionAttribute);
                if (type(attributeValue) === STRING)
                {
                    var method = that._registrations[eventName][attributeValue];
                    if (method)
                        method.apply(method.context || this, arguments);
                    if (returnResultsDefined)
                        return returnResults;
                    return false;
                }
            };
        }
    };

    return new Convention({
        properties: [ACTIONS],
        ignite: function()
        {
            $(window.document.body).on('click.actions', 'a, button, input[type="button"], input[type="submit"]', actionHandlers.callbackFor('click', false));
        },
        ready: function (facade, module)
        {
            var actions = module.convention(ACTIONS),
                dom = facade,
                moduleInstance = module.instance;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        var action = actionCollection[actionName],
                            args;

                        if (type(action) === FUNCTION)
                        {
                            args = [actionEvent, actionName, action];
                        }
                        else if (type(action) === STRING)
                        {
                            args = [actionEvent, actionName, moduleInstance[action]];
                        }
                        else if (type(action) === ARRAY)
                        {
                            if (type(action[0]) === FUNCTION)
                            {
                                args = [actionEvent, actionName].concat(action);
                            }
                            else if (type(action[0]) === STRING)
                            {
                                action[0] = moduleInstance[action[0]];
                                args = [actionEvent, actionName].concat(action);
                            }
                        }
                        actionHandlers.register.apply(actionHandlers, args);
                    }
                }
            }
        },
        stop: function (facade, module)
        {
            var dom = facade,
                actions = module.convention(ACTIONS),
                moduleInstance = module.instance,
                dom = facade.dom;

            if (actions)
            {
                for (var actionEvent in actions)
                {
                    var actionCollection = actions[actionEvent];
                    for (var actionName in actionCollection)
                    {
                        actionHandlers.unregister(actionEvent, actionName);
                    }
                }
            }
        }
    });
});
define('thrust/dom/jquery.interface',['jquery'],
function (jQuery)
{
    var jQueryMethodsToIgnore = ['constructor', 'init', 'selector', 'jquery', 'ready', 'extend', 'queue', 'dequeue', 'clearQueue', 'promise', 'bind', 'unbind', 'live', 'die', 'delegate', 'undelegate', 'blur', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'error', 'domManip', 'serialize', 'serializeArray', 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend', '_toggle', 'fadeTo', 'stop', 'slideDown', 'slideUp', 'slideToggle', 'fadeIn', 'fadeOut', 'fadeToggle', /* These methods are here because we build a custom one that does the job with name spaced events */'on', 'off', 'one'],
        slice = Array.prototype.slice;

    //#region jQuery Interface Layer
    var updateInternals = function (selector)
    {
        if (selector)
            this._context = jQuery(selector);
        this.context = this._context.context;
        this.selector = this._context.selector;

        // Lazily remove missing sudo-array elements.
        for (var i = this.length || 0, iLen = this._context.context; i < iLen; i++)
            delete this[i];

        this.length = this._context.length;
        for (var i = 0, iLen = this.length; i < iLen; i++)
            this[i] = this._context[i];
    };

    var initContext = function (context)
    {
        // If the context is a jQuery context, reference that.
        // If it isn't a jQuery context, run it through jQuery.
        this._context = context instanceof jQuery ? context : jQuery(context);

        // Keep a cache of all dom selectors, for clean up later.
        //if (this._parentDom && this._parentDom !== this) this._parentDom._internalQueries.push(this);

        // Update the internals to match the mimicing of jQuery.
        updateInternals.call(this);
    };

    var someFilter = function (i) { return function (e, index) { return e === i; }; },
    // Wraps a jQuery method, with our own version of it.
        methodFactory = function (method, DomFacade)
        {
            // Returns a method, that unwraps any CoreDom facade objects
            // Then it hands it off to jQuery.
            // Analysing the response, we decide if jQuery gave us one of the following:
            //        A jQuery instance, then we decide if it is:
            //            a new instance, eg .children()
            //            the same instance, eg .css()
            //        Returned data, eg .position() or .is()
            //            Return that data.
            return function ()
            {
                // Search all arguments, if we find a CoreDOM, unwrap it to the jQuery context.
                // jQuery doesnt understand CoreDOM wrappers, it only understands jQuery.
                var args = slice.call(arguments);
                for (var i = 0, iLen = args.length; i < iLen; i++)
                    if (args[i] instanceof DomFacade)
                        args[i] = args[i]._context;

                // Capture the return value for analysis and pass it along to the internal jQuery context and its method.
                // Call in place as if it were called normally.
                if (this._context)
                {
                    var ret = this._context[method].apply(this._context, args);

                    // If the return value is a jQuery instance
                    if (ret instanceof jQuery)
                    {
                        // If it's the same instance, then we just update the internals, and return ourself.
                        if (ret.selector === this.selector && ret.context === this.context)
                        {
                            updateInternals.call(this, ret);
                            return this;
                        }
                        // If it is a new instance, return a new facade
                        return new DomFacade(this, ret, true);
                    }
                    // Regardless update our internals.
                    updateInternals.call(this);
                    // Return the return value, for a method like .is() or .positiion()
                    return ret;
                }
            };
        };

    var updatePrototype = function (proto, CoreDOM)
    {
        // Wrap jQuery and filter out methods we do not want anyone using
        // We also filter out methods that we override, like .on and .off
        for (var i in jQuery.fn)
            if (Object.hasOwnProperty.call(jQuery.fn, i) && !proto[i] && !jQueryMethodsToIgnore.some(someFilter(i)))
                proto[i] = methodFactory(i, CoreDOM);
        proto.$ = proto.find;
    };
    //#endregion

    return {
        updateInternals: updateInternals,
        updatePrototype: updatePrototype,
        initContext: initContext
    };
});
define('thrust/dom/convention/context',['thrust/convention', '../jquery.interface'],
function (Convention, jQueryInterface)
{
    var CONTEXT = 'context',
        updateInternals = jQueryInterface.updateInternals;

    return new Convention({
        properties: [CONTEXT],
        ready: function (facade)
        {
            var module = facade.module,
                context = module.convention(CONTEXT),
                dom = facade;

            if (context)
            {
                updateInternals.call(dom, context);
            }
        }
    });
});
define('thrust/dom/convention/event',[
    'thrust/convention',
    'thrust/util'
],
function (Convention, util)
{
    var type = util.type,
        CONTEXT = 'context',
        EVENTS = 'events',
        FUNCTION = 'function',
        STRING = 'string',
        ARRAY = 'array';

    return new Convention({
        properties: [EVENTS],
        ready: function (facade)
        {
            var module = facade.module,
                events = module.convention(EVENTS),
                optionalContext = module.convention(CONTEXT),
                dom = optionalContext ? facade.query(optionalContext) : facade,
                moduleInstance = module.instance;

            if (events)
            {
                for (var event in events)
                {
                    var definition = events[event],
                        bindEvent;

                    if (type(definition) === FUNCTION)
                    {
                        bindEvent = [event, definition];
                    }
                        // If the event method is a string, we search to verify that module method exists on the given module
                        //        then bind it, with the proper context.
                    else if (type(definition) === STRING)
                    {
                        bindEvent = [event, moduleInstance[definition]];
                    }
                        // If the event module is an array, we apply the array as if it were a direct call to subscribe, by pushing the event name on the front.
                    else if (type(definition) === ARRAY)
                    {
                        bindEvent = definition;
                        for (var i = 0, iLen = definition.length; i < iLen; i++)
                        {
                            if (type(definition[i]) === STRING && moduleInstance[definition[i]])
                            {
                                definition[i] = moduleInstance[definition[i]];
                            }
                        }
                        bindEvent.unshift(0);
                    }
                    // Call the on method, with our arguments.
                    dom.on.apply(dom, bindEvent);
                }
                //Save a reference of the context, for later unbinding.
                events.context = dom._context[0];
            }
        },
        stop: function (facade, module)
        {
            var events = module.convention(EVENTS),
                dom = facade;

            if (events)
            {
                dom.changeContext(events.context);
                delete events.context;

                if (dom._context)
                    dom.off();
            }
        }
    });
});
define('thrust/dom/convention/facade',['thrust/convention'],
function (Convention)
{
    return new Convention({
        properties: ['requireDom'],
        create: function (thrust, module, facades)
        {
            if (module.instance.dom) throw new Error('"dom" is a reserved property');
            var dom = facades.dom = thrust.dom.createFacade(module);
            module.instance.dom = module.instance.$ = dom.query;
        }
    });
});
// doT.js
// 2011, Laura Doktorova, https://github.com/olado/doT
//
// doT.js is an open source component of http://bebedo.com
// Licensed under the MIT license.
//
(function() {
	

	var doT = {
		version: '0.2.0',
		templateSettings: {
			evaluate:    /\{\{([\s\S]+?)\}\}/g,
			interpolate: /\{\{=([\s\S]+?)\}\}/g,
			encode:      /\{\{!([\s\S]+?)\}\}/g,
			use:         /\{\{#([\s\S]+?)\}\}/g,
			define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
			conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
			iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
			varname: 'it',
			strip: true,
			append: true,
			selfcontained: false
		},
		template: undefined, //fn, compile template
		compile:  undefined  //fn, for express
	};

	var global = (function(){ return this || (0,eval)('this'); }());

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = doT;
	} else if (typeof define === 'function' && define.amd) {
		define('doT',[],function(){return doT;});
	} else {
		global.doT = doT;
	}

	function encodeHTMLSource() {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },
			matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : code;
		};
	}
	global.encodeHTML = encodeHTMLSource();

	var startend = {
		append: { start: "'+(",      end: ")+'",      startencode: "'+encodeHTML(" },
		split:  { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML("}
	}, skip = /$^/;

	function resolveDefs(c, block, def) {
		return ((typeof block === 'string') ? block : block.toString())
		.replace(c.define || skip, function(m, code, assign, value) {
			if (code.indexOf('def.') === 0) {
				code = code.substring(4);
			}
			if (!(code in def)) {
				if (assign === ':') {
					def[code]= value;
				} else {
					eval("def['"+code+"']=" + value);
				}
			}
			return '';
		})
		.replace(c.use || skip, function(m, code) {
			var v = eval(code);
			return v ? resolveDefs(c, v, def) : v;
		});
	}

	function unescape(code) {
		return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, ' ');
	}

	doT.template = function(tmpl, c, def) {
		c = c || doT.templateSettings;
		var cse = c.append ? startend.append : startend.split, str, needhtmlencode, sid=0, indv;

		if (c.use || c.define) {
			var olddef = global.def; global.def = def || {}; // workaround minifiers
			str = resolveDefs(c, tmpl, global.def);
			global.def = olddef;
		} else str = tmpl;

		str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g,' ')
					.replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,''): str)
			.replace(/'|\\/g, '\\$&')
			.replace(c.interpolate || skip, function(m, code) {
				return cse.start + unescape(code) + cse.end;
			})
			.replace(c.encode || skip, function(m, code) {
				needhtmlencode = true;
				return cse.startencode + unescape(code) + cse.end;
			})
			.replace(c.conditional || skip, function(m, elsecase, code) {
				return elsecase ?
					(code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
					(code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
			})
			.replace(c.iterate || skip, function(m, iterate, vname, iname) {
				if (!iterate) return "';} } out+='";
				sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
				return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
					+vname+"=arr"+sid+"["+indv+"+=1];out+='";
			})
			.replace(c.evaluate || skip, function(m, code) {
				return "';" + unescape(code) + "out+='";
			})
			+ "';return out;")
			.replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r')
			.replace(/(\s|;|}|^|{)out\+='';/g, '$1').replace(/\+''/g, '')
			.replace(/(\s|;|}|^|{)out\+=''\+/g,'$1out+=');

		if (needhtmlencode && c.selfcontained) {
			str = "var encodeHTML=(" + encodeHTMLSource.toString() + "());" + str;
		}
		try {
			return new Function(c.varname, str);
		} catch (e) {
			if (typeof console !== 'undefined') console.log("Could not create a template function: " + str);
			throw e;
		}
	};

	doT.compile = function(tmpl, def) {
		return doT.template(tmpl, null, def);
	};
}());

/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	dirruns,
	sortOrder,
	siblingCheck,
	assertGetIdNotName,

	document = window.document,
	docElem = document.documentElement,

	strundefined = "undefined",
	hasDuplicate = false,
	baseHasDuplicate = true,
	done = 0,
	slice = [].slice,
	push = [].push,

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",
	pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
	combinators = whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*",
	groups = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + attributes + "|" + pseudos.replace( 2, 7 ) + "|[^\\\\(),])+",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcombinators = new RegExp( "^" + combinators ),

	// All simple (non-comma) selectors, excluding insignifant trailing whitespace
	rgroups = new RegExp( groups + "?(?=" + whitespace + "*,|$)", "g" ),

	// A selector, or everything after leading whitespace
	// Optionally followed in either case by a ")" for terminating sub-selectors
	rselector = new RegExp( "^(?:(?!,)(?:(?:^|,)" + whitespace + "*" + groups + ")*?|" + whitespace + "*(.*?))(\\)|$)" ),

	// All combinators and selector components (attribute test, tag, pseudo, etc.), the latter appearing together when consecutive
	rtokens = new RegExp( groups.slice( 19, -6 ) + "\\x20\\t\\r\\n\\f>+~])+|" + combinators, "g" ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "[-", "[-\\*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|nth|last|first)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"POS": new RegExp( pos, "ig" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	classCache = {},
	cachedClasses = [],
	compilerCache = {},
	cachedSelectors = [],

	// Mark a function for use in filtering
	markFunction = function( fn ) {
		fn.sizzleFilter = true;
		return fn;
	},

	// Returns a function to use in pseudos for input types
	createInputFunction = function( type ) {
		return function( elem ) {
			// Check the input's nodeName and type
			return elem.nodeName.toLowerCase() === "input" && elem.type === type;
		};
	},

	// Returns a function to use in pseudos for buttons
	createButtonFunction = function( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	},

	// Used for testing something on an element
	assert = function( fn ) {
		var pass = false,
			div = document.createElement("div");
		try {
			pass = fn( div );
		} catch (e) {}
		// release memory in IE
		div = null;
		return pass;
	},

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length ===
			// buggy browsers will return more than the correct 0
			2 + document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	}),

	// Check if the browser returns only elements
	// when doing getElementsByTagName("*")
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return div.getElementsByTagName("*").length === 0;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
			return false;
		}

		// Safari caches class attributes, doesn't catch changes (in 3.2)
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length !== 1;
	});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector, context, results, seed, xml );
};

var Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	match: matchExpr,

	order: [ "ID", "TAG" ],

	attrHandle: {},

	createPseudo: markFunction,

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var argument,
				unquoted = match[4];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Relinquish our claim on characters in `unquoted` from a closing parenthesis on
			if ( unquoted && (argument = rselector.exec( unquoted )) && argument.pop() ) {

				match[0] = match[0].slice( 0, argument[0].length - unquoted.length - 1 );
				unquoted = argument[0].slice( 0, -1 );
			}

			// Quoted or unquoted, we have the full argument
			// Return only captures needed by the pseudo filter method (type and argument)
			match.splice( 2, 3, unquoted || match[3] );
			return match;
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className ];
			if ( !pattern ) {
				pattern = classCache[ className ] = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" );
				cachedClasses.push( className );
				// Avoid too large of a cache
				if ( cachedClasses.length > Expr.cacheLength ) {
					delete classCache[ cachedClasses.shift() ];
				}
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			if ( !operator ) {
				return function( elem ) {
					return Sizzle.attr( elem, name ) != null;
				};
			}

			return function( elem ) {
				var result = Sizzle.attr( elem, name ),
					value = result + "";

				if ( result == null ) {
					return operator === "!=";
				}

				switch ( operator ) {
					case "=":
						return value === check;
					case "!=":
						return value !== check;
					case "^=":
						return check && value.indexOf( check ) === 0;
					case "*=":
						return check && value.indexOf( check ) > -1;
					case "$=":
						return check && value.substr( value.length - check.length ) === check;
					case "~=":
						return ( " " + value + " " ).indexOf( check ) > -1;
					case "|=":
						return value === check || value.substr( 0, check.length + 1 ) === check + "-";
				}
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				var doneName = done++;

				return function( elem ) {
					var parent, diff,
						count = 0,
						node = elem;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.sizset) ) {
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.sizset = ++count;
								if ( node === elem ) {
									break;
								}
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.sizset - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument, context, xml ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			var fn = Expr.pseudos[ pseudo ] || Expr.pseudos[ pseudo.toLowerCase() ];

			if ( !fn ) {
				Sizzle.error( "unsupported pseudo: " + pseudo );
			}

			// The user may set fn.sizzleFilter to indicate
			// that arguments are needed to create the filter function
			// just as Sizzle does
			if ( !fn.sizzleFilter ) {
				return fn;
			}

			return fn( argument, context, xml );
		}
	},

	pseudos: {
		"not": markFunction(function( selector, context, xml ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var matcher = compile( selector.replace( rtrim, "$1" ), context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputFunction("radio"),
		"checkbox": createInputFunction("checkbox"),
		"file": createInputFunction("file"),
		"password": createInputFunction("password"),
		"image": createInputFunction("image"),

		"submit": createButtonFunction("submit"),
		"reset": createButtonFunction("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},

	setFilters: {
		"first": function( elements, argument, not ) {
			return not ? elements.slice( 1 ) : [ elements[0] ];
		},

		"last": function( elements, argument, not ) {
			var elem = elements.pop();
			return not ? elements : [ elem ];
		},

		"even": function( elements, argument, not ) {
			var results = [],
				i = not ? 1 : 0,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"odd": function( elements, argument, not ) {
			var results = [],
				i = not ? 0 : 1,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"lt": function( elements, argument, not ) {
			return not ? elements.slice( +argument ) : elements.slice( 0, +argument );
		},

		"gt": function( elements, argument, not ) {
			return not ? elements.slice( 0, +argument + 1 ) : elements.slice( +argument + 1 );
		},

		"eq": function( elements, argument, not ) {
			var elem = elements.splice( +argument, 1 );
			return not ? elements : elem;
		}
	}
};

// Deprecated
Expr.setFilters["nth"] = Expr.setFilters["eq"];

// Back-compat
Expr.filters = Expr.pseudos;

// IE6/7 return a modified href
if ( !assertHrefNotNormalized ) {
	Expr.attrHandle = {
		"href": function( elem ) {
			return elem.getAttribute( "href", 2 );
		},
		"type": function( elem ) {
			return elem.getAttribute("type");
		}
	};
}

// Add getElementsByName if usable
if ( assertUsableName ) {
	Expr.order.push("NAME");
	Expr.find["NAME"] = function( name, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};
}

// Add getElementsByClassName if usable
if ( assertUsableClassName ) {
	Expr.order.splice( 1, 0, "CLASS" );
	Expr.find["CLASS"] = function( className, context, xml ) {
		if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
			return context.getElementsByClassName( className );
		}
	};
}

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem, results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

var isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
var contains = Sizzle.contains = docElem.compareDocumentPosition ?
	function( a, b ) {
		return !!( a.compareDocumentPosition( b ) & 16 );
	} :
	docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

Sizzle.attr = function( elem, name ) {
	var attr,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( Expr.attrHandle[ name ] ) {
		return Expr.attrHandle[ name ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( name );
	}
	attr = elem.getAttributeNode( name );
	return attr ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			attr.specified ? attr.value : null :
		null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	return (baseHasDuplicate = 0);
});


if ( docElem.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( ; (elem = results[i]); i++ ) {
				if ( elem === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
}

function handlePOSGroup( selector, posfilter, argument, contexts, seed, not ) {
	var results,
		fn = Expr.setFilters[ posfilter.toLowerCase() ];

	if ( !fn ) {
		Sizzle.error( posfilter );
	}

	if ( selector || !(results = seed) ) {
		multipleContexts( selector || "*", contexts, (results = []), seed );
	}

	return results.length > 0 ? fn( results, argument, not ) : [];
}

function handlePOS( selector, context, results, seed, groups ) {
	var match, not, anchor, ret, elements, currentContexts, part, lastIndex,
		i = 0,
		len = groups.length,
		rpos = matchExpr["POS"],
		// This is generated here in case matchExpr["POS"] is extended
		rposgroups = new RegExp( "^" + rpos.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			var i = 1,
				len = arguments.length - 2;
			for ( ; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		// Reset regex index to 0
		rpos.exec("");
		selector = groups[i];
		ret = [];
		anchor = 0;
		elements = seed;
		while ( (match = rpos.exec( selector )) ) {
			lastIndex = rpos.lastIndex = match.index + match[0].length;
			if ( lastIndex > anchor ) {
				part = selector.slice( anchor, match.index );
				anchor = lastIndex;
				currentContexts = [ context ];

				if ( rcombinators.test(part) ) {
					if ( elements ) {
						currentContexts = elements;
					}
					elements = seed;
				}

				if ( (not = rendsWithNot.test( part )) ) {
					part = part.slice( 0, -5 ).replace( rcombinators, "$&*" );
				}

				if ( match.length > 1 ) {
					match[0].replace( rposgroups, setUndefined );
				}
				elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
			}
		}

		if ( elements ) {
			ret = ret.concat( elements );

			if ( (part = selector.slice( anchor )) && part !== ")" ) {
				multipleContexts( part, ret, results, seed );
			} else {
				push.apply( results, ret );
			}
		} else {
			Sizzle( selector, context, results, seed );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}

function tokenize( selector, context, xml ) {
	var tokens, soFar, type,
		groups = [],
		i = 0,

		// Catch obvious selector issues: terminal ")"; nonempty fallback match
		// rselector never fails to match *something*
		match = rselector.exec( selector ),
		matched = !match.pop() && !match.pop(),
		selectorGroups = matched && selector.match( rgroups ) || [""],

		preFilters = Expr.preFilter,
		filters = Expr.filter,
		checkContext = !xml && context !== document;

	for ( ; (soFar = selectorGroups[i]) != null && matched; i++ ) {
		groups.push( tokens = [] );

		// Need to make sure we're within a narrower context if necessary
		// Adding a descendant combinator will generate what is needed
		if ( checkContext ) {
			soFar = " " + soFar;
		}

		while ( soFar ) {
			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				soFar = soFar.slice( match[0].length );

				// Cast descendant combinators to space
				matched = tokens.push({ part: match.pop().replace( rtrim, " " ), captures: match });
			}

			// Filters
			for ( type in filters ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match, context, xml )) ) ) {

					soFar = soFar.slice( match.shift().length );
					matched = tokens.push({ part: type, captures: match });
				}
			}

			if ( !matched ) {
				break;
			}
		}
	}

	if ( !matched ) {
		Sizzle.error( selector );
	}

	return groups;
}

function addCombinator( matcher, combinator, context ) {
	var dir = combinator.dir,
		doneName = done++;

	if ( !matcher ) {
		// If there is no matcher to check, check against the context
		matcher = function( elem ) {
			return elem === context;
		};
	}
	return combinator.first ?
		function( elem, context ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					return matcher( elem, context ) && elem;
				}
			}
		} :
		function( elem, context ) {
			var cache,
				dirkey = doneName + "." + dirruns,
				cachedkey = dirkey + "." + cachedruns;
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					if ( (cache = elem[ expando ]) === cachedkey ) {
						return elem.sizset;
					} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
						if ( elem.sizset ) {
							return elem;
						}
					} else {
						elem[ expando ] = cachedkey;
						if ( matcher( elem, context ) ) {
							elem.sizset = true;
							return elem;
						}
						elem.sizset = false;
					}
				}
			}
		};
}

function addMatcher( higher, deeper ) {
	return higher ?
		function( elem, context ) {
			var result = deeper( elem, context );
			return result && higher( result === true ? elem : result, context );
		} :
		deeper;
}

// ["TAG", ">", "ID", " ", "CLASS"]
function matcherFromTokens( tokens, context, xml ) {
	var token, matcher,
		i = 0;

	for ( ; (token = tokens[i]); i++ ) {
		if ( Expr.relative[ token.part ] ) {
			matcher = addCombinator( matcher, Expr.relative[ token.part ], context );
		} else {
			token.captures.push( context, xml );
			matcher = addMatcher( matcher, Expr.filter[ token.part ].apply( null, token.captures ) );
		}
	}

	return matcher;
}

function matcherFromGroupMatchers( matchers ) {
	return function( elem, context ) {
		var matcher,
			j = 0;
		for ( ; (matcher = matchers[j]); j++ ) {
			if ( matcher(elem, context) ) {
				return true;
			}
		}
		return false;
	};
}

var compile = Sizzle.compile = function( selector, context, xml ) {
	var tokens, group, i,
		cached = compilerCache[ selector ];

	// Return a cached group function if already generated (context dependent)
	if ( cached && cached.context === context ) {
		return cached;
	}

	// Generate a function of recursive functions that can be used to check each element
	group = tokenize( selector, context, xml );
	for ( i = 0; (tokens = group[i]); i++ ) {
		group[i] = matcherFromTokens( tokens, context, xml );
	}

	// Cache the compiled function
	cached = compilerCache[ selector ] = matcherFromGroupMatchers( group );
	cached.context = context;
	cached.runs = cached.dirruns = 0;
	cachedSelectors.push( selector );
	// Ensure only the most recent are cached
	if ( cachedSelectors.length > Expr.cacheLength ) {
		delete compilerCache[ cachedSelectors.shift() ];
	}
	return cached;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

var select = function( selector, context, results, seed, xml ) {
	// Remove excessive whitespace
	selector = selector.replace( rtrim, "$1" );
	var elements, matcher, i, len, elem, token,
		type, findContext, notTokens,
		match = selector.match( rgroups ),
		tokens = selector.match( rtokens ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr["POS"].test(selector) ) {
		return handlePOS( selector, context, results, seed, match );
	}

	if ( seed ) {
		elements = slice.call( seed, 0 );

	// To maintain document order, only narrow the
	// set if there is one group
	} else if ( match && match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		if ( tokens.length > 1 && contextNodeType === 9 && !xml &&
				(match = matchExpr["ID"].exec( tokens[0] )) ) {

			context = Expr.find["ID"]( match[1], context, xml )[0];
			if ( !context ) {
				return results;
			}

			selector = selector.slice( tokens.shift().length );
		}

		findContext = ( (match = rsibling.exec( tokens[0] )) && !match.index && context.parentNode ) || context;

		// Get the last token, excluding :not
		notTokens = tokens.pop();
		token = notTokens.split(":not")[0];

		for ( i = 0, len = Expr.order.length; i < len; i++ ) {
			type = Expr.order[i];

			if ( (match = matchExpr[ type ].exec( token )) ) {
				elements = Expr.find[ type ]( (match[1] || "").replace( rbackslash, "" ), findContext, xml );

				if ( elements == null ) {
					continue;
				}

				if ( token === notTokens ) {
					selector = selector.slice( 0, selector.length - notTokens.length ) +
						token.replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
					}
				}
				break;
			}
		}
	}

	// Only loop over the given elements once
	// If selector is empty, we're already done
	if ( selector ) {
		matcher = compile( selector, context, xml );
		dirruns = matcher.dirruns++;

		if ( elements == null ) {
			elements = Expr.find["TAG"]( "*", (rsibling.test( selector ) && context.parentNode) || context );
		}
		for ( i = 0; (elem = elements[i]); i++ ) {
			cachedruns = matcher.runs++;
			if ( matcher(elem, context) ) {
				results.push( elem );
			}
		}
	}

	return results;
};

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			rbuggyQSA = [],
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [":active"],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			div.innerHTML = "<select><option selected></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute("id"),
						nid = old || expando,
						newContext = rsibling.test( selector ) && context.parentNode || context;

					if ( old ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							selector.replace( rgroups, "[id='" + nid + "'] $&" )
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( Expr.match.PSEUDO );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// EXPOSE
if ( typeof define === "function" && define.amd ) {
	define('sizzle',[],function() { return Sizzle; });
} else {
	window.Sizzle = Sizzle;
}
// EXPOSE

})( window );

define('thrust/data/event.factory',['thrust/util'],
function(util)
{
    var camelCase = util.camelCase,
        slice = Array.prototype.slice;

    var eventHandlers = {    // Supported event handlers
        'before-send': true,
        'send': true,
        'error': true,
        'success': true,
        'complete': true,
        'start': true,
        'stop': true
    };

    var beforeSendMethod = function (jqXHR, settings)
    {
        this.fire('data-event-before-send', jqXHR, settings);
    };

    var eventFactory = function (event)    // Create a new event method.
    {
        var evt = 'data-event-' + event;
        return function ()
        {
            var args = slice.call(arguments, 0);
            args.unshift(evt);
            this.fire.apply(this.fire.async, args);
        };
    };

    var normalizeEvents = function (events)    // Normalize events
    {
        events = events.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++)
        {
            if (!eventHandlers[events[i]])
                throw new Error('Event "{0}" is not a valid data event'.format(events[i]));
            events[i] = 'data-' + events[i];
        }
        return events.join(' ');
    };

    var sendEventFactory = function (i)
    {
        return function (event, jqXHR, settings)
        {
            if (!settings.__core_data_fired__)
            {
                jqXHR.abort();
                throw new Error('Request aborted, all ajax calls must pass through thrust-data.');
            }
            eventFactory(i).apply(this, arguments);
        };
    };

    return {
        init: function(jDoc)
        {
            for (var i in eventHandlers)
            {
                var jqEvt = 'ajax-' + i,
                    method = eventFactory(i);

                if (i === 'send')
                {
                    method = sendEventFactory(i).bind(this);
                }
                jDoc.on(camelCase(jqEvt) + this.namespace, method);
            }
        },
        beforeSendMethod: beforeSendMethod,
    };
});
define('thrust/data/response.queue',['jquery', 'thrust/util', 'thrust/config', 'thrust/log'],
function(jQuery, util, config, log)
{
    var slice = Array.prototype.slice,
        format = util.format,
        extend = util.extend,
        when = util.when,
        uid = util.uniqueId,
        ajax = jQuery.ajax,
        queue = {},
        updateXHRInternals = function (dfo, xhr)
        {
            return function ()
            {
                if (!dfo._xhr)
                {
                    dfo._xhr = xhr;
                    dfo.getAllResponseHeaders = function () { return dfo._xhr.getAllResponseHeaders(); };
                    dfo.getResponseHeader = function () { return dfo._xhr.getAllResponseHeadersgetResponseHeader(); };
                    dfo.abort = function () { return dfo._xhr.abort(); };
                    dfo.setRequestHeader = function (name, value) { return dfo._xhr.setRequestHeader(name, value); };
                }

                dfo.responseText = xhr.responseText;
                dfo.responseXML = xhr.responseXML;
                dfo.readyState = xhr.readyState;
                dfo.status = xhr.status;
                dfo.statusText = xhr.statusText;
            };
        },
        argumentResolver = function (method)
        {
            return function ()
            {
                return method(util.toArray(arguments));
            };
        },
        deferControllerItemCallback = function (func)
        {
            return function ()
            {
                return func.call(this, arguments[0][0]);
            };
        };

    var ResponseQueue = function (module, startTimeout, finishTimeout)
    {
        this.startTimeout = startTimeout;
        this.finishTimeout = finishTimeout;
        this.module = module;
    };

    ResponseQueue.prototype = {
        addToQueue: function (type, url, options)
        {
            var dfo = when.defer(), that = this;

            if (options.beforeSend)
            {
                var beforeSend = options.beforeSend;
                dfo.progress(function (eventType)
                {
                    if (eventType && eventType == 'before-send')
                    {
                        var args = slice.call(arguments, 1);
                        beforeSend.apply(beforeSend, args);
                    }
                });
                delete options.beforeSend;
            }

            if (options.complete)
            {
                dfo.always(options.complete);
                delete options.complete;
            }
            if (options.success)
            {
                dfo.then(options.success);
                delete options.success;
            }

            if (options.error)
            {
                dfo.otherwise(options.error);
                delete options.error;
            }

            var list = queue[type] || (queue[type] = {});
            var tail = list.tail || (list.tail = list.next = {});

            extend(tail, { url: url, options: options, dfo: dfo });
            list.tail = tail.next = {};

            when.delay(that.startTimeout).then(that.processQueueFactory(type));

            return dfo.promise;
        },
        processQueueFactory: function (type)
        {
            var parent = queue[type], node = parent, that = this,
                queryId = uid('dq');

            log.debug(format('Data[{0}]: Creating queue for type "{1}"', that.namespace, type));
            that.module.fire('data-wait', queryId, type);

            return function ()
            {
                log.debug(format('Data[{0}]: Processing queue for type "{1}"', that.namespace, type));
                that.module.fire('data-start', queryId, type);
                var whenQueue = [], deferController = when.defer();

                deferController.then(function ()
                {
                    log.debug(format('Data[{0}]: Finishing queue for type "{1}"', that.namespace, type));
                    that.module.fire('data-stop', queryId, type);
                });

                delete queue[type];

                var tail = node.tail;
                while ((node = node.next) !== tail)
                {
                    var dfo = node.dfo,
                        options = extend({}, node.options),
                        xhrDfo = when.defer(),
                        xhr = node.xhr = ajax(node.url, options).then(argumentResolver(xhrDfo.resolve), argumentResolver(xhrDfo.reject));

                    whenQueue.push(xhr);

                    when.all([xhrDfo, deferController.promise], when.apply(dfo.resolve), when.apply(dfo.reject), updateXHRInternals(dfo, xhr));

                    dfo.progress('before-send', [dfo, options]);
                }

                when.any([when.all(whenQueue), when.delay(that.finishTimeout)], deferController.resolve, deferController.resolve);
            };
        }
    };

    return ResponseQueue;
});
define('thrust/data/main',[
    'jquery',
    'thrust/util',
    'thrust/log',
    'thrust/config',
    './event.factory',
    './response.queue',
    'thrust/events',
    'thrust/facade'
],
function (jQuery, util, log, config, eventFactory, ResponseQueue, events, facade)
{
    
    // Variable declaration.
    var format = util.format,
        extend = util.extend,
        type = util.type,
        when = util.when,
        slice = Array.prototype.slice,
        ajax = jQuery.ajax,
        uid = util.uniqueId,
        dataCache = {},
        defaults = {
            cache: config.data.cache,
            beforeSend: eventFactory.beforeSendMethod,
            contentType: 'application/json',
            type: 'POST',
            url: '',
            data: '',
            dataType: 'json',
            __core_data_fired__: true
        };

    jQuery.ajaxSettings.traditional = !!config.url.traditionalEncoding;

    var jDoc = jQuery(document);

    eventFactory.init(jDoc);
    //#region DataFacade
    var DataFacade = facade.createFacade(function (module, parent)
    {
        this.name = module.name + '-data';
        this.module = module;
        this.parent = parent;
        this.__conventions = parent.__conventions;
        this._callbacks = parent._callbacks;
        this.responseQueue = parent.responseQueue;
        this.initEvents();
    });
    util.extend(DataFacade.fn, events);
    //#endregion

    var Data = function (/* $ref */ name, /* $ref */ core, /* $ref */ config)
    {
        // Enforce new
        if (!(this instanceof Data))
            return new Data(name, core);

        if (!name)
            throw new Error('Data: module name must be defined.');

        this.responseQueue = new ResponseQueue(this, config.data.startTimeout, config.data.finishTimeout);

        log.debug('Data: Creating new Data');

        this.core = core;
        this._callbacks = this.core._callbacks;
        this.initEvents();
    };

    var DataMethods = {
        createFacade: function (moduleDefn)
        {
            return new DataFacade(moduleDefn, this);
        },
    };

    var DataPrototype = {
        getData: function (url, data, settings)
        {
            settings = !settings ? { data: data } : extend(settings, { data: data });
            return this.get(url, settings);
        },
        postData: function (url, data, settings)
        {
            settings = !settings ? { data: JSON.stringify(data) } : extend(settings, { data: JSON.stringify(data) });
            return this.post(url, settings);
        },
        get: function (url, settings, jumpQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'get' }), jumpQueue);
        },
        post: function (url, settings, jumpQueue)
        {
            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }

            if (url === undefined && settings.url !== undefined)
                url = settings.url;
            if (url === undefined)
                throw new Error('No url is defined');

            return this.ajax(url, extend(settings || {}, { type: 'post' }), jumpQueue);
        },
        addToCache: function (cacheObjects)
        {
            if (cacheObjects)
            {
                cacheObjects.forEach(function (x)
                {
                    dataCache[x.Url] = x.Json;
                });
            }
        },
        ajax: function (url, settings, jumpQueue)
        {
            var that = this, options, type, beforeSend;
            log.info(format('Data[{0}]: Fetching data from "{1}"', that.namespace, url));

            if (settings === undefined && typeof url === 'object')
            {
                settings = url;
                url = settings.url;
            }
            if (!settings)
                settings = {};

            if (url === undefined && settings.url !== undefined)
                url = settings.url;


            url = util.fixupUrl(url);

            var module = (that.module && that.module.module);
            if (jumpQueue && that._fastAjaxPermission)
            {
                var dfo = when.defer();

                var queryId = uid('dq');
                type = settings.type.toLowerCase();

                that.fire('data-wait', queryId, type);
                that.fire('data-start', queryId, type);

                options = extend({}, { beforeSend: eventFactory.beforeSendMethod }, defaults, settings);

                var xhr = ajax(url, options).always(function () { that.async('data-stop', queryId, type); });
                return when(xhr);
            }

            options = extend({}, defaults, settings, { beforeSend: eventFactory.beforeSendMethod });

            type = options.type.toLowerCase();

            return this.responseQueue.addToQueue(type, url, options);
        }
    };

    util.extend(DataFacade.fn, DataPrototype);

    Data.prototype = Data.fn = util.extend({}, DataMethods, DataPrototype, events);

    // Take a hold of jQuery... this is sure to be contravesial.
    jQuery.ajax = Data.ajax;

    return Data;
});

define('thrust/data', ['thrust/data/main'], function (main) { return main; });

define('thrust/template/main',[
    'require',
    'thrust/util',
    'thrust/data',
    'thrust/log',
    'thrust/config',
    'domReady',
    'sizzle'
],
    function (require, util, tData, log, config, domReady, sizzle)
    {
        var LONG = 'long',
            SHORT = 'short',
            ID = 'id',
            templates = {
                long: {},
                short: {},
                id: {}
            },
            deepCopy = util.deepCopy,
            each = util.each,
            when = util.when,
            memoize = util.memoize,
            getLongName = function (name, type)
            {
                return this.shortName(name) + '.' + type + this.extension;
            },
            getShortName = function (name)
            {
                return util.reduce(this.templateTypes, function (memo, x) { return memo.replace('.' + x + this.extension); }, name.toLowerCase());
            },
            getTemplateId = function (name)
            {
                return this.shortName(name).replace(/\//g, '-');
            };

        var Template = function (/* $ref */ config)
        {
            var that = this;
            config = config.template;
            that.extension = config.extension;
            that.templatePaths = config.types;
            that.templateTypes = util.map(config.types, function (x, i) { return i });
            that.baseUrl - config.baseUrl;
            that.defaultType = config.defaultType;
            
            that.templates = deepCopy({}, templates);

            that.longName = memoize(getLongName.bind(that));
            that.shortName = memoize(getShortName.bind(that));
            that.templateId = memoize(getTemplateId.bind(that));

            domReady(function ()
            {
                each(sizzle('script[data-template]'), that.createFromDomNode.bind(that));
            });
        };

        Template.prototype = {
            get: function (name)
            {
                var template = null, that = this, templates = that.templates;
                if (template = templates[LONG][that.longName(name)])
                    return template;
                else if (template = templates[SHORT][that.shortName(name)])
                    return template;
                else if (template = templates[ID][that.templateId(name)])
                    return template;
                return false;
            },
            set: function (name, type, compiledTemplate)
            {
                var that = this,
                    shortName = that.shortName(name),
                    templateId = that.templateId(name),
                    longName = that.longName(name, type),
                    templates = that.templates;

                templates[LONG][longName] = templates[SHORT][shortName] = templates[ID][templateId] = {
                    name: name,
                    shortName: name,
                    id: templateId,
                    type: type,
                    compiled: compiledTemplate
                };
            },
            has: function (name)
            {
                var that = this;
                return !!that.get(name);
            },
            append: function (name, type)
            {
                var that = this;
                // Append to dom?
                // Is this really needed... it is needed for knockout to grab templates by default,
                //      but knockout can be changed, in how it gets templates.
                //      Granted knockout still needs the id to exist, maybe the best thing is to add the empty div,
                //      if it doesn't exist, for knockout support.
                domReady(function ()
                {
                    var element = document.getElementById(that.templateId(name));
                    if (!element)
                    {
                        var element = document.createElement('script');
                        element.id = that.templateId(name);
                        element.type = 'text/x-{0}-template'.format(type.toLowerCase());
                        element.setAttribute('data-type', type);
                        element.setAttribute('data-template', that.shortName(name));
                        // perhaps add the text node content for the template function
                        document.body.appendChild(element)
                    }
                });
            },
            newTemplate: function (name, type, html)
            {
                var that = this, template = that.get(name);
                if (!template)
                {
                    if (type == 'precompiled')
                    {
                        that.set(name, type, html);

                        appendTemplate(that.longName(name), type);
                    }
                    else
                    {
                        require([(that.templatePaths[type] || 'thrust/template/' + type)], function (engine)
                        {
                            var templatingMethod;

                            if (typeof engine === 'function')
                                templatingMethod = engine;
                            else if (typeof engine.template === 'function')
                                templatingMethod = engine.template;

                            var compiledTemplate = templatingMethod(html);

                            that.set(name, type, compiledTemplate);
                            that.append(that.longName(name), type);
                        });
                    }

                    //if (deferred)
                    //    deferred.resolve(template.compiled);
                }
                return template;
            },
            fetch: function (name)
            {
                var shortName = that.shortName(name),
                    longName = that.longName(name),
                    that = this,
                    template;

                var defer = when.defer();

                if (template = that.get(name))
                {
                    defer.resolve(template);
                    return defer.promise;
                }

                data.get(baseUrl + longName, { contentType: 'text/plain', dataType: 'text' }).then(function (data)
                {
                    var template = that.newTemplate(name, defaultType, data);
                    defer.resolve(template);
                },
                function ()
                {
                    defer.reject();
                });

                return defer.promise;
            },
            createFromDomNode:  function (element)
            {
                var that = this;
                log.info(element.getAttribute('data-template'),
                    element.getAttribute('data-type'),
                    element.text);

                that.newTemplate(
                    element.getAttribute('data-template'),
                    element.getAttribute('data-type'),
                    element.text
                );
            }
        };

        return Template;
    });
define('thrust/template', ['thrust/template/main'], function (main) { return main; });

define('thrust/template/convention/template',['thrust/convention', 'thrust/util', 'thrust/template'],
function (Convention, util, templateManager)
{
    var TEMPLATES = 'templates',
        when = util.when,
        each = util.each,
        hasOwn = Object.prototype.hasOwnProperty,
        find = util.find;

    return new Convention({
        properties: [TEMPLATES],
        create: function (thrust, module, facades)
        {
            var templateInstance = thrust.template;
            module.instance.templates = {
                fetch: templateInstance.fetch.bind(templateInstance),
                get: templateInstance.get.bind(templateInstance),
                has: templateInstance.has.bind(templateInstance)
            };
        },
        init: function(facade, module)
        {
            var defer = when.defer();

            var module = facade.module,
                templates = module.convention(TEMPLATES),
                invertedTemplates = util.invert(templates),
                moduleInstance = module.instance;

            if (templates)
            {
                facade.defers = [];
                each(templates, function(template)
                {
                    if (typeof template === 'string')
                    {
                        facade.defers.push(templateManager.fetch(template));
                    }
                });
                facade.defers = when.all(facade.defers).then(function (loadedTemplates)
                {
                    for (var i in invertedTemplates)
                    {
                        if (hasOwn.call(invertedTemplates, i))
                        {
                            var template = find(loadedTemplates, function (x) { return x.shortName === i || x.name === i; });
                            moduleInstance.templates[invertedTemplates[i]] = template.compiled;
                        }
                    }
                });
            }
        },
        start: function (facade)
        {
            return facade.defers || undefined;
        }
    });
});
/*!
 * Davis - http://davisjs.com - JavaScript Routing - 0.9.2
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */
;
/**
 * Convinience method for instantiating a new Davis app and configuring it to use the passed
 * routes and subscriptions.
 *
 * @param {Function} config A function that will be run with a newly created Davis.App as its context,
 * should be used to set up app routes, subscriptions and settings etc.
 * @namespace
 * @returns {Davis.App}
 */
Davis = function (config) {
  var app = new Davis.App
  config && config.call(app)
  Davis.$(function () { app.start() })
  return app
};

/**
 * Stores the DOM library that Davis will use.  Can be overriden to use libraries other than jQuery.
 */
if (window.jQuery) {
  Davis.$ = jQuery
} else {
  Davis.$ = null
};

/**
 * Checks whether Davis is supported in the current browser
 *
 * @returns {Boolean}
 */
Davis.supported = function () {
  return (typeof window.history.pushState == 'function')
}

/*!
 * A function that does nothing, used as a default param for any callbacks.
 * 
 * @private
 * @returns {Function}
 */
Davis.noop = function () {}

/**
 * Method to extend the Davis library with an extension.
 *
 * An extension is just a function that will modify the Davis framework in some way,
 * for example changing how the routing works or adjusting where Davis thinks it is supported.
 *
 * Example:
 *     Davis.extend(Davis.hashBasedRouting)
 *
 * @param {Function} extension the function that will extend Davis
 *
 */
Davis.extend = function (extension) {
  extension(Davis)
}

/*!
 * the version
 */
Davis.version = "0.9.2";/*!
 * Davis - utils
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/*!
 * A module that provides wrappers around modern JavaScript so that native implementations are used
 * whereever possible and JavaScript implementations are used in those browsers that do not natively
 * support them.
 */
Davis.utils = (function () {

  /*!
   * A wrapper around native Array.prototype.every.
   *
   * Falls back to a pure JavaScript implementation in browsers that do not support Array.prototype.every.
   * For more details see the full docs on MDC https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
   *
   * @private
   * @param {array} the array to loop through
   * @param {fn} the function to that performs the every check
   * @param {thisp} an optional param that will be set as fn's this value
   * @returns {Array}
   */
  if (Array.prototype.every) {
    var every = function (array, fn) {
      return array.every(fn, arguments[2])
    }
  } else {
    var every = function (array, fn) {
      if (array === void 0 || array === null) throw new TypeError();
      var t = Object(array);
      var len = t.length >>> 0;
      if (typeof fn !== "function") throw new TypeError();

      var thisp = arguments[2];
      for (var i = 0; i < len; i++) {
        if (i in t && !fn.call(thisp, t[i], i, t)) return false;
      }

      return true;
    }
  };

  /*!
   * A wrapper around native Array.prototype.forEach.
   *
   * Falls back to a pure JavaScript implementation in browsers that do not support Array.prototype.forEach.
   * For more details see the full docs on MDC https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
   *
   * @private
   * @param {array} the array to loop through
   * @param {fn} the function to apply to every element of the array
   * @param {thisp} an optional param that will be set as fn's this value
   * @returns {Array}
   */
  if (Array.prototype.forEach) {
    var forEach = function (array, fn) {
      return array.forEach(fn, arguments[2])
    }
  } else {
    var forEach = function (array, fn) {
      if (array === void 0 || array === null) throw new TypeError();
      var t = Object(array);
      var len = t.length >>> 0;
      if (typeof fn !== "function") throw new TypeError();
      

      var thisp = arguments[2];
      for (var i = 0; i < len; i++) {
        if (i in t) fn.call(thisp, t[i], i, t);
      }
    };
  };

  /*!
   * A wrapper around native Array.prototype.filter.
   * Falls back to a pure JavaScript implementation in browsers that do not support Array.prototype.filter.
   * For more details see the full docs on MDC https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
   *
   * @private
   * @param {array} the array to filter
   * @param {fn} the function to do the filtering
   * @param {thisp} an optional param that will be set as fn's this value
   * @returns {Array}
   */
  if (Array.prototype.filter) {
    var filter = function (array, fn) {
      return array.filter(fn, arguments[2])
    }
  } else {
    var filter = function(array, fn) {
      if (array === void 0 || array === null) throw new TypeError();
      var t = Object(array);
      var len = t.length >>> 0;
      if (typeof fn !== "function") throw new TypeError();
      

      var res = [];
      var thisp = arguments[2];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fn mutates this
          if (fn.call(thisp, val, i, t)) res.push(val);
        }
      }

      return res;
    };
  };

  /*!
   * A wrapper around native Array.prototype.map.
   * Falls back to a pure JavaScript implementation in browsers that do not support Array.prototype.map.
   * For more details see the full docs on MDC https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
   *
   * @private
   * @param {array} the array to map
   * @param {fn} the function to do the mapping
   * @param {thisp} an optional param that will be set as fn's this value
   * @returns {Array}
   */

  if (Array.prototype.map) {
    var map = function (array, fn) {
      return array.map(fn, arguments[2])
    }
  } else {
    var map = function(array, fn) {
      if (array === void 0 || array === null)
        throw new TypeError();

      var t = Object(array);
      var len = t.length >>> 0;
      if (typeof fn !== "function")
        throw new TypeError();

      var res = new Array(len);
      var thisp = arguments[2];
      for (var i = 0; i < len; i++) {
        if (i in t)
          res[i] = fn.call(thisp, t[i], i, t);
      }

      return res;
    };
  };

  /*!
   * A convinience function for converting arguments to a proper array
   *
   * @private
   * @param {args} a functions arguments
   * @param {start} an integer at which to start converting the arguments to an array
   * @returns {Array}
   */
  var toArray = function (args, start) {
    var start = start || 0
    return Array.prototype.slice.call(args, start)
  }

  /*!
   * Exposing the public interface to the Utils module
   * @private
   */
  return {
    every: every,
    forEach: forEach,
    filter: filter,
    toArray: toArray,
    map: map
  }
})()

/*!
 * Davis - listener
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * A module to bind to link clicks and form submits and turn what would normally be http requests
 * into instances of Davis.Request.  These request objects are then pushed onto the history stack
 * using the Davis.history module.
 *
 * This module uses Davis.$, which by defualt is jQuery for its event binding and event object normalization.
 * To use Davis with any, or no, JavaScript framework be sure to provide support for all the methods called
 * on Davis.$.
 *
 * @module
 */
Davis.listener = function () {

  /*!
   * Methods to check whether an element has an href or action that is local to this page
   * @private
   */
  var originChecks = {
    A: function (elem) {
      return elem.host !== window.location.host || elem.protocol !== window.location.protocol
    },

    FORM: function (elem) {
      var a = document.createElement('a')
      a.href = elem.action
      return this.A(a)
    }
  }

  /*!
   * Checks whether the target of a click or submit event has an href or action that is local to the
   * current page.  Only links or targets with local hrefs or actions will be handled by davis, all
   * others will be ignored.
   * @private
   */
  var differentOrigin = function (elem) {
    if (!originChecks[elem.nodeName.toUpperCase()]) return true // the elem is neither a link or a form
    return originChecks[elem.nodeName.toUpperCase()](elem)
  }

  /*!
   * A handler that creates a new Davis.Request and pushes it onto the history stack using Davis.history.
   * 
   * @param {Function} targetExtractor a function that will be called with the event target jQuery object and should return an object with path, title and method.
   * @private
   */
  var handler = function (targetExtractor) {
    return function (event) {
      if (differentOrigin(this)) return true
      var request = new Davis.Request (targetExtractor.call(Davis.$(this)));
      Davis.location.assign(request)
      event.stopPropagation()
      event.preventDefault()
      return false;
    };
  };

  /*!
   * A handler specialized for click events.  Gets the request details from a link elem
   * @private
   */
  var clickHandler = handler(function () {
    var self = this
    return {
      method: 'get',
      fullPath: this.attr('href'),
      title: this.attr('title'),
      delegateToServer: function () {
        window.location.pathname = self.attr('href')
      }
    };
  });

  /*!
   * Decodes the url, including + characters.
   * @private
   */
  var decodeUrl = function (str) {
    return decodeURIComponent(str.replace(/\+/g, '%20'))
  };

  /*!
   * A handler specialized for submit events.  Gets the request details from a form elem
   * @private
   */
  var submitHandler = handler(function () {
    var self = this
    return {
      method: this.attr('method'),
      fullPath: decodeUrl(this.serialize() ? [this.attr('action'), this.serialize()].join("?") : this.attr('action')),
      title: this.attr('title'),
      delegateToServer: function () {
        self.submit()
      }
    };
  });

  /**
   * Binds to both link clicks and form submits using jQuery's deleagate.
   *
   * Will catch all current and future links and forms.  Uses the apps settings for the selector to use for links and forms
   * 
   * @see Davis.App.settings
   * @memberOf listener
   */
  this.listen = function () {
    Davis.$(document).delegate(this.settings.formSelector, 'submit', submitHandler)
    Davis.$(document).delegate(this.settings.linkSelector, 'click', clickHandler)
  }

  /**
   * Unbinds all click and submit handlers that were attatched with listen.
   *
   * Will efectivley stop the current app from processing any requests and all links and forms will have their default
   * behaviour restored.
   *
   * @see Davis.App.settings
   * @memberOf listener
   */
  this.unlisten = function () {
    Davis.$(document).undelegate(this.settings.linkSelector, 'click', clickHandler)
    Davis.$(document).undelegate(this.settings.formSelector, 'submit', submitHandler)
  }
}
/*!
 * Davis - event
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

 /**
  * A plugin that adds basic event capabilities to a Davis app, it is included by default.
  *
  * @module
  */
Davis.event = function () {

  /*!
   * callback storage
   */
  var callbacks = {}

  /**
   * Binds a callback to a named event.
   *
   * The following events are triggered internally by Davis and can be bound to
   *
   *  * start : Triggered when the application is started
   *  * lookupRoute : Triggered before looking up a route. The request being looked up is passed as an argument
   *  * runRoute : Triggered before running a route. The request and route being run are passed as arguments
   *  * routeNotFound : Triggered if no route for the current request can be found. The current request is passed as an arugment
   *  * requestHalted : Triggered when a before filter halts the current request. The current request is passed as an argument
   *  * unsupported : Triggered when starting a Davis app in a browser that doesn't support html5 pushState
   *
   * Example
   *
   *     app.bind('runRoute', function () {
   *       console.log('about to run a route')
   *     })
   *
   * @param {String} event event name
   * @param {Function} fn callback
   * @memberOf event
   */
  this.bind = function (event, fn) {
    (callbacks[event] = callbacks[event] || []).push(fn);
    return this;
  };

  /**
   * Triggers an event with the given arguments.
   *
   * @param {String} event event name
   * @param {Mixed} ...
   * @memberOf event
   */
  this.trigger = function (event) {
    var args = Davis.utils.toArray(arguments, 1),
        handlers = callbacks[event];

    if (!handlers) return this

    for (var i = 0, len = handlers.length; i < len; ++i) {
      handlers[i].apply(this, args)
    }

    return this;
  };
}
/*!
 * Davis - logger
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * A plugin for enhancing the standard logging available through the console object.
 * Automatically included in all Davis apps.
 *
 * Generates log messages of varying severity in the format
 *
 * `[Sun Jan 23 2011 16:15:21 GMT+0000 (GMT)] <message>`
 *
 * @module
 */
Davis.logger = function () {

  /*!
   * Generating the timestamp portion of the log message
   * @private
   */
  function timestamp(){
    return "[" + Date() + "]";
  }

  /*!
   * Pushing the timestamp onto the front of the arguments to log
   * @private
   */
  function prepArgs(args) {
    var a = Davis.utils.toArray(args)
    a.unshift(timestamp())
    return a.join(' ');
  }

  var logType = function (logLevel) {
    return function () {
      if (window.console) console[logLevel](prepArgs(arguments));
    }
  }


  /**
   * Prints an error message to the console if the console is available.
   *
   * @params {String} All arguments are combined and logged to the console.
   * @memberOf logger
   */
   var error = logType('error')

  /**
   * Prints an info message to the console if the console is available.
   *
   * @params {String} All arguments are combined and logged to the console.
   * @memberOf logger
   */
   var info = logType('info')

  /**
   * Prints a warning message to the console if the console is available.
   *
   * @params {String} All arguments are combined and logged to the console.
   * @memberOf logger
   */
   var warn = logType('warn')

  /*!
   * Exposes the public methods of the module
   * @private
   */
  this.logger = {
    error: error,
    info: info,
    warn: warn
  }
}/*!
 * Davis - Route
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

Davis.Route = (function () {

  var pathNameRegex = /:([\w\d]+)/g;
  var pathNameReplacement = "([^\/]+)";

  var splatNameRegex = /\*([\w\d]+)/g;
  var splatNameReplacement = "(.*)";

  var nameRegex = /[:|\*]([\w\d]+)/g

/**
 * Davis.Routes are the main part of a Davis application.  They consist of an HTTP method, a path
 * and a callback function.  When a link or a form that Davis has bound to are clicked or submitted
 * a request is pushed on the history stack and a route that matches the path and method of the
 * generated request is run.
 *
 * The path for the route can consist of placeholders for attributes, these will then be available
 * on the request.  Simple variables should be prefixed with a colan, and for splat style params use
 * an asterisk.
 *
 * Inside the callback function 'this' is bound to the request.
 *
 * Example:
 *
 *     var route = new Davis.Route ('get', '/foo/:id', function (req) {
 *       var id = req.params['id']
 *       // do something interesting!
 *     })
 *
 *     var route = new Davis.Route ('get', '/foo/*splat', function (req) {
 *       var id = req.params['splat']
 *       // splat will contain everything after the /foo/ in the path.
 *     })
 *
 * You can include any number of route level 'middleware' when defining routes.  These middlewares are
 * run in order and need to explicitly call the next handler in the stack.  Using route middleware allows
 * you to share common logic between routes and is also a good place to load any data or do any async calls
 * keeping your main handler simple and focused.
 *
 * Example:
 *
 *     var loadUser = function (req, next) {
 *       $.get('/users/current', function (user) {
 *         req.user = user
 *         next(req)
 *       })
 *     }
 *
 *     var route = new Davis.Route ('get', '/foo/:id', loadUser, function (req) {
 *       renderUser(req.user)
 *     })
 *
 * @constructor
 * @param {String} method This should be one of either 'get', 'post', 'put', 'delete', 'before', 'after' or 'state'
 * @param {String} path This string can contain place holders for variables, e.g. '/user/:id' or '/user/*splat'
 * @param {Function} callback One or more callbacks that will be called in order when a request matching both the path and method is triggered.
 */
  var Route = function (method, path, handlers) {
    var convertPathToRegExp = function () {
      if (!(path instanceof RegExp)) {
        var str = path
          .replace(pathNameRegex, pathNameReplacement)
          .replace(splatNameRegex, splatNameReplacement);

        // Most browsers will reset this to zero after a replace call.  IE will
        // set it to the index of the last matched character.
        path.lastIndex = 0;

        return new RegExp("^" + str + "$", "gi");
      } else {
        return path;
      };
    };

    var convertMethodToRegExp = function () {
      if (!(method instanceof RegExp)) {
        return new RegExp("^" + method + "$", "i");
      } else {
        return method
      };
    }

    var capturePathParamNames = function () {
      var names = [], a;
      while ((a = nameRegex.exec(path))) names.push(a[1]);
      return names;
    };

    this.paramNames = capturePathParamNames();
    this.path = convertPathToRegExp();
    this.method = convertMethodToRegExp();

    if (typeof handlers === 'function') {
      this.handlers = [handlers]
    } else {
      this.handlers = handlers;
    }
  }

  /**
   * Tests whether or not a route matches a particular request.
   *
   * Example:
   *
   *     route.match('get', '/foo/12')
   *
   * @param {String} method the method to match against
   * @param {String} path the path to match against
   * @returns {Boolean}
   */
  Route.prototype.match = function (method, path) {
    this.reset();
    return (this.method.test(method)) && (this.path.test(path))
  }

  /**
   * Resets the RegExps for method and path
   */
  Route.prototype.reset = function () {
    this.method.lastIndex = 0;
    this.path.lastIndex = 0;
  }

  /**
   * Runs the callback associated with a particular route against the passed request.
   *
   * Any named params in the request path are extracted, as per the routes path, and
   * added onto the requests params object.
   *
   * Example:
   *
   *     route.run(request)
   *
   * @params {Davis.Request} request
   * @returns {Object} whatever the routes callback returns
   */
  Route.prototype.run = function (request) {
    this.reset();
    var matches = this.path.exec(request.path);
    if (matches) {
      matches.shift();
      for (var i=0; i < matches.length; i++) {
        request.params[this.paramNames[i]] = matches[i];
      };
    };

    var handlers = Davis.utils.map(this.handlers, function (handler, i) {
      return function (req) {
        return handler.call(req, req, handlers[i+1])
      }
    })

    return handlers[0](request)
  }

  /**
   * Converts the route to a string representation of itself by combining the method and path
   * attributes.
   *
   * @returns {String} string representation of the route
   */
  Route.prototype.toString = function () {
    return [this.method, this.path].join(' ');
  }

  /*!
   * exposing the constructor
   * @private
   */
  return Route;
})()
/*!
 * Davis - router
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * A decorator that adds convinience methods to a Davis.App for easily creating instances
 * of Davis.Route and looking up routes for a particular request.
 *
 * Provides get, post put and delete method shortcuts for creating instances of Davis.Routes
 * with the corresponding method.  This allows simple REST styled routing for a client side
 * JavaScript application.
 *
 * ### Example
 *
 *     app.get('/foo/:id', function (req) {
 *       // get the foo with id = req.params['id']
 *     })
 *     
 *     app.post('/foo', function (req) {
 *       // create a new instance of foo with req.params
 *     })
 *     
 *     app.put('/foo/:id', function (req) {
 *       // update the instance of foo with id = req.params['id']
 *     })
 *     
 *     app.del('/foo/:id', function (req) {
 *       // delete the instance of foo with id = req.params['id']
 *     })
 *
 * As well as providing convinience methods for creating instances of Davis.Routes the router
 * also provides methods for creating special instances of routes called filters.  Before filters
 * run before any matching route is run, and after filters run after any matched route has run.
 * A before filter can return false to halt the running of any matched routes or other before filters.
 *
 * A filter can take an optional path to match on, or without a path will match every request.
 *
 * ### Example
 *
 *     app.before('/foo/:id', function (req) {
 *       // will only run before request matching '/foo/:id'
 *     })
 *     
 *     app.before(function (req) {
 *       // will run before all routes
 *     })
 *     
 *     app.after('/foo/:id', function (req) {
 *       // will only run after routes matching '/foo/:id'
 *     })
 *     
 *     app.after(function (req) {
 *       // will run after all routes
 *     })
 *
 * Another special kind of route, called state routes, are also generated using the router.  State routes
 * are for requests that will not change the current page location.  Instead the page location will remain
 * the same but the current state of the page has changed.  This allows for states which the server will not
 * be expected to know about and support.
 *
 * ### Example
 *
 *     app.state('/foo/:id', function (req) {
 *       // will run when the app transitions into the '/foo/:id' state.
 *     })
 *
 * Using the `trans` method an app can transition to these kind of states without changing the url location.
 *
 * For convinience routes can be defined within a common base scope, this is useful for keeping your route
 * definitions simpler and DRYer.  A scope can either cover the whole app, or just a subset of the routes.
 *
 * ### Example
 *
 *     app.scope('/foo', function () {
 *       this.get('/:id', function () {
 *         // will run for routes that match '/foo/:id'
 *       })
 *     })
 *
 * @module
 */
Davis.router = function () {

  /**
   * Low level method for adding routes to your application.
   *
   * If called with just a method will return a partially applied function that can create routes with
   * that method.  This is used internally to provide shortcuts for get, post, put, delete and state
   * routes.
   *
   * You normally want to use the higher level methods such as get and post, but this can be useful for extending
   * Davis to work with other kinds of requests.
   *
   * Example:
   *
   *     app.route('get', '/foo', function (req) {
   *       // will run when a get request is made to '/foo'
   *     })
   *
   *     app.patch = app.route('patch') // will return a function that can be used to handle requests with method of patch.
   *     app.patch('/bar', function (req) {
   *       // will run when a patch request is made to '/bar'
   *     })
   *
   * @param {String} method The method for this route.
   * @param {String} path The path for this route.
   * @param {Function} handler The handler for this route, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @memberOf router
   */
  this.route = function (method, path) {
    var createRoute = function (path) {
      var handlers = Davis.utils.toArray(arguments, 1),
          scope = scopePaths.join(''),
          route = new Davis.Route (method, scope + path, handlers)

      routeCollection.push(route)
      return route
    }

    return (arguments.length == 1) ? createRoute : createRoute.apply(this, Davis.utils.toArray(arguments, 1))
  }

  /**
   * A convinience wrapper around `app.route` for creating get routes.
   *
   * @param {String} path The path for this route.
   * @param {Function} handler The handler for this route, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @see Davis.router.route
   * @memberOf router
   */
  this.get  = this.route('get')

  /**
   * A convinience wrapper around `app.route` for creating post routes.
   *
   * @param {String} path The path for this route.
   * @param {Function} handler The handler for this route, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @see Davis.router.route
   * @memberOf router
   */
  this.post = this.route('post')

  /**
   * A convinience wrapper around `app.route` for creating put routes.
   *
   * @param {String} path The path for this route.
   * @param {Function} handler The handler for this route, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @see Davis.router.route
   * @memberOf router
   */
  this.put  = this.route('put')

  /**
   * A convinience wrapper around `app.route` for creating delete routes.
   *
   * delete is a reserved word in javascript so use the `del` method when creating a Davis.Route with a method of delete.
   *
   * @param {String} path The path for this route.
   * @param {Function} handler The handler for this route, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @see Davis.router.route
   * @memberOf router
   */
  this.del  = this.route('delete')

  /**
   * Adds a state route into the apps route collection.
   *
   * These special kind of routes are not triggered by clicking links or submitting forms, instead they
   * are triggered manually by calling `trans`.
   *
   * Routes added using the state method act in the same way as other routes except that they generate
   * a route that is listening for requests that will not change the page location.
   *
   * Example:
   *
   *     app.state('/foo/:id', function (req) {
   *       // will run when the app transitions into the '/foo/:id' state.
   *     })
   *
   * @param {String} path The path for this route, this will never be seen in the url bar.
   * @param {Function} handler The handler for this route, will be called with the request that triggered the route
   * @memberOf router
   *
   */
  this.state = this.route('state');

  /**
   * Modifies the scope of the router.
   *
   * If you have many routes that share a common path prefix you can use scope to reduce repeating
   * that path prefix.
   *
   * You can use `scope` in two ways, firstly you can set the scope for the whole app by calling scope
   * before defining routes.  You can also provide a function to the scope method, and the scope will
   * only apply to those routes defined within this function. It is  also possible to nest scopes within
   * other scopes.
   *
   * Example
   *
   *     // using scope with a function
   *     app.scope('/foo', function () {
   *       this.get('/bar', function (req) {
   *         // this route will have a path of '/foo/bar'
   *       })
   *     })
   *
   *     // setting a global scope for the rest of the application
   *     app.scope('/bar')
   *
   *     // using scope with a function
   *     app.scope('/foo', function () {
   *       this.scope('/bar', function () {
   *         this.get('/baz', function (req) {
   *           // this route will have a path of '/foo/bar/baz'
   *         })
   *       })
   *     })
   *
   * @memberOf router
   * @param {String} path The prefix to use as the scope
   * @param {Function} fn A function that will be executed with the router as its context and the path
   * as a prefix
   *
   */
  this.scope = function (path, fn) {
    scopePaths.push(path)
    if (arguments.length == 1) return

    fn.call(this, this)
    scopePaths.pop()
  }

  /**
   * Transitions the app into the state identified by the passed path parameter.
   *
   * This allows the app to enter states without changing the page path through a link click or form submit. 
   * If there are handlers registered for this state, added by the `state` method, they will be triggered.
   *
   * This method generates a request with a method of 'state', in all other ways this request is identical
   * to those that are generated when clicking links etc.
   *
   * States transitioned to using this method will not be able to be revisited directly with a page load as
   * there is no url that represents the state.
   *
   * An optional second parameter can be passed which will be available to any handlers in the requests
   * params object.
   *
   * Example
   *
   *     app.trans('/foo/1')
   *     
   *     app.trans('/foo/1', {
   *       "bar": "baz"
   *     })
   *     
   *
   * @param {String} path The path that represents this state.  This will not be seen in the url bar.
   * @param {Object} data Any additional data that should be sent with the request as params.
   * @memberOf router
   */
  this.trans = function (path, data) {
    if (data) {
      var fullPath = [path, decodeURIComponent(Davis.$.param(data))].join('?')
    } else {
      var fullPath = path
    };

    var req = new Davis.Request({
      method: 'state',
      fullPath: fullPath,
      title: ''
    })

    Davis.location.assign(req)
  }

  /*!
   * Generating convinience methods for creating filters using Davis.Routes and methods to
   * lookup filters.
   */
  this.filter = function (filterName) {
    return function () {
      var method = /.+/;

      if (arguments.length == 1) {
        var path = /.+/;
        var handler = arguments[0];
      } else if (arguments.length == 2) {
        var path = arguments[0];
        var handler = arguments[1];
      };

      var route = new Davis.Route (method, path, handler)
      filterCollection[filterName].push(route);
      return route
    }
  }

  this.lookupFilter = function (filterType) {
    return function (method, path) {
      return Davis.utils.filter(filterCollection[filterType], function (route) {
        return route.match(method, path)
      });
    }
  }

  /**
   * A convinience wrapper around `app.filter` for creating before filters.
   *
   * @param {String} path The optionl path for this filter.
   * @param {Function} handler The handler for this filter, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @memberOf router
   */
  this.before = this.filter('before')

  /**
   * A convinience wrapper around `app.filter` for creating after filters.
   *
   * @param {String} path The optionl path for this filter.
   * @param {Function} handler The handler for this filter, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @memberOf router
   */
  this.after = this.filter('after')

  /**
   * A convinience wrapper around `app.lookupFilter` for looking up before filters.
   *
   * @param {String} path The optionl path for this filter.
   * @param {Function} handler The handler for this filter, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @memberOf router
   */
  this.lookupBeforeFilter = this.lookupFilter('before')

  /**
   * A convinience wrapper around `app.lookupFilter` for looking up after filters.
   *
   * @param {String} path The optionl path for this filter.
   * @param {Function} handler The handler for this filter, will be called with the request that triggered the route.
   * @returns {Davis.Route} the route that has just been created and added to the route list.
   * @memberOf router
   */
  this.lookupAfterFilter  = this.lookupFilter('after')

  /*!
   * collections of routes and filters
   * @private
   */
  var routeCollection = [];
  var filterCollection = {
    before: [],
    after: []
  };
  var scopePaths = []

  /**
   * Looks for the first route that matches the method and path from a request.
   * Will only find and return the first matched route.
   *
   * @param {String} method the method to use when looking up a route
   * @param {String} path the path to use when looking up a route
   * @returns {Davis.Route} route
   * @memberOf router
   */
  this.lookupRoute = function (method, path) {
    return Davis.utils.filter(routeCollection, function (route) {
      return route.match(method, path)
    })[0];
  };
}
/*!
 * Davis - history
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * A module to normalize and enhance the window.pushState method and window.onpopstate event.
 *
 * Adds the ability to bind to whenever a new state is pushed onto the history stack and normalizes
 * both of these events into an onChange event.
 *
 * @module
 */
Davis.history = (function () {

  /*!
   * storage for the push state handlers
   * @private
   */
  var pushStateHandlers = [];

  /*!
   * keep track of whether or not webkit like browsers have fired their initial
   * page load popstate
   * @private
   */
  var popped = false

  /*!
   * method to check whether or not this is the first pop state event received
   * @private
   */
   function hasPopped () {
     return !!window.history.state || popped
   }

  /*!
   * Add a handler to the push state event.  This event is not a native event but is fired
   * every time a call to pushState is called.
   * 
   * @param {Function} handler
   * @private
   */
  function onPushState(handler) {
    pushStateHandlers.push(handler);
  };

  /*!
   * Simple wrapper for the native onpopstate event.
   *
   * @param {Function} handler
   * @private
   */
  function onPopState(handler) {
    window.addEventListener('popstate', handler, true);
  };

  /*!
   * returns a handler that wraps the native event given onpopstate.
   * When the page first loads or going back to a time in the history that was not added
   * by pushState the event.state object will be null.  This generates a request for the current
   * location in those cases
   *
   * @param {Function} handler
   * @private
   */
  function wrapped(handler) {
    return function (event) {
      if (event.state && event.state._davis) {
        handler(new Davis.Request(event.state._davis))
      } else {
        if (hasPopped()) handler(Davis.Request.forPageLoad())
      };
      popped = true
    }
  }

  /*!
   * provide a wrapper for any data that is going to be pushed into the history stack.  All
   * data is wrapped in a "_davis" namespace.
   * @private
   */
  function wrapStateData(data) {
    return {"_davis": data}
  }

  /**
   * Bind to the history on change event.
   *
   * This is not a native event but is fired any time a new state is pushed onto the history stack,
   * the current history is replaced or a state is popped off the history stack.
   * The handler function will be called with a request param which is an instance of Davis.Request.
   *
   * @param {Function} handler a function that will be called on push and pop state.
   * @see Davis.Request
   * @memberOf history
   */
  function onChange(handler) {
    onPushState(handler);
    onPopState(wrapped(handler));
  };

  /*!
   * returns a function for manipulating the history state and optionally calling any associated
   * pushStateHandlers
   *
   * @param {String} methodName the name of the method to manipulate the history state with.
   * @private
   */
  function changeStateWith (methodName) {
    return function (request, opts) {
      history[methodName](wrapStateData(request.toJSON()), request.title, request.location());
      if (opts && opts.silent) return
      Davis.utils.forEach(pushStateHandlers, function (handler) {
        handler(request);
      });
    }
  }

  /**
   * Pushes a request onto the history stack.
   *
   * This is used internally by Davis to push a new request
   * resulting from either a form submit or a link click onto the history stack, it will also trigger
   * the onpushstate event.
   *
   * An instance of Davis.Request is expected to be passed, however any object that has a title
   * and a path property will also be accepted.
   *
   * @param {Davis.Request} request the location to be assinged as the current location.
   * @memberOf history
   */
  var assign = changeStateWith('pushState')

  /**
   * Replace the current state on the history stack.
   *
   * This is used internally by Davis when performing a redirect.  This will trigger an onpushstate event.
   *
   * An instance of Davis.Request is expected to be passed, however any object that has a title
   * and a path property will also be accepted.
   *
   * @param {Davis.Request} request the location to replace the current location with.
   * @memberOf history
   */
  var replace = changeStateWith('replaceState')

  /**
   * Returns the current location for the application.
   *
   * Davis.location delegates to this method for getting the apps current location.
   *
   * @memberOf history
   */
  function current() {
    return window.location.pathname + (window.location.search ? window.location.search : '')
  }

  /*!
   * Exposing the public methods of this module
   * @private
   */
  return {
    onChange: onChange,
    current: current,
    assign: assign,
    replace: replace
  }
})()
/*!
 * Davis - location
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * A module that acts as a delegator to any locationDelegate implementation.  This abstracts the details of
 * what is being used for the apps routing away from the rest of the library.  This allows any kind of routing
 * To be used with Davis as long as it can respond appropriatly to the given delegate methods.
 *
 * A routing module must respond to the following methods
 *
 *  * __current__ : Should return the current location for the app
 *  * __assign__ : Should set the current location of the app based on the location of the passed request.
 *  * __replace__ : Should at least change the current location to the location of the passed request, for full compatibility it should not add any extra items in the history stack.
 *  * __onChange__ : Should add calbacks that will be fired whenever the location is changed.
 *
 * @module
 *
 */
Davis.location = (function () {

  /*!
   * By default the Davis uses the Davis.history module for its routing, this gives HTML5 based pushState routing
   * which is preferrable over location.hash based routing.
   */
  var locationDelegate = Davis.history

  /**
   * Sets the current location delegate.
   *
   * The passed delegate will be used for all Davis apps.  The delegate
   * must respond to the following four methods `current`, `assign`, `replace` & `onChange`.
   *
   * @param {Object} the location delegate to use.
   * @memberOf location
   */
  function setLocationDelegate(delegate) {
    locationDelegate = delegate
  }

  /**
   * Delegates to the locationDelegate.current method.
   *
   * This should return the current location of the app.
   *
   * @memberOf location
   */
  function current() {
    return locationDelegate.current()
  }

  /*!
   * Creates a function which sends the location delegate the passed message name.
   * It handles converting a string path to an actual request
   *
   * @returns {Function} a function that calls the location delegate with the supplied method name
   * @memberOf location
   * @private
   */
  function sendLocationDelegate (methodName) {
    return function (req) {
      if (typeof req == 'string') req = new Davis.Request (req)
      locationDelegate[methodName](req)
    }
  }

  /**
   * Delegates to the locationDelegate.assign method.
   *
   * This should set the current location for the app to that of the passed request object.
   *
   * Can take either a Davis.Request or a string representing the path of the request to assign.
   *
   *
   *
   * @param {Request} req the request to replace the current location with, either a string or a Davis.Request.
   * @see Davis.Request
   * @memberOf location
   */
  var assign = sendLocationDelegate('assign')

  /**
   * Delegates to the locationDelegate.replace method.
   *
   * This should replace the current location with that of the passed request.
   * Ideally it should not create a new entry in the browsers history.
   *
   * Can take either a Davis.Request or a string representing the path of the request to assign.
   *
   * @param {Request} req the request to replace the current location with, either a string or a Davis.Request.
   * @see Davis.Request
   * @memberOf location
   */
  var replace = sendLocationDelegate('replace')

  /**
   * Delegates to the locationDelegate.onChange method.
   *
   * This should add a callback that will be called any time the location changes.
   * The handler function will be called with a request param which is an instance of Davis.Request.
   *
   * @param {Function} handler callback function to be called on location chnage.
   * @see Davis.Request
   * @memberOf location
   *
   */
  function onChange(handler) {
    locationDelegate.onChange(handler)
  }

  /*!
   * Exposing the public methods of this module
   * @private
   */
  return {
    setLocationDelegate: setLocationDelegate,
    current: current,
    assign: assign,
    replace: replace,
    onChange: onChange
  }
})()/*!
 * Davis - Request
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

Davis.Request = (function () {

/**
 * Davis.Requests are created from click and submit events.  Davis.Requests are passed to Davis.Routes
 * and are stored in the history stack.  They are instantiated by the Davis.listener module.
 *
 * A request will have a params object which will contain all query params and form params, any named
 * params in a routes path will also be added to the requests params object.  Also included is support
 * for rails style nested form params.
 *
 * By default the request method will be taken from the method attribute for forms or will be defaulted
 * to 'get' for links, however there is support for using a hidden field called _method in your forms
 * to set the correct reqeust method.
 *
 * Simple get requests can be created by just passing a path when initializing a request, to set the method
 * or title you have to pass in an object.
 *
 * Example
 *
 *     var request = new Davis.Request ("/foo/12")
 *
 *     var request = new Davis.Request ("/foo/12", {title: 'foo', method: 'POST'})
 *     
 *     var request = new Davis.Request({
 *       title: "foo",
 *       fullPath: "/foo/12",
 *       method: "get"
 *     })
 *
 * @constructor
 * @param {String} fullPath
 * @param {Object} opts An optional object with a title or method proprty
 *
 */
  var Request = function (fullPath, opts) {
    if (typeof fullPath == 'object') {
      opts = fullPath
      fullPath = opts.fullPath
      delete opts.fullPath
    }

    var raw = Davis.$.extend({}, {
      title: "",
      fullPath: fullPath,
      method: "get"
    }, opts)

    var self = this;
    this.raw = raw;
    this.params = {};
    this.title = raw.title;
    this.queryString = raw.fullPath.split("?")[1];
    this._staleCallback = function () {};

    if (this.queryString) {
      Davis.utils.forEach(this.queryString.split("&"), function (keyval) {
        var paramName = keyval.split("=")[0],
            paramValue = keyval.split("=")[1],
            nestedParamRegex = /^(\w+)\[(\w+)?\](\[\])?/,
            nested;
        if (nested = nestedParamRegex.exec(paramName)) {
          var paramParent = nested[1];
          var paramName = nested[2];
          var isArray = !!nested[3];
          var parentParams = self.params[paramParent] || {};

          if (isArray) {
            parentParams[paramName] = parentParams[paramName] || [];
            parentParams[paramName].push(decodeURIComponent(paramValue));
            self.params[paramParent] = parentParams;
          } else if (!paramName && !isArray) {
            parentParams = self.params[paramParent] || []
            parentParams.push(decodeURIComponent(paramValue))
            self.params[paramParent] = parentParams
          } else {
            parentParams[paramName] = decodeURIComponent(paramValue);
            self.params[paramParent] = parentParams;
          }
        } else {
          self.params[paramName] = decodeURIComponent(paramValue);
        };

      });
    };

    raw.fullPath = raw.fullPath.replace(/^https?:\/\/.+?\//, '/');

    this.method = (this.params._method || raw.method).toLowerCase();

    this.path = raw.fullPath
      .replace(/\?.+$/, "")  // Remove the query string
      .replace(/^https?:\/\/[^\/]+/, ""); // Remove the protocol and host parts
  
    this.fullPath = raw.fullPath;

    this.delegateToServer = raw.delegateToServer || Davis.noop;
    this.isForPageLoad = raw.forPageLoad || false;

    if (Request.prev) Request.prev.makeStale(this);
    Request.prev = this;

  };

  /**
   * Redirects the current request to a new location.
   *
   * Calling redirect on an instance of Davis.Request will create a new request using the path and
   * title of the current request. Redirected requests always have a method of 'get'.
   *
   * The request created will replace the current request in the history stack.  Redirect is most
   * often useful inside a handler for a form submit.  After succesfully handling the form the app
   * can redirect to another path.  This means that the current form will not be re-submitted if
   * navigating through the history with the back or forward buttons because the request that the
   * submit generated has been replaced in the history stack.
   *
   * Example
   *
   *     this.post('/foo', function (req) {
   *       processFormRequest(req.params)  // do something with the form request
   *       req.redirect('/bar');
   *     })
   *
   * @param {String} path The path to redirect the current request to
   * @memberOf Request
   */
  Request.prototype.redirect = function (path) {
    Davis.location.replace(new Request ({
      method: 'get',
      fullPath: path,
      title: this.title
    }));
  };

  /**
   * Adds a callback to be called when the request is stale.
   * A request becomes stale when it is no longer the current request, this normally occurs when a
   * new request is triggered.  A request can be marked as stale manually if required.  The callback
   * passed to whenStale will be called with the new request that is making the current request stale.
   *
   * Use the whenStale callback to 'teardown' the objects required for the current route, this gives
   * a chance for views to hide themselves and unbind any event handlers etc.
   *
   * Example
   *
   *     this.get('/foo', function (req) {
   *       var fooView = new FooView ()
   *       fooView.render() // display the foo view
   *       req.whenStale(function (nextReq) {
   *         fooView.remove() // stop displaying foo view and unbind any events
   *       })
   *     })
   *
   * @param {Function} callback A single callback that will be called when the request becomes stale.
   * @memberOf Request
   *
   */
  Request.prototype.whenStale = function (callback) {
    this._staleCallback = callback;
  }

  /**
   * Mark the request as stale.
   *
   * This will cause the whenStale callback to be called.
   *
   * @param {Davis.Request} req The next request that has been recieved.
   * @memberOf Request
   */
  Request.prototype.makeStale = function (req) {
    this._staleCallback.call(req, req);
  }

  /**
   * Returns the location or path that should be pushed onto the history stack. 
   *
   * For get requests this will be the same as the path, for post, put, delete and state requests this will
   * be blank as no location should be pushed onto the history stack.
   *
   * @returns {String} string The location that the url bar should display and should be pushed onto the history stack for this request.
   * @memberOf Request
   */
  Request.prototype.location = function () {
    return (this.method === 'get') ? this.fullPath : ''
  }

  /**
   * Converts the request to a string representation of itself by combining the method and fullPath
   * attributes.
   *
   * @returns {String} string representation of the request
   * @memberOf Request
   */
  Request.prototype.toString = function () {
    return [this.method.toUpperCase(), this.path].join(" ")
  };

  /**
   * Converts the request to a plain object which can be converted to a JSON string.
   *
   * Used when pushing a request onto the history stack.
   *
   * @returns {Object} a plain object representation of the request.
   * @memberOf Request
   */
  Request.prototype.toJSON = function () {
    return {
      title: this.raw.title,
      fullPath: this.raw.fullPath,
      method: this.raw.method
    }
  }

  /**
   * Creates a new request for the page on page load.
   *
   * This is required because usually requests are generated from clicking links or submitting forms
   * however this doesn't happen on a page load but should still be considered a request that the 
   * JavaScript app should handle.
   *
   * @returns {Davis.Request} A request representing the current page loading.
   * @memberOf Request
   */
  Request.forPageLoad = function () {
    return new this ({
      method: 'get',
      // fullPath: window.location.pathname,
      fullPath: Davis.location.current(),
      title: document.title,
      forPageLoad: true
    });
  }

  /*!
   * Stores the last request
   * @private
   */
  Request.prev = null

  return Request

})()
/*!
 * Davis - App
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

Davis.App = (function () {

  /**
   * Constructor for Davis.App
   *
   * @constructor
   * @returns {Davis.App}
   */
  function App() {
    this.running = false;
    this.boundToInternalEvents = false;

    this.use(Davis.listener)
    this.use(Davis.event)
    this.use(Davis.router)
    this.use(Davis.logger)
  };

  /**
   * A convinience function for changing the apps default settings.
   *
   * Should be used before starting the app to ensure any new settings
   * are picked up and used.
   *
   * Example:
   *
   *     app.configure(function (config) {
   *       config.linkSelector = 'a.davis'
   *       config.formSelector = 'form.davis'
   *     })
   *
   * @param {Function} config This function will be executed with the context bound to the apps setting object, this will also be passed as the first argument to the function.
   */
  App.prototype.configure = function(config) {
    config.call(this.settings, this.settings);
  };

  /**
   * Method to include a plugin in this app.
   *
   * A plugin is just a function that will be evaluated in the context of the app.
   *
   * Example:
   *     app.use(Davis.title)
   *
   * @param {Function} plugin The plugin to use
   *
   */
  App.prototype.use = function(plugin) {
    plugin.apply(this, Davis.utils.toArray(arguments, 1))
  };

  /**
   * Method to add helper properties to all requests in the application.
   *
   * Helpers will be added to the Davis.Request.prototype.  Care should be taken not to override any existing Davis.Request
   * methods.
   *
   * @param {Object} helpers An object containing helpers to mixin to the request
   */
  App.prototype.helpers = function(helpers) {
    for (property in helpers) {
      if (helpers.hasOwnProperty(property)) Davis.Request.prototype[property] = helpers[property]
    }
  };

  /**
   * Settings for the app.  These may be overriden directly or by using the configure
   * convinience method.
   *
   * `linkSelector` is the jquery selector for all the links on the page that you want
   * Davis to respond to.  These links will not trigger a normal http request.
   *
   * `formSelector` is similar to link selector but for all the forms that davis will bind to
   *
   * `throwErrors` decides whether or not any errors will be caugth by Davis.  If this is set to true
   * errors will be thrown so that the request will not be handled by JavaScript, the server will have
   * to provide a response.  When set to false errors in a route will be caught and the server will not
   * receive the request.
   *
   * `handleRouteNotFound` determines whether or not Davis should handle requests when there is no matching
   * route.  If set to false Davis will allow the request to be passed to your server to handle if no matching
   * route can be found.
   *
   * `generateRequestOnPageLoad` determines whether a request should be generated for the initial page load.
   * by default this is set to false. A Davis.Request will not be generated with the path of the current
   * page.  Setting this to true will cause a request to be passed to your app for the inital page load.
   *
   * @see #configure
   */

  App.prototype.settings = {
    linkSelector: 'a',
    formSelector: 'form',
    throwErrors: true,
    handleRouteNotFound: false,
    generateRequestOnPageLoad: false
  };

  /**
   * Starts the app's routing.
   *
   * Apps created using the convinience Davis() function are automatically started.
   *
   * Starting the app binds all links and forms, so clicks and submits
   * create Davis requests that will be pushed onto the browsers history stack.  Browser history change
   * events will be picked up and the request that caused the change will be matched against the apps
   * routes and filters.
   */
   App.prototype.start = function(){
    var self = this;

    if (this.running) return

    if (!Davis.supported()) {
      this.trigger('unsupported')
      return
    };

    var runFilterWith = function (request) {
      return function (filter) {
        var result = filter.run(request, request);
        return (typeof result === "undefined" || result);
      }
    }

    var beforeFiltersPass = function (request) {
      return Davis.utils.every(
        self.lookupBeforeFilter(request.method, request.path),
        runFilterWith(request)
      )
    }

    var handleRequest = function (request) {
      if (beforeFiltersPass(request)) {
        self.trigger('lookupRoute', request)
        var route = self.lookupRoute(request.method, request.path);
        if (route) {
          self.trigger('runRoute', request, route);

          try {
            route.run(request)
            self.trigger('routeComplete', request, route)
          } catch (error) {
            self.trigger('routeError', request, route, error)
          }

          Davis.utils.every(
            self.lookupAfterFilter(request.method, request.path),
            runFilterWith(request)
          );

        } else {
          self.trigger('routeNotFound', request);
        }
      } else {
        self.trigger('requestHalted', request)
      }
    }

    var bindToInternalEvents = function () {
      self
        .bind('runRoute', function (request) {
          self.logger.info("runRoute: " + request.toString());
        })
        .bind('routeNotFound', function (request) {
          if (!self.settings.handleRouteNotFound && !request.isForPageLoad) {
            self.stop()
            request.delegateToServer()
          };
          self.logger.warn("routeNotFound: " + request.toString());
        })
        .bind('start', function () {
          self.logger.info("application started")
        })
        .bind('stop', function () {
          self.logger.info("application stopped")
        })
        .bind('routeError', function (request, route, error) {
          if (self.settings.throwErrors) throw(error)
          self.logger.error(error.message, error.stack)
        });

      Davis.location.onChange(function (req) {
        handleRequest(req)
      });

      self.boundToInternalEvents = true
    }

    if (!this.boundToInternalEvents) bindToInternalEvents()

    this.listen();
    this.trigger('start')
    this.running = true;

    if (this.settings.generateRequestOnPageLoad) handleRequest(Davis.Request.forPageLoad())

  };

  /**
   * Stops the app's routing.
   *
   * Stops the app listening to clicks and submits on all forms and links found using the current
   * apps settings.
   */
  App.prototype.stop = function() {
    this.unlisten();
    this.trigger('stop')
    this.running = false
  };

  return App;
})()
;
define("davis", ["jquery"], (function (global) {
    return function () {
        return global.Davis;
    }
}(this)));

define('thrust/core/main',[
    'thrust/util', 'thrust/log', 'thrust/events', 'thrust/facade'
],
function (util, log, Events, facade)
{
    
    // Variable declaration.
    var format = util.format,   // string format method
        extend = util.extend,   // object extension method
        type = util.type,       // object type method
        when = util.when,
        memoize = util.memoize,
        core,
        slice = Array.prototype.slice;

    //#region Facade
    /**
    Creates a new core facade for the given module.

    @class thrust-core-CoreFacade
    **/
    var CoreFacade = facade.createFacade(function (module, parent)
    {
        this.name = module.name;
        this.module = module;
        this.parent = parent;
        this.__conventions = parent.__conventions;
        this._callbacks = parent._callbacks;
        this.initEvents();
    });
    util.extend(CoreFacade.fn, Events);

    /**
    During the start of a core facade, start creates the internal subscriptions array.

    @for thrust-core-CoreFacade
    @method start
    **/
    CoreFacade.fn.init = CoreFacade.fn.start = function ()
    {
        if (!this._internalSubscriptions)
            this._internalSubscriptions = [];
    };

    CoreFacade.fn.subscribe = function (events, callback, context)
    {
        this._internalSubscriptions.push({ events: events, callback: callback, context: context });
        Events.subscribe.call(this, events, callback, context);
    };

    CoreFacade.fn.stop = function (facade)
    {
        var module = facade.module;

        if (this._internalSubscriptions)
        {
            for (var i = this._internalSubscriptions.length - 1; i >= 0; i--)
            {
                var sub = this._internalSubscriptions[i];
                this.unsubscribe(sub.events, sub.callback, sub.context);
            }
            delete this._internalSubscriptions;
        }
    }

    //#endregion
    // Our default namespace prefix.

    /**
    Core class.
    This creates a instance of the core, for use inside thrust.

    @class thrust-core-Core
    @param {String} name The name of the core.
    **/
    var Core = function (/* $ref */ name)
    {
        if (!(this instanceof Core))
            return new Core(name);

        var that = this;
        that.name = name;
        log.debug('Core: Creating new Core {0}'.format(name));

        that.initEvents();

        that.subscribe('thrust-ready', function ()
        {
            log.info('Core: Ready!');
        });

        that.subscribe('thrust-navigate', function (path)
        {
            if (path === window.location.pathname)
                window.location.reload();
            window.location = util.fixupUrl(path);
        });
    };

    var CorePrototype = {
        /**
        Creates a new CoreFacade, based on the given module.

        @for thrust-core-Core
        @method createFacade
        @param {Module} moduleDefn The module to create the facade for.
        **/
        createFacade: function (moduleDefn)
        {
            return new CoreFacade(moduleDefn, this);
        }
    };

    util.extend(CorePrototype, Events);

    // Extend our prototype to include the prototype generated above.
    Core.prototype = Core.fn = CorePrototype;

    return Core;
});

define('thrust/core', ['thrust/core/main'], function (main) { return main; });

define('thrust/dom/main',[
    'jquery',
    'thrust/util',
    'thrust/log',
    './jquery.interface',
    'thrust/facade',
    'thrust/events'
],
function (jQuery, util, log, jQueryInterface, facade, events)
{
    
    //#region Variable declaration
    var format = util.format,                   // string format method
        extend = util.extend,                   // Object extend method
        type = util.type,                       // Object type method
        proxy = util.proxy,                     // Function context proxy method
        hasOwn = Object.prototype.hasOwnProperty,   // Quick reference to hasOwnProperty
        isObject = util.isSimpleObject,         // Is object method
        slice = Array.prototype.slice,
        when = util.when,
        initContext = jQueryInterface.initContext,
        updateInternals = jQueryInterface.updateInternals,
        updatePrototype = jQueryInterface.updatePrototype,
        Dom, CoreDOMMethods, DomPrototype;
    //#endregion

    //#region DataFacade
    var DomFacade = facade.createFacade(function (module, parent, context, fake)
    {
        this.name = parent.name;
        //this.module = module;
        //this.parent = parent;
        this.__conventions = parent.__conventions;
        //this._callbacks = parent._callbacks;
        //this.initEvents();

        // We're building a dom selector, aka jquery wrapper
        if (context && fake)
        {
            // Reference the parent module.
            this._parentDom = parent._parentDom;
            if (this._parentDom)
            {
                // Init the context
                initContext.call(this, context);
            }
        }
        else
        {
            log.debug('Dom: Creating new Dom facade');
            this._parentDom = this;
            this._rootContext = true;

            this.changeContext(document);

            createFacade(this);
            this._internalEvents = [];
        }
    });
    util.extend(DomFacade.fn, {
        init: function (fake)
        {
            this._internalEvents = this._internalEvents || [];
            log.debug(format('Dom[{0}]: Initalizing {1}Dom facade', this.namespace, fake ? 'fake ' : ''));
            return this;
        },
        start: function ()
        {
            log.debug(format('Dom[{0}]: Starting Dom facade', this.namespace));
        },
        stop: function ()
        {
            log.debug(format('Dom[{0}]: Stopping Dom facade', this.namespace));

            for (var i = this._internalEvents.length - 1; i >= 0; i--)
            {
                var sub = this._internalEvents[i];
                this._internalEvents.splice(i, 1);
                this.changeContext(sub.context);
                this.off.apply(this, (util.isArray(sub)) ? sub : (util.isArray(sub.args)) ? sub.args : []);
            }
        },
        destroy: function ()
        {
            if (this._rootContext)
            {
                log.debug(format('Dom[{0}]: Destroying Dom facade', this.namespace));
                delete this._internalEvents;
            }

            this._context = null;
            delete this._context;
        }
    });
    //#endregion

    var createFacade = function (dom)
    {
        if (!dom.query)
            dom.query = function (context)
            {
                if (type(context) !== 'undefined')
                    return new DomFacade(dom.module, dom, context, true);
                return dom;
            }.bind(dom);
        return dom.query;
    };

    // This method updates the internals, to mimic jQuery
    var normalizeEvents = function (events, namespace)
    {
        /// <summary>Normalizes events to take on the namespace of the parent.</summary>
        if (type(events) === 'object')
        {
            // Handles key value paris of events to handlers.
            for (var i in events)
            {
                events[i + namespace] = events[i];
                delete events[i];
            }
            return events;
        }
        else
        {
            // Handle absense of an event, pass our namespace.
            if (!events)
                return namespace;

            // Split the events up
            events = events.split(' ');
            for (var i = 0, iLen = events.length; i < iLen; i++)
            {
                // Add our custom events
                events.push(events[i] + namespace);
            }
            // Grab the new half of the array that we care aout.
            return events.slice(events.length / 2).join(' ');
        }
    };

    DomPrototype = {
        changeContext: function (selector)
        {
            log.info(format('Dom[{0}]: Changing Dom context', this.namespace));
            updateInternals.call(this, selector);
            return this;
        },
        on: function (events)
        {
            log.debug(format('Dom[{0}]: Binding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        },
        one: function (events)
        {
            log.debug(format('Dom[{0}]: Binding one events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.one.apply(this._context, args);
            return this;
        },
        off: function (events)
        {
            log.debug(format('Dom[{0}]: Unbinding events...', this.namespace));
            var args = slice.call(arguments);
            args[0] = normalizeEvents(events, this.namespace);
            this._context.on.apply(this._context, args);
            return this;
        }
    };

//    updatePrototype(DomFacade.fn, DomFacade);
    updatePrototype(DomPrototype, DomFacade);
    util.extend(DomFacade.fn, DomPrototype);
    DomFacade.fn.$ = DomFacade.fn.find;

    //#region Dom
    Dom = function (/* $ref */ name, /* $ref */ core)
    {
        /// <summary>The Dom</summary>
        // Enforce new
        if (!(this instanceof Dom))
            return new Dom(name, core);

        if (!name)
            throw new Error('Data: module name must be defined.');

        log.debug('Data: Creating new Data');

        this.core = core;
        this._callbacks = this.core._callbacks;
        this.initEvents();
        this.name = name;

        /*this._parentDom = this;
        this._rootContext = true;

        createFacade(this);
        this._internalEvents = [];
        this.changeContext(document);*/
    };

    Dom.prototype = Dom.fn = util.extend({}, DomPrototype,
    {
        createFacade: function (module)
        {
            return new DomFacade(module, this, document);
        }
    }, events);

    //#endregion

    return Dom;
});

define('thrust/dom', ['thrust/dom/main'], function (main) { return main; });

define('thrust/spa/main',[
    'require',
    'thrust',
    'thrust/util',
    'thrust/log',
    'davis',
    'jquery',
    'domReady'
],
function (require, Thrust, util, log, Davis, jQuery, domReady)
{
    var each = util.each,
        isString = util.isString,
        isArray = util.isArray,
        isFunction = util.isFunction,
        isObject = util.isObject,
        extend = util.extend,
        once = util.once,
        when = util.when,
        bind = util.bind,
        invoke = util.invoke,
        pluck = util.pluck,
        map = util.map,
        defer = util.defer,
        START = 'start';

    var SinglePageApp = function (/* $ref */ config, /* $ref : name */ instanceName)
    {
        // Need to build a shim for the jQuery methods Davis needs.
        if (!Davis.$) Davis.$ = jQuery;

        var config = config.spa,
            that = this;

        that.thrustInstanceName = instanceName;
        that.router = new Davis.App;
        that.router.configure(function (config)
        {
            config.generateRequestOnPageLoad = true;
        })

        that.loadRoutes(config.routes);

        domReady(that.router.start.bind(that.router));
    };

    SinglePageApp.prototype = {
        /**
        Loads routes into the spa instance

        Routes can be in 3 forms

            {
                '/path/to/:foo': 'path/to/module',
                '/path/to/:bar': ['path/to/module1', 'path/to/module2'],
                '/path/to/:fb': { path: 'path/to/module', args: ['args', 'to', 'hand off to start'] }
                '/path/to/:foo/:bar': function(){  custom handler }
            }

        @method loadRoutes
        @param {Object} routes Object of routes.
        **/
        loadRoutes: function (routes)
        {
            var that = this;
            each(routes, function (value, route)
            {
                if (isFunction(value))
                {
                    that.router.get(route, value);
                    // Run custom function in davis.
                }
                else if (isArray(value))
                {
                    var routeResult = map(value, that.__processRoute);

                    that.router.get(route, function (req)
                    {
                        invoke(routeResult, 'cb', req);
                    });

                    when.all(pluck(routeResult, 'promise'))
                        .then(bind(that.startModules, that, map(value, function(x)
                        {
                            return isObject(x) && x.args || [];
                        })));
                }
                else
                {
                    var routeResult = that.__processRoute(value);

                    that.router.get(route, routeResult.cb);
                    routeResult.promise.then(bind(that.startModules, that, value.args || []));
                }
            });
        },
        /**
        Process each route node depending if it is an object or string.

        @method __processRoute
        @param {Object|String} value The module or module + args to process.
        **/
        __processRoute: function(value)
        {
            var that = this,
                thenMethod = bind(that.startModules, that, value.args || []);

            if (isObject(value))
            {
                return that.routeGetModuleFactory(value.path, thenMethod);
            }
            else if (isString(value))
            {
                return that.routeGetModuleFactory(value, thenMethod);
            }
        },
        /**
        Creates a method that is handed off to the router
        When the route invokes that module, it will asyncronously load the given module, and return a promise for the result.

        @method routeGetModuleFactory
        @param {String} modulePath The path to the module
        @param {Function} themMethod The method that is called, after the function is resolved.
        @returns {Promise} The promise for when the module gets loaded.
        **/
        routeGetModuleFactory: function (modulePath, thenMethod)
        {
            var that = this,
                defer = when.defer(),
                resolved = false;

            return {
                cb: function (req)
                {
                    if (!resolved)
                    {
                        require([modulePath], function (m)
                        {
                            if (!that.thrust)
                                that.thrust = Thrust.getInstance(that.thrustInstanceName);

                            var module = that.thrust.createModule(modulePath, m);
                            defer.resolve(module);
                            resolved = true;
                        });
                    }
                    else
                    {
                        defer.then(thenMethod);
                    }
                },
                promise: defer.promise
            }
        },
        /**
        Starts the given modules, if only one module is passed in, it will start that individually.

        @method startModules
        @param {Array of Object} args to pass onto thrust's start method.
        @param {Array of Module|Module} modules The modules to start
        **/
        startModules: function (args, modules)
        {
            var that = this;

            if (!that.thrust)
                that.thrust = Thrust.getInstance(that.thrustInstanceName);

            if (isArray(modules))
            {
                each(modules, function (x)
                {
                    defer.apply(null, [that.thrust.start.bind(that.thrust), x.name].concat(args));
                });
            }
            else
            {
                defer.apply(null, [that.thrust.start.bind(that.thrust), modules.name].concat(args));
            }
        }
    };

    return SinglePageApp;
});
define('thrust/spa', ['thrust/spa/main'], function (main) { return main; });
