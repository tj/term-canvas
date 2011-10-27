
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
  , w = 5
  , h = 3
  , sx = 0
  , sy = 0
  , x = 1
  , jumping = false
  , y = canvas.height - h
  , oy = y;

ctx.hideCursor();
setInterval(function(){
  // move
  x += sx;
  sx *= .5;

  // jump
  if (jumping) {
    y += sy;
    sy *= .1;
    if (sy < 0) {
      sy = 5;
      jumping = false;
    }
  } else if (sy) {
    y = Math.min(y + sy, oy);
    sy *= .1;
  }

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
      sy = -5;
      jumping = true;
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