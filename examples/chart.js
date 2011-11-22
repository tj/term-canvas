
var Canvas = require('../')
  , canvas = new Canvas(50, 50)
  , ctx = canvas.getContext('2d');

var data = [1, 2, 3, 2, 5, 1]
  , max = 5
  , x = 3;

ctx.clear();

data.forEach(function(n){
  var y = 20
    , w = 8
    , h = 20 * (n / max);

  ctx.fillStyle = 'blue';
  ctx.fillRect(x, y - h + 3, w, h);
  ctx.fillStyle = 'white';
  ctx.fillText(n.toString(), x + 3, y + 1);
  x += 9;
});

ctx.resetState();
console.log('\n\n\n\n\n');
