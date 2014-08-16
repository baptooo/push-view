'use strict';

describe('Push View', function() {
    var containerClass = '-container',
        animatingClass = containerClass + '--animating',
        openedClass = containerClass + '--opened',
        pushStateName = 'pushViewOpened';

    // Clearing body or elt classes
    function resetPlugin(elt) {
        $pushView.init({
            prefix: 'push',
            elt: (elt || document.body),
            pushState: false
        });
        window.onpopstate = null;
        (elt || document.body).className = '';
    }

    describe('initialization', function() {
        describe('with no config', function() {
            beforeEach(function() {
                $pushView.init();
            });
            it('should add default class push-container to body', function() {
                expect(document.body.className).toMatch('push' + containerClass);
            });
        });

        describe('with classPrefix config', function() {
            beforeEach(function() {
                resetPlugin();

                $pushView.init({
                    prefix: 'karma-test'
                });
            });
            it('should add prefixed class karma-test-container to body', function() {
                expect(document.body.className).toMatch('karma-test' + containerClass);
            })
        });

        describe('with specific element config', function() {
            var elt;
            beforeEach(function() {
                // Clearing body classes
                resetPlugin();

                elt = document.createElement('div');
                elt.id = 'karma-test-elt';
                document.body.appendChild(elt);

                $pushView.init({
                    elt: elt,
                    prefix: 'push'
                });
            })

            it('should not add container class to body', function() {
                expect(document.body.className).not.toMatch('push' + containerClass);
            });

            it('should add container class to specific element', function() {
                expect(elt.className).toMatch('push' + containerClass);
            });
        });

        describe('with no pushState', function() {
            beforeEach(function() {
                resetPlugin();
            });

            it('should not set the window onpopstate event', function() {
                expect(window.onpopstate).toBeNull();
            });
        });

        describe('with pushState', function() {
            beforeEach(function() {
                $pushView.init({
                    pushState: true
                });
            });

            it('should set the window onpopstate event', function() {
                expect(window.onpopstate).not.toBeNull();
            });
        });
    });

    describe('open and close:', function() {
        beforeEach(function() {
            resetPlugin();
            spyOn($pushView, 'open').and.callThrough();
            spyOn($pushView, 'close').and.callThrough();
            $pushView.init();
        });

        describe('open with no options', function() {
            beforeEach(function() {
                $pushView.open();
            });

            it('should have called the open method', function() {
                expect($pushView.open).toHaveBeenCalled();
            });

            it('should add the opened class to the container', function() {
                expect(document.body.className).toMatch('push' + openedClass);
            });

            it('should add the animating class to the container', function() {
                expect(document.body.className).toMatch('push' + animatingClass);
            });
        });

        describe('close with no options', function() {
            beforeEach(function() {
                $pushView.close();
            });

            it('should have called the close method', function() {
                expect($pushView.close).toHaveBeenCalled();
            });

            it('should remove the opened class to the container', function() {
                expect(document.body.className).not.toMatch('push' + openedClass);
            });

            it('should keep the animating class to the container', function() {
                expect(document.body.className).toMatch('push' + animatingClass);
            });
        });

        describe('open with callback', function() {
            var cb;
            beforeEach(function(done) {
                cb = {
                    open: function() {
                        done();
                    }
                };
                spyOn(cb, 'open').and.callThrough();

                var transitionEnded = false;
                $pushView.open(function() {
                    if(!transitionEnded) {
                        cb.open();
                        transitionEnded = true;
                    }
                });
            });

            it('should call the given callback after transition ended', function() {
                expect(cb.open).toHaveBeenCalled();
            });

            it('should have removed the animating class from the container', function() {
                expect(document.body.className).not.toMatch('push' + animatingClass);
            });

            it('should keep the opened class on the container', function() {
                expect(document.body.className).toMatch('push' + openedClass);
            });
        });

        describe('close with callback', function() {
            var cb;
            beforeEach(function(done) {
                cb = {
                    close: function() {
                        done();
                    }
                };
                spyOn(cb, 'close').and.callThrough();

                var transitionEnded = false;
                $pushView.close(function() {
                    if(!transitionEnded) {
                        cb.close();
                        transitionEnded = true;
                    }
                });
            });

            it('should call the given callback after transition ended', function() {
                expect(cb.close).toHaveBeenCalled();
            });

            it('should have removed the animating class from the container', function() {
                expect(document.body.className).not.toMatch('push' + animatingClass);
            });

            it('should have removed the opened class from the container', function() {
                expect(document.body.className).not.toMatch('push' + openedClass);
            });
        });

        describe('with pushState', function() {
            beforeEach(function() {
                resetPlugin();

                spyOn(history, 'pushState');
                spyOn(history, 'back');

                $pushView.init({
                    pushState: true
                });
            });

            describe('open', function() {
                beforeEach(function() {
                    $pushView.open();
                });

                it('should push a state to history called pushStateName', function() {
                    expect(history.pushState).toHaveBeenCalledWith(pushStateName, null, null);
                });

                it('should set the history state with pushStateName', function() {
                    expect(history.state).toEqual(pushStateName);
                })
            });

            describe('close', function() {
                beforeEach(function() {
                    $pushView.close();
                });

                it('should go back to history if a state was pushed', function() {
                    expect(history.back).toHaveBeenCalled();
                });
            })
        });
    });
});