
/**
 * Module dependencies.
 */

var Canvas = require('../');

process.on('SIGINT', function(){
  ctx.restore();
  process.nextTick(function(){
    process.exit();
  });
});

var canvas = new Canvas(15, 15)
  , ctx = canvas.getContext('2d')
  , x = 0
  , y = 0
  , x2 = 0
  , y2 = 0;

ctx.hideCursor();
setInterval(function(){
  ctx.clear();
  ctx.strokeStyle = 'green';
  ctx.strokeRect(x++, 2, 30, 5);
  ctx.strokeStyle = 'yellow';
  ctx.strokeRect(x2 += .5, 5, 20, 5);
  ctx.moveTo(0, 10);
}, 1000 / 20);