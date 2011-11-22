
var Canvas = require('../')
  , canvas = new Canvas(50, 50)
  , ctx = canvas.getContext('2d');

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

Array.prototype.max = function(){
  return this.sort(function(a, b){
    return a - b;
  }).pop();
};

function rand() {
  return Math.random() * 5 | 0;
}

ctx.hideCursor();

setInterval(function(){
  var data = [rand(), rand(), rand(), rand(), rand(), rand()]
    , max = data.max()
    , x = 3;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
}, 1000 / 6);