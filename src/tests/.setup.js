require('babel-register')({
   presets: [ 'es2015' ],
   plugins: [
     "transform-decorators-legacy",
     "transform-class-properties"
   ]
});

require('isomorphic-fetch');

var jsdom = require('jsdom').jsdom;

//svg and scss files break tests... current solution:
function noop() {
  return null;
}

require.extensions['.svg'] = noop;
require.extensions['.scss'] = noop;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
