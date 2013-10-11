;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Cylon, Modernizr, getTransformProperty, main, ready;

  ready = require('./vendor/ready');

  require('browsernizr/test/css/rgba');

  require('browsernizr/test/css/transforms3d');

  Modernizr = require('browsernizr');

  getTransformProperty = function(element) {
    var prop, properties, _i, _len;
    properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      prop = properties[_i];
      if (element.style[prop] != null) {
        return prop;
      }
    }
    return properties[0];
  };

  Cylon = (function() {
    /* Just a stupid Hello World example*/

    function Cylon(element) {
      var el, letter, text, _i, _len;
      this.element = element;
      text = this.element.innerHTML;
      this.element.innerHTML = '';
      this.letters = [];
      for (_i = 0, _len = text.length; _i < _len; _i++) {
        letter = text[_i];
        el = document.createElement('span');
        el.innerHTML = letter.replace(' ', '&nbsp;');
        this.element.appendChild(el);
        this.letters.push(el);
      }
      this.tprop = getTransformProperty(this.element);
    }

    Cylon.prototype.start = function() {
      var last, step,
        _this = this;
      last = Date.now();
      step = function() {
        var delta, time;
        time = Date.now();
        delta = time - last;
        _this.step(time, delta);
        last = time;
      };
      this.timer = setInterval(step, 1000 / 30);
      return step();
    };

    Cylon.prototype.stop = function() {
      clearInterval(this.timer);
      return this.timer = null;
    };

    Cylon.prototype.step = function(time, delta) {
      var a, el, i, rgb, _i, _len, _ref, _results;
      _ref = this.letters;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        el = _ref[i];
        a = Math.sin((time / 400) - 5 * (i / this.letters.length));
        a = (a + 1) / 2;
        rgb = [10 + Math.round(a * 245), 10, 10];
        el.style.color = "rgb(" + (rgb.join(',')) + ")";
        el.style.textShadow = "0 0 " + (a / 12) + "em red";
        if (Modernizr.csstransforms3d) {
          _results.push(el.style[this.tprop] = "rotateX(" + (-20 + a * 40) + "deg)");
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Cylon;

  })();

  main = function() {
    var cylon;
    cylon = new Cylon(document.querySelector('h1'));
    return cylon.start();
  };

  ready(main);

}).call(this);


},{"./vendor/ready":2,"browsernizr":3,"browsernizr/test/css/rgba":28,"browsernizr/test/css/transforms3d":29}],2:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, context, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else context[name] = definition()
}('domready', this, function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loaded = /^loade|c/.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})

},{}],3:[function(require,module,exports){
var Modernizr = require('./lib/Modernizr'),
    ModernizrProto = require('./lib/ModernizrProto'),
    classes = require('./lib/classes'),
    testRunner = require('./lib/testRunner'),
    setClasses = require('./lib/setClasses');

// Run each test
testRunner();

// Remove the "no-js" class if it exists
setClasses(classes);

delete ModernizrProto.addTest;
delete ModernizrProto.addAsyncTest;

// Run the things that are supposed to run after the tests
for (var i = 0; i < Modernizr._q.length; i++) {
  Modernizr._q[i]();
}

module.exports = Modernizr;

},{"./lib/Modernizr":4,"./lib/ModernizrProto":5,"./lib/classes":6,"./lib/setClasses":19,"./lib/testRunner":25}],4:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');


  // Fake some of Object.create
  // so we can force non test results
  // to be non "own" properties.
  var Modernizr = function(){};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it
  // rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  

module.exports = Modernizr;
},{"./ModernizrProto":5}],5:[function(require,module,exports){
var tests = require('./tests');


  var ModernizrProto = {
    // The current version, dummy
    _version : 'v3.0.0pre',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config : {
      classPrefix : '',
      enableClasses : true
    },

    _q : [],

    addTest : function( name, fn, options ) {
      tests.push({name : name, fn : fn, options : options });
    },

    addAsyncTest : function (fn) {
      tests.push({name : null, fn : fn});
    }
  };

  

module.exports = ModernizrProto;
},{"./tests":27}],6:[function(require,module,exports){

  var classes = [];
  
module.exports = classes;
},{}],7:[function(require,module,exports){

  /**
   * contains returns a boolean for if substr is found within str.
   */
  function contains( str, substr ) {
    return !!~('' + str).indexOf(substr);
  }

  
module.exports = contains;
},{}],8:[function(require,module,exports){
require('./fnBind');


  var createElement = document.createElement.bind(document);
  

module.exports = createElement;
},{"./fnBind":12}],9:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var omPrefixes = require('./omPrefixes');


  var cssomPrefixes = omPrefixes.split(' ');
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  

module.exports = cssomPrefixes;
},{"./ModernizrProto":5,"./omPrefixes":18}],10:[function(require,module,exports){

  var docElement = document.documentElement;
  
module.exports = docElement;
},{}],11:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var omPrefixes = require('./omPrefixes');


  var domPrefixes = omPrefixes.toLowerCase().split(' ');
  ModernizrProto._domPrefixes = domPrefixes;
  

module.exports = domPrefixes;
},{"./ModernizrProto":5,"./omPrefixes":18}],12:[function(require,module,exports){
var slice = require('./slice');


  // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
  // es5.github.com/#x15.3.4.5

  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {

      var target = this;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1);
      var bound = function() {

        if (this instanceof bound) {

          var F = function(){};
          F.prototype = target.prototype;
          var self = new F();

          var result = target.apply(
            self,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return self;

        } else {

          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );

        }

      };

      return bound;
    };
  }

  

module.exports = Function.prototype.bind;
},{"./slice":20}],13:[function(require,module,exports){
var createElement = require('./createElement');


  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if(!body) {
      // Can't use the real body create a fake one.
      body = createElement('body');
      body.fake = true;
    }

    return body;
  }

  

module.exports = getBody;
},{"./createElement":8}],14:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var docElement = require('./docElement');
var createElement = require('./createElement');
var getBody = require('./getBody');


  // Inject element with style element and some CSS rules
  function injectElementWithStyles( rule, callback, nodes, testnames ) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if ( parseInt(nodes, 10) ) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while ( nodes-- ) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
    // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
    // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
    // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
    // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
    style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
    div.id = mod;
    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).innerHTML += style;
    body.appendChild(div);
    if ( body.fake ) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if ( body.fake ) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  

module.exports = injectElementWithStyles;
},{"./ModernizrProto":5,"./createElement":8,"./docElement":10,"./getBody":13}],15:[function(require,module,exports){

  /**
   * is returns a boolean for if typeof obj is exactly type.
   */
  function is( obj, type ) {
    return typeof obj === type;
  }
  
module.exports = is;
},{}],16:[function(require,module,exports){
var Modernizr = require('./Modernizr');
var modElem = require('./modElem');


  var mStyle = {
    style : modElem.elem.style
  };

  // kill ref for gc, must happen before
  // mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });

  

module.exports = mStyle;
},{"./Modernizr":4,"./modElem":17}],17:[function(require,module,exports){
var Modernizr = require('./Modernizr');
var createElement = require('./createElement');


  /**
   * Create our "modernizr" element that we do most feature tests on.
   */
  var modElem = {
    elem : createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });

  

module.exports = modElem;
},{"./Modernizr":4,"./createElement":8}],18:[function(require,module,exports){

  // Following spec is to expose vendor-specific style properties as:
  //   elem.style.WebkitBorderRadius
  // and the following would be incorrect:
  //   elem.style.webkitBorderRadius

  // Webkit ghosts their properties in lowercase but Opera & Moz do not.
  // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
  //   erik.eae.net/archives/2008/03/10/21.48.10/

  // More here: github.com/Modernizr/Modernizr/issues/issue/21
  var omPrefixes = 'Webkit Moz O ms';
  
module.exports = omPrefixes;
},{}],19:[function(require,module,exports){
var Modernizr = require('./Modernizr');
var docElement = require('./docElement');


  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses( classes ) {
    var className = docElement.className;
    var removeClasses = [];
    var regex;

    // Change `no-js` to `js` (we do this regardles of the `enableClasses`
    // option)
    className = className.replace(/(^|\s)no-js(\s|$)/, '$1js$2');

    if(Modernizr._config.enableClasses) {
      // Need to remove any existing `no-*` classes for features we've detected
      for(var i = 0; i < classes.length; i++) {
        if(!classes[i].match('^no-')) {
          removeClasses.push('no-' + classes[i]);
        }
      }

      // Use a regex to remove the old...
      regex = new RegExp('(^|\\s)' + removeClasses.join('|') + '(\\s|$)', 'g');
      className = className.replace(regex, '$1$2');

      // Then add the new...
      className += ' ' + classes.join(' ' + (Modernizr._config.classPrefix || ''));

      // Apply
      docElement.className = className;
    }

  }

  

module.exports = setClasses;
},{"./Modernizr":4,"./docElement":10}],20:[function(require,module,exports){
var classes = require('./classes');


  var slice = classes.slice;
  

module.exports = slice;
},{"./classes":6}],21:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var testPropsAll = require('./testPropsAll');


  var testAllProps = ModernizrProto.testAllProps = testPropsAll;
  

module.exports = testAllProps;
},{"./ModernizrProto":5,"./testPropsAll":24}],22:[function(require,module,exports){
var is = require('./is');
require('./fnBind');


  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   */
  function testDOMProps( props, obj, elem ) {
    var item;

    for ( var i in props ) {
      if ( props[i] in obj ) {

        // return the property name as a string
        if (elem === false) return props[i];

        item = obj[props[i]];

        // let's bind a function (and it has a bind method -- certain native objects that report that they are a
        // function don't [such as webkitAudioContext])
        if (is(item, 'function') && 'bind' in item){
          // default to autobind unless override
          return item.bind(elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  

module.exports = testDOMProps;
},{"./fnBind":12,"./is":15}],23:[function(require,module,exports){
var contains = require('./contains');
var mStyle = require('./mStyle');
var createElement = require('./createElement');


  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Because the testing of the CSS property names (with "-", as
  // opposed to the camelCase DOM properties) is non-portable and
  // non-standard but works in WebKit and IE (but not Gecko or Opera),
  // we explicitly reject properties with dashes so that authors
  // developing in WebKit or IE first don't end up with
  // browser-specific content by accident.

  function testProps( props, prefixed ) {
    var afterInit;

    // If we don't have a style element, that means
    // we're running async or after the core tests,
    // so we'll need to create our own elements to use
    if ( !mStyle.style ) {
      afterInit = true;
      mStyle.modElem = createElement('modernizr');
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we
    // we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    for ( var i in props ) {
      var prop = props[i];
      if ( !contains(prop, "-") && mStyle.style[prop] !== undefined ) {
        cleanElems();
        return prefixed == 'pfx' ? prop : true;
      }
    }
    cleanElems();
    return false;
  }

  

module.exports = testProps;
},{"./contains":7,"./createElement":8,"./mStyle":16}],24:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var cssomPrefixes = require('./cssomPrefixes');
var is = require('./is');
var testProps = require('./testProps');
var domPrefixes = require('./domPrefixes');
var testDOMProps = require('./testDOMProps');


  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   *   We specify literally ALL possible (known and/or likely) properties on
   *   the element including the non-vendor prefixed one, for forward-
   *   compatibility.
   */
  function testPropsAll( prop, prefixed, elem ) {

    var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
    props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if(is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  //   or any of its vendor-prefixed variants, is recognized
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  

module.exports = testPropsAll;
},{"./ModernizrProto":5,"./cssomPrefixes":9,"./domPrefixes":11,"./is":15,"./testDOMProps":22,"./testProps":23}],25:[function(require,module,exports){
var tests = require('./tests');
var Modernizr = require('./Modernizr');
var classes = require('./classes');
var is = require('./is');


  // Run through all tests and detect their support in the current UA.
  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    for ( var featureIdx in tests ) {
      featureNames = [];
      feature = tests[featureIdx];
      // run the test, throw the return value into the Modernizr,
      //   then based on that boolean, define an appropriate className
      //   and push it into an array of classes we'll join later.
      //
      //   If there is no name, it's an 'async' test that is run,
      //   but not directly added to the object. That should
      //   be done with a post-run addTest call.
      if ( feature.name ) {
        featureNames.push(feature.name.toLowerCase());

        if (feature.options && feature.options.aliases && feature.options.aliases.length) {
          // Add all the aliases into the names list
          for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
          }
        }
      }

      // Run the test, or use the raw value if it's not a function
      result = is(feature.fn, 'function') ? feature.fn() : feature.fn;

      // Set each of the names on the Modernizr object
      for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
        Modernizr[featureNames[nameIdx]] = result;
        classes.push((Modernizr[featureNames[nameIdx]] ? '' : 'no-') + featureNames[nameIdx]);
      }
    }
  }

  

module.exports = testRunner;
},{"./Modernizr":4,"./classes":6,"./is":15,"./tests":27}],26:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var injectElementWithStyles = require('./injectElementWithStyles');


  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  

module.exports = testStyles;
},{"./ModernizrProto":5,"./injectElementWithStyles":14}],27:[function(require,module,exports){

  var tests = [];
  
module.exports = tests;
},{}],28:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var createElement = require('./../../lib/createElement');


  // css-tricks.com/rgba-browser-support/

  Modernizr.addTest('rgba', function() {
    var elem = createElement('div');
    var style = elem.style;
    style.cssText = 'background-color:rgba(150,255,150,.5)';

    return ('' + style.backgroundColor).indexOf('rgba') > -1;
  });


},{"./../../lib/Modernizr":4,"./../../lib/createElement":8}],29:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var testAllProps = require('./../../lib/testAllProps');
var testStyles = require('./../../lib/testStyles');
var docElement = require('./../../lib/docElement');


  Modernizr.addTest('csstransforms3d', function() {
    var ret = !!testAllProps('perspective');

    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
    //   some conditions. As a result, Webkit typically recognizes the syntax but
    //   will sometimes throw a false positive, thus we must do a more thorough check:
    if ( ret && 'webkitPerspective' in docElement.style ) {

      // Webkit allows this media query to succeed only if the feature is enabled.
      // `@media (transform-3d),(-webkit-transform-3d){ ... }`
      // If loaded inside the body tag and the test element inherits any padding, margin or borders it will fail #740
      testStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}', function( node, rule ) {
        ret = node.offsetLeft === 9 && node.offsetHeight === 5;
      });
    }
    return ret;
  });


},{"./../../lib/Modernizr":4,"./../../lib/docElement":10,"./../../lib/testAllProps":21,"./../../lib/testStyles":26}]},{},[1])
;