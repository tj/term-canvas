
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
  , sx = 1
  , sy = 1;

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(sx -= .01, sy -= .01);
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 5, 60, 15);
  ctx.restore();
}, 1000 / 20);