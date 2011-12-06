
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , size = process.stdout.getWindowSize()
  , Log = require('./log');

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
  , a = new Log(5, 2).title('express')
  , b = new Log(20, 2).title('tap')
  , c = new Log(35, 2).title('mocha')
  , d = new Log(50, 2).title('request')
  , objs = [a];

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objs.forEach(function(obj){
    obj.draw(ctx);
  });
}, 1000 / 20);

setTimeout(function(){
  objs.push(b);
  setTimeout(function(){
    objs.push(c);
    setTimeout(function(){
      objs.push(d);
    }, 300);
  }, 200);
}, 100);

setInterval(function(){
  a.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
  d.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 200);

setInterval(function(){
  b.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 250);

setInterval(function(){
  c.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 150);
