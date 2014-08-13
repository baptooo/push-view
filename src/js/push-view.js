(function(exp, b, c, s) {
    var opened, canPushState = /^f/.test(history.pushState), cb;

    exp.$pushView = {
        init: function(config) {
            var _t = this;
            if(config) {
                if(config.elt) {
                    b = elt;
                }
                if(config.prefix) {
                    c = cPrefix;
                }
                if(config.pushState == undefined) {
                    canPushState = false;
                } else {
                    canPushState = pushState;
                }
                if(config.callback) {
                    cb = config.callback;
                }
            }

            b.classList.add(c + '-container');
            b.addEventListener(transitionEndEventName(), function() {
                b.classList.remove(c + '-container--animating');
                if(cb) {
                    cb(opened);
                }
            });

            if(canPushState) {
                window.onpopstate = function () {
                    if(opened) _t.close();
                };
            }
        },
        open: function() {
            b.classList.add(c + '-container--animating');
            b.classList.add(c + '-container--opened');
            if(canPushState) {
                history.pushState(s, null, null);
            }

            opened = true;
        },
        close: function() {
            b.classList.add(c + '-container--animating');
            b.classList.remove(c + '-container--opened');
            if(canPushState && history.state === s) {
                history.back();
            }

            opened = false;
        }
    }
})(window, document.body, 'push', 'pushViewOpened');