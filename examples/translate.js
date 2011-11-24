
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , size = process.stdout.getWindowSize();

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
});

var canvas = new Canvas(size[0], size[1])
  , ctx = canvas.getContext('2d')
  , x = 0
  , y = 0;

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(x += .25, y += .1);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0, 0, 10, 5);
  ctx.restore();
}, 1000 / 20);