/// <reference path="~/Scripts/lib/jasmine.js" />
(function (require, undefined)
{
    /*global jasmine:true, describe:true, it:true, xit:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
    "use strict";
    require(['testing/jasmine', 'core', 'core/data', 'core/util'],
    function (jasmineEnv, Core, Data, util)
    {
        var extend = util.extend,
            noop = util.noop,
            isEmpty = util.isEmptyObject;

        var dummyModuleName = 'myTestModule',
            dummyOptions = {
                init: noop,
                destroy: noop,
                requireData: 1
            };

        describe('core/data', function ()
        {
            afterEach(function ()
            {
                Core.__clearModules();
            });

            it('creates has facade created by Core.create', function ()
            {
                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
                var o2 = extend({}, dummyOptions);
                delete o2.requireData;
                var module2 = Core.create(dummyModuleName + '2', o2).module;
                expect(module.data).toBeDefined();
                expect(module2.data).toBeUndefined();
            });

            it('gets data', function ()
            {
                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
                var spy = jasmine.createSpy();
                module.data.get('/p/Navigation/GetMenu').done(spy);
                waitsFor(function ()
                {
                    return spy.callCount > 0;
                }, 'data did not get recieved', 1000);

                runs(function ()
                {
                    expect(spy).toHaveBeenCalled();
                });
            });

            xit('posts data', function ()
            {
                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
                var spy = jasmine.createSpy();
                module.data.post('/p/Navigation/GetMenu').done(spy);
                waitsFor(function ()
                {
                    return spy.callCount > 0;
                }, 'data did not get recieved', 1000);

                runs(function ()
                {
                    expect(spy).toHaveBeenCalled();
                });
            });

            it('ajax to get data', function ()
            {
                var module = Core.create(dummyModuleName + '3', extend({}, dummyOptions)).module;
                var spy = jasmine.createSpy();
                module.data.ajax('/p/Navigation/GetMenu', { type: 'get' }).done(spy);
                waitsFor(function ()
                {
                    return spy.callCount > 0;
                }, 'data did not get recieved', 1000);

                runs(function ()
                {
                    expect(spy).toHaveBeenCalled();
                });
            });

            it('disllows fast ajax', function ()
            {
                var module = Core.create(dummyModuleName + '4', extend({}, dummyOptions)).module;
                var spy = jasmine.createSpy();
                module.data.fastAjax('/p/Navigation/GetMenu', { type: 'get' }).done(spy);
                waitsFor(function ()
                {
                    return spy.callCount > 0;
                }, 'data did not get recieved', 1000);

                runs(function ()
                {
                    expect(spy).toHaveBeenCalled();
                });
            });

        });
    });
})(require);
