
module.exports = Grid;

function Grid(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.x = 5;
  this.y = 2;
  this.xstep = 15;
  this.ystep = 4;
  this.objs = [];
}

Grid.prototype.clone = function(){
  var grid = new Grid(this.canvas);
  this.objs.forEach(grid.add.bind(grid));
  return grid;
};

Grid.prototype.add = function(obj){
  this.objs.push(obj);

  var w = this.width
    , h = this.height;

  if (this.x + this.xstep > w) {
    this.x = 5;
    this.y += this.ystep;
  }

  obj.moveTo(this.x, this.y);
  this.x += this.xstep;
};

Grid.prototype.draw = function(ctx){
  this.objs.forEach(function(obj){
    obj.draw(ctx);
  });
};