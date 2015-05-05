///// <reference path="~/Scripts/lib/jasmine.js" />
//(function (require, undefined)
//{
//    /*global jasmine:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
//    "use strict";
//    require(['testing/jasmine', 'core', 'core/dom', 'core/util', 'jquery'],
//    function (jasmineEnv, Core, CoreDOM, util, jQuery)
//    {
//        var extend = util.extend,
//            noop = util.noop,
//            isEmpty = util.isEmptyObject;

//        var dummyModuleName = 'myTestModule',
//            dummyOptions = {
//                init: noop,
//                destroy: noop,
//                requireDOM: 1
//            };

//        describe('core/dom', function ()
//        {
//            afterEach(function ()
//            {
//                Core.__clearModules();
//            });

//            it('creates has facade created by Core.create', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
//                Core.start();
//                Core.start(module.name);
//                var o2 = extend({}, dummyOptions);
//                delete o2.requireDOM;
//                var module2 = Core.create(dummyModuleName + '2', o2).module;
//                Core.start(module2.name);

//                expect(module.dom).toBeDefined();
//                expect(module2.dom).toBeUndefined();
//            });

//            it('selects context', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
//                Core.start();

//                Core.start(module.name);

//                waits(100);
//                expect(module.dom()._context[0]).toBe(document);
//                expect(module.dom('body')._context[0]).toBe(jQuery('body')[0]);
//            });

//            it('selects default context', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({ context: 'body' }, dummyOptions)).module;
//                Core.start();
//                Core.start(module.name);

//                waits(100);
//                expect(module.dom().is('body')).toBe(true);
//            });

//            it('binds events', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;

//                Core.start();
//                Core.start(module.name);

//                var spy = jasmine.createSpy();
//                waits(100);
//                module.dom('body').on('click', spy);
//                module.dom('body').trigger('click');
//                expect(spy).toHaveBeenCalled();
//            });

//            it('unbinds events', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
//                Core.start();
//                Core.start(module.name);

//                var spy = jasmine.createSpy();
//                waits(100);
//                module.dom('body').on('click', spy);
//                module.dom('body').off('click', spy);
//                module.dom('body').trigger('click');
//                expect(spy).not.toHaveBeenCalled();
//            });

//            it('binds and unbinds modules events only', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
//                var module2 = Core.create(dummyModuleName + '2', extend({}, dummyOptions)).module;

//                Core.start();
//                Core.start(module.name);
//                Core.start(module2.name);

//                var spy = jasmine.createSpy(),
//                    spy2 = jasmine.createSpy();

//                waits(100);
//                module.dom('body').on('click', spy);
//                module2.dom('body').on('click', spy2);
//                module.dom('body').trigger('click');
//                expect(spy).toHaveBeenCalled();
//                expect(spy2).toHaveBeenCalled();
//                spy.reset();
//                spy2.reset();
//                module.dom('body').off('click', spy);
//                module.dom('body').trigger('click');
//                expect(spy).not.toHaveBeenCalled();
//                expect(spy2).toHaveBeenCalled();
//            });

//            it('binds and unbinds modules events only #2', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;
//                var module2 = Core.create(dummyModuleName + '2', extend({}, dummyOptions)).module;

//                Core.start();
//                Core.start(module.name);
//                Core.start(module2.name);

//                var spy = jasmine.createSpy(),
//                    spy2 = jasmine.createSpy(),
//                    spy3 = jasmine.createSpy(),
//                    spy4 = jasmine.createSpy();

//                waits(100);
//                //module.dom('body').on('click', spy);
//                //module2.dom('body').on('click', spy2);
//                module.dom('body').on('focus', spy3);
//                module2.dom('body').on('focus', spy4);
//                //module.dom('body').trigger('click');
//                module.dom('body').trigger('focus');
//                //expect(spy).toHaveBeenCalled();
//                //expect(spy2).toHaveBeenCalled();
//                expect(spy3).toHaveBeenCalled();
//                expect(spy4).toHaveBeenCalled();

//                //spy.reset();
//                //spy2.reset();
//                spy3.reset();
//                spy4.reset();
//                //module.dom('body').off('click');
//                //module.dom('body').trigger('click');
//                //expect(spy).not.toHaveBeenCalled();
//                //expect(spy2).toHaveBeenCalled();
//                //expect(spy3).not.toHaveBeenCalled();
//                //expect(spy4).not.toHaveBeenCalled();

//                //spy.reset();
//                //spy2.reset();
//                //spy3.reset();
//                //spy4.reset();
//                module2.dom('body').off('focus');
//                module.dom('body').trigger('focus');
//                //expect(spy).not.toHaveBeenCalled();
//                //expect(spy2).not.toHaveBeenCalled();
//                expect(spy3).toHaveBeenCalled();
//                expect(spy4).not.toHaveBeenCalled();
//            });
//        });

//        describe('find', function ()
//        {
//            afterEach(function ()
//            {
//                Core.__clearModules();
//            });

//            it('finds', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;

//                Core.start();
//                Core.start(module.name);

//                var spy = jasmine.createSpy(),
//                    spy2 = jasmine.createSpy(),
//                    spy3 = jasmine.createSpy(),
//                    spy4 = jasmine.createSpy();

//                expect(module.dom()[0]).toBe(document);
//                expect(module.dom().find('body').length).toBe(1);
//                expect(module.dom().find('body')[0]).toBe(jQuery('body')[0]);
//                expect(module.dom().find('head').length).toBe(1);
//                expect(module.dom().find('head')[0]).toBe(jQuery('head')[0]);

//                expect(module.dom()[0]).toBe(document);
//                expect(module.dom().$('body').length).toBe(1);
//                expect(module.dom().$('body')[0]).toBe(jQuery('body')[0]);
//                expect(module.dom().$('head').length).toBe(1);
//                expect(module.dom().$('head')[0]).toBe(jQuery('head')[0]);
//            });

//        });

//        describe('changeContext', function ()
//        {
//            afterEach(function ()
//            {
//                Core.__clearModules();
//            });

//            it('changes', function ()
//            {
//                var module = Core.create(dummyModuleName, extend({}, dummyOptions)).module;

//                Core.start();
//                Core.start(module.name);

//                var spy = jasmine.createSpy(),
//                    spy2 = jasmine.createSpy(),
//                    spy3 = jasmine.createSpy(),
//                    spy4 = jasmine.createSpy();

//                expect(module.dom()[0]).toBe(document);
//                expect(module.dom()[0]).not.toBe(jQuery('body')[0]);
//                module.dom().changeContext('body');
//                expect(module.dom()[0]).not.toBe(document);
//                expect(module.dom()[0]).toBe(jQuery('body')[0]);
//            });
//        });

//        describe('array', function ()
//        {
//            it('must allow push', function ()
//            {
//                var array = CoreDOM.query([]);
//                var body = CoreDOM.query('body')[0];
//                var head = CoreDOM.query('head')[0];
//                array.push(CoreDOM.query('body')[0]);
//                expect(array.length).toBe(1);
//                expect(array[0]).toBe(body);
//                expect(array[0]).not.toBe(head);
//                array.push(CoreDOM.query('head')[0]);
//                expect(array.length).toBe(2);
//                expect(array[1]).not.toBe(body);
//                expect(array[1]).toBe(head);
//            });
//        });

//        describe('DOM Events', function ()
//        {
//            Core.__clearModules();
//            it('accepts the convention based dom events', function ()
//            {
//                jQuery('<div class="myTestClass"></div>').appendTo('body');
//                var spy = jasmine.createSpy(),
//                        varValue = 5,
//                        module = Core.create('DEtestModule', extend({
//                            context: 'div.myTestClass',
//                            domEvents: {
//                                'test1': function ()
//                                {
//                                    spy(1);
//                                }
//                            }
//                        }, dummyOptions)),
//                        module2 = Core.create('DEtestModule2', extend({
//                            context: 'body',
//                            domEvents: {
//                                'test2': ['div.myTestClass', function ()
//                                {
//                                    spy(2);
//                                } ]
//                            }
//                        }, dummyOptions)),
//                        module3 = Core.create('DEtestModule3', extend({
//                            context: 'body',
//                            domEvents: {
//                                'test3': ['div.myTestClass', { myData: 345 }, function ()
//                                {
//                                    spy(3);
//                                } ]
//                            }
//                        }, dummyOptions)),
//                        module4 = Core.create('DEtestModule4', extend({
//                            callSpy: function ()
//                            {
//                                spy(4);
//                            },
//                            context: 'div.myTestClass',
//                            domEvents: {
//                                'test4': 'callSpy'
//                            }
//                        }, dummyOptions)),
//                        module5 = Core.create('DEtestModule5', extend({
//                            callSpy: function ()
//                            {
//                                spy(5);
//                            },
//                            context: 'body',
//                            domEvents: {
//                                'test5': ['div.myTestClass', 'callSpy']
//                            }
//                        }, dummyOptions)),
//                        module6 = Core.create('DEtestModule6', extend({
//                            callSpy: function ()
//                            {
//                                spy(6);
//                            },
//                            context: 'body',
//                            domEvents: {
//                                'test6': ['div.myTestClass', { myData: 345 }, 'callSpy']
//                            }
//                        }, dummyOptions));

//                Core.start();

//                Core.start('DEtestModule');
//                Core.start('DEtestModule2');
//                Core.start('DEtestModule3');
//                Core.start('DEtestModule4');
//                Core.start('DEtestModule5');
//                Core.start('DEtestModule6');

//                waits(200);

//                runs(function()
//                {
//                    jQuery('div.myTestClass')
//                        .trigger('test1')
//                        .trigger('test2')
//                        .trigger('test3')
//                        .trigger('test4')
//                        .trigger('test5')
//                        .trigger('test6');
//                });
//                waits(1000);
//                runs(function ()
//                {
//                    expect(spy).toHaveBeenCalledWith(1);
//                    expect(spy).toHaveBeenCalledWith(2);
//                    expect(spy).toHaveBeenCalledWith(3);
//                    expect(spy).toHaveBeenCalledWith(4);
//                    expect(spy).toHaveBeenCalledWith(5);
//                    expect(spy).toHaveBeenCalledWith(6);
//                });
//            });
//        });

//        describe('DOM Actions', function ()
//        {
//            Core.__clearModules();
//            var spy = jasmine.createSpy(),
//                varValue = 5,
//                module = Core.create('DAtestModule', extend({
//                    callSpy: function() { spy(2); },
//                    callSpy4: function() { spy(4, this); },
//                    context: 'div',
//                    domActions: {
//                        click: {
//                            'testAction': function () { spy(1); },
//                            'testAction2': 'callSpy',
//                            'testAction3': [function () { spy(3, this); }, varValue],
//                            'testAction4': ['callSpy4', varValue]
//                        }
//                    },
//                }, dummyOptions));
//            Core.start();

//            Core.start('DAtestModule');


//            var fm = '<a data-action-click="{0}"></a>',
//                div1 = jQuery(util.format(fm, 'testAction')),
//                div2 = jQuery(util.format(fm, 'testAction2')),
//                div3 = jQuery(util.format(fm, 'testAction3')),
//                div4 = jQuery(util.format(fm, 'testAction4'));
//            jQuery(function()
//            {
//                $('body')
//                    .append(div1)
//                    .append(div2)
//                    .append(div3)
//                    .append(div4);
//                div1.trigger('click');
//                div2.trigger('click');
//                div3.trigger('click');
//                div4.trigger('click');
//            });

//            waits(200);
//            runs(function()
//            {
//                expect(spy).toHaveBeenCalledWith(1);
//                expect(spy).toHaveBeenCalledWith(2);
//                expect(spy).toHaveBeenCalledWith(3, 5);
//                expect(spy).toHaveBeenCalledWith(4, 5);
//            });
//        });
//        //jasmineEnv.execute();
//    });
//})(require);
