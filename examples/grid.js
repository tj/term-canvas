
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , size = process.stdout.getWindowSize()
  , Package = require('./package');

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

process.on('SIGWINCH', function(){
  size = process.stdout.getWindowSize();
  canvas.width = size[0];
  canvas.height = size[1];
  grid = grid.clone();
});

function Grid(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.x = 5;
  this.y = 2;
  this.xstep = 15;
  this.ystep = 4;
  this.objs = [];
}

Grid.prototype.clone = function(){
  var grid = new Grid(this.canvas);
  this.objs.forEach(grid.add.bind(grid));
  return grid;
};

Grid.prototype.add = function(obj){
  this.objs.push(obj);

  var w = this.width
    , h = this.height;

  if (this.x + this.xstep > w) {
    this.x = 5;
    this.y += this.ystep;
  }

  obj.moveTo(this.x, this.y);
  this.x += this.xstep;
};

Grid.prototype.draw = function(ctx){
  this.objs.forEach(function(obj){
    obj.draw(ctx);
  });
};

var canvas = new Canvas(size[0], size[1])
  , ctx = canvas.getContext('2d')
  , grid = new Grid(canvas);

grid.add(new Package('express'));
grid.add(new Package('tap'));
grid.add(new Package('mocha'));
grid.add(new Package('request'));
grid.add(new Package('jade'));
grid.add(new Package('swig'));
grid.add(new Package('socket.io'));

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.draw(ctx);
}, 1000 / 20);

var states = ['downloading', 'unpacking', 'preinstall', 'postinstall', 'link', 'complete']
  , total = states.length
  , curr = 0;

function update(){
  var state = states[curr++];
  if (!state) return;
  grid.objs.forEach(function(obj){
    obj.text(state).complete(curr / total);
  });
}

update();
setInterval(update, 500);