
/**
 * Module dependencies.
 */

var Canvas = require('../');

var canvas = new Canvas(100, 100)
  , ctx = canvas.getContext('2d');

ctx.clear();

function Tabs() {
  this.tabs = [];
  this.active = 0;
}

Tabs.prototype.add = function(tab){
  this.tabs.push(tab);
};

Tabs.prototype.render = function(ctx){
  var self = this;
  var y = 1;
  ctx.save();
  ctx.translate(0, y);
  this.tabs.forEach(function(tab, i){
    tab.active = i == self.active;
    tab.render(ctx);
    ctx.translate(0, y += 3);
  });
  ctx.restore();
};

Tabs.prototype.prev = function(){
  this.active = Math.max(0, this.active - 1);
};

Tabs.prototype.next = function(){
  this.active = Math.min(this.tabs.length - 1, this.active + 1);
};

function Tab(label) {
  this.label = label;
  this.active = false;
}

Tab.prototype.render = function(ctx){
  ctx.save();
  ctx.fillStyle = this.active ? 'red' : 'black';
  ctx.fillRect(0, 0, 15, 3);
  ctx.fillStyle = 'white';
  ctx.fillText(this.label, 3, 1);
  ctx.restore();
};

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
