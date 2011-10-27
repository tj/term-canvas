
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
  , y = 1;

// ctx.hideCursor();
// setInterval(function(){
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = 'green';
//   ctx.fillRect(0, 0, 5, 3);
// }, 1000 / 20);

process.stdin.on('keypress', function(char, key){
  switch (key.name) {
    case 'c':
      if (key.ctrl) process.kill(process.pid, 'SIGINT');
      break;
    case 'up':
      break;
    case 'left':
      break;
    case 'right':
      break;
  }
}).resume();

tty.setRawMode(true);