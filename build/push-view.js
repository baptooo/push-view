function transitionEndEventName () {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }
}
(function(exp, b, c, s) {
    var opened,
        canPushState = /^f/.test(history.pushState),
        cb,
        hasPushState = false;

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
                if(config.pushState && canPushState) {
                    hasPushState = config.pushState;
                }
            }

            b.classList.add(c + '-container');
            b.addEventListener(transitionEndEventName(), function() {
                b.classList.remove(c + '-container--animating');
                if(cb) {
                    cb();
                }
            });

            if(hasPushState) {
                window.onpopstate = function () {
                    if(opened) _t.close();
                };
            }
        },
        open: function(callback) {
            cb = callback;
            b.classList.add(c + '-container--animating');
            b.classList.add(c + '-container--opened');

            if(hasPushState) {
                history.pushState(s, null, null);
            }

            opened = true;
        },
        close: function(callback) {
            cb = callback;
            b.classList.add(c + '-container--animating');
            b.classList.remove(c + '-container--opened');
            if(hasPushState && history.state === s) {
                history.back();
            }

            opened = false;
        }
    }
})(window, document.body, 'push', 'pushViewOpened');