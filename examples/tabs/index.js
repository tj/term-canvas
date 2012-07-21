
/**
 * Module dependencies.
 */

var Canvas = require('../..')
  , canvas = new Canvas(100, 100)
  , ctx = canvas.getContext('2d')
  , Tabs = require('./tabs')
  , Tab = require('./tab');

ctx.clear();

var tabs = new Tabs;
tabs.add(new Tab('Tab 1'))
tabs.add(new Tab('Tab 2'))
tabs.add(new Tab('Tab 3'))
tabs.add(new Tab('Tab 4'))
tabs.add(new Tab('Tab 5'))

process.stdin.resume();
process.stdin.setRawMode(true);

require('readline').emitKeypressEvents(process.stdin);

process.stdin.on('keypress', function(s, key) {
  switch (key.name) {
    case 'c':
      if (key.ctrl) {
        ctx.reset();
        process.exit();
      }
      break;
    case 'up':
      tabs.prev();
      tabs.render(ctx);
      break;
    case 'down':
      tabs.next();
      tabs.render(ctx);
      break;
  }
});

ctx.hideCursor();
tabs.render(ctx);
