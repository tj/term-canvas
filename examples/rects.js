
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , tty = require('tty')
  , size = tty.getWindowSize();

process.on('SIGINT', function(){
  ctx.restore();
  process.nextTick(function(){
    process.exit();
  });
});

process.on('SIGWINCH', function(){
  size = tty.getWindowSize();
  canvas.width = size[1];
  canvas.height = size[0];
  x2 = x = 1;
});

var canvas = new Canvas(size[1], size[0])
  , ctx = canvas.getContext('2d')
  , x = 1
  , sx = 2
  , x2 = 1
  , sx2 = 1;

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'blue';
  ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
  ctx.strokeStyle = 'green';
  ctx.strokeRect(x += sx, 2, 30, 5);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(x2 += sx2, 5, 10, 5);
  ctx.fillStyle = 'white';
  ctx.fillText('fill', x2 + 2, 7);
  ctx.moveTo(0, 10);
  if (x + 30 >= canvas.width || x <= 1) sx = -sx;
  if (x2 + 10 >= canvas.width || x2 <= 1) sx2 = -sx2; 
}, 1000 / 20);