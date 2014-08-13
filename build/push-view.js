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
    var opened, canPushState = /^f/.test(history.pushState);

    exp.$pushView = {
        init: function(elt, cPrefix, pushState) {
            var _t = this;
            if(elt) {
                b = elt;
            }
            if(cPrefix) {
                c = cPrefix;
            }
            if(pushState == undefined) {
                canPushState = false;
            } else {
                canPushState = pushState;
            }

            b.classList.add(c + '-container');
            b.addEventListener(transitionEndEventName(), function() {
                b.classList.remove(c + '-container--animating');
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