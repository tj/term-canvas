
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , tty = require('tty')
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
  y = canvas.height - h;
});

var canvas = new Canvas(size[0], size[1])
  , ctx = canvas.getContext('2d')
  , w = 5
  , h = 3
  , sx = 0
  , sy = 0
  , x = 1
  , jumping = false
  , y = canvas.height - h;

ctx.hideCursor();
setInterval(function(){
  // move
  x += sx;
  sx *= .5;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // player
  ctx.fillStyle = 'green';
  ctx.fillRect(x, y, 5, 3);

  // ground
  ctx.fillStyle = 'white';
  ctx.fillRect(0, canvas.height, canvas.width, 1);
}, 1000 / 20);

process.stdin.on('keypress', function(char, key){
  switch (key.name) {
    case 'c':
      if (key.ctrl) process.kill(process.pid, 'SIGINT');
      break;
    case 'up':
      break;
    case 'left':
      sx = 5;
      break;
    case 'right':
      sx = -5;
      break;
  }
}).resume();

tty.setRawMode(true);