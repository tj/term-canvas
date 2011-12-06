
/**
 * Module dependencies.
 */

var Canvas = require('../../')
  , size = process.stdout.getWindowSize()
  , Package = require('./package')
  , Grid = require('./grid');

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

var canvas = new Canvas(size[0], size[1])
  , ctx = canvas.getContext('2d')
  , grid = new Grid(canvas);

grid.add(new Package('express'));
grid.add(new Package('tap'));
grid.add(new Package('mocha'));
grid.add(new Package('request'));
grid.add(new Package('jade'));
grid.add(new Package('swig'));
grid.add(new Package('ejs'));
grid.add(new Package('socket.io'));
grid.add(new Package('log'));
grid.add(new Package('flatiron'));
grid.add(new Package('formidable'));
grid.add(new Package('cluster'));

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.draw(ctx);
}, 1000 / 20);

// faux progress

var states = ['downloading', 'unpacking', 'preinstall', 'postinstall', 'link', 'complete']
  , total = states.length;

grid.objs.forEach(function(obj){
  obj.curr = 0;

  function update() {
    var state = states[obj.curr++];
    if (!state) return;
    obj.text(state).complete(obj.curr / total);
    setTimeout(update, Math.random() * 800);
  }

  update();
});