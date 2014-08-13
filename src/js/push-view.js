(function(exp, b, c, s) {
    var opened, canPushState = /^f/.test(history.pushState), cb;

    exp.$pushView = {
        init: function(config) {
            var _t = this;
            if(config) {
                if(config.elt) {
                    b = config.elt;
                }
                if(config.prefix) {
                    c = config.prefix;
                }
                if(config.pushState == undefined) {
                    canPushState = false;
                } else {
                    canPushState = config.pushState;
                }
            }

            b.classList.add(c + '-container');
            b.addEventListener(transitionEndEventName(), function() {
                b.classList.remove(c + '-container--animating');
                if(cb) {
                    cb();
                }
            });

            if(canPushState) {
                window.onpopstate = function () {
                    if(opened) _t.close();
                };
            }
        },
        open: function(callback) {
            cb = callback;
            b.classList.add(c + '-container--animating');
            b.classList.add(c + '-container--opened');
            if(canPushState) {
                history.pushState(s, null, null);
            }

            opened = true;
        },
        close: function(callback) {
            cb = callback;
            b.classList.add(c + '-container--animating');
            b.classList.remove(c + '-container--opened');
            if(canPushState && history.state === s) {
                history.back();
            }

            opened = false;
        }
    }
})(window, document.body, 'push', 'pushViewOpened');