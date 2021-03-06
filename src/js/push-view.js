(function (exp, b, c, s) {
  var opened,
    canPushState = /^f/.test(history.pushState),
    isSupported = b.classList && transitionEndEventName(),
    cb,
    hasPushState = false;

  exp.$pushView = {
    init: function (config) {
      var _t = this;

      if (!isSupported) {
        return false;
      }

      if (config) {
        if (config.elt) {
          b = config.elt;
        }
        if (config.prefix) {
          c = config.prefix;
        }
        if (config.pushState && canPushState) {
          hasPushState = config.pushState;
        }
      }

      b.classList.add(c + '-container');

      b.addEventListener(transitionEndEventName(), function (evt) {
        var cList = evt.target.classList;

        // Confirm the target is pushView container (b)
        if (cList.contains(c + '-container--animating')) {
          cList.remove(c + '-container--animating');

          if(cList.contains(c + '-container--closing')) {
            cList.remove(c + '-container--closing');
            cList.remove(c + '-container--opened');
          }

          if (cb) {
            cb();
          }
        }
      });

      if (hasPushState) {
        window.onpopstate = function () {
          if (opened) _t.close();
        };
      }
    },
    open: function (callback) {
      if (!isSupported) {
        if (callback) callback();
        return false;
      }

      cb = callback;
      b.classList.add(c + '-container--animating');
      b.classList.add(c + '-container--opened');

      if (hasPushState) {
        history.pushState(s, null, null);
      }

      opened = true;
    },
    close: function (callback) {
      if (!isSupported) {
        if (callback) callback();
        return false;
      }

      cb = callback;
      b.classList.add(c + '-container--animating');
      b.classList.add(c + '-container--closing');
      //b.classList.remove(c + '-container--opened');
      if (hasPushState && history.state === s) {
        history.back();
      }

      opened = false;
    }
  }
})(window, document.body, 'push', 'pushViewOpened');