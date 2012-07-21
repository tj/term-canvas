
module.exports = Tab;

function Tab(label) {
  this.label = label;
  this.active = false;
}

Tab.prototype.render = function(ctx){
  ctx.save();
  ctx.fillStyle = this.active ? 'red' : 'black';
  ctx.fillRect(0, 0, 15, 3);
  ctx.fillStyle = 'white';
  ctx.fillText(this.label, 3, 1);
  ctx.restore();
};