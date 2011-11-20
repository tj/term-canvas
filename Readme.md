
# term-canvas

  experimental html canvas API for the terminal written with node.js.

## Screenshots

 States:

   ![state](http://f.cl.ly/items/0H1E3u371y1o3q2l2G2p/Grab.png)

 Rects:
 
   ![rects](http://f.cl.ly/items/3v3F3j2C0Q3H3t1C0r29/Grab.png)

## Examples

 Static colored rects with no draw loop:

```js
var Canvas = require('../');

var canvas = new Canvas(50, 100)
  , ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(5, 5, 20, 10);

ctx.fillStyle = 'blue';
ctx.fillRect(27, 5, 20, 10);

ctx.fillStyle = 'yellow';
ctx.fillRect(49, 5, 20, 10);

console.log('\n\n\n');
ctx.resetState();

```

 Some random moving rects with a draw loop:
 
```js
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

var canvas = new Canvas(size[10], size[1])
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
  ctx.moveTo(0, 10);
  if (x + 30 >= canvas.width || x <= 1) sx = -sx;
  if (x2 + 10 >= canvas.width || x2 <= 1) sx2 = -sx2; 
}, 1000 / 20);
```

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.