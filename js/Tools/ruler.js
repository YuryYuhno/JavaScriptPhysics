/**
 * Canvas drawn ruler object 
 */
function Ruler(options = {}) {
  // default values for the ruler
  Object.assign(this, {
    canvas: undefined,
    startX: 0,
    startY: 0,
    length: 200,
    height : 50,
    maxValue : 10,
    backColor: "orange",
    strokeColor: "black",
    showBackground : true,
    showBottom : true, //shows/hides bottom ruler lines
    angle: 0, // rotation angle relatively of upper left corner
  }, options);
 
}


Ruler.prototype.draw = function () {
  let ctx = this.canvas.getContext("2d");
  ctx.save();
  contextLayout.rotateCanvas(ctx, this.startX, this.startY, this.angle);

  if(this.showBackground){
    ctx.beginPath();
    ctx.fillStyle = this.backColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillRect(this.startX, this.startY, this.length, this.height);
    ctx.rect(this.startX, this.startY, this.length, this.height);
    ctx.stroke();
  }

  let endX = this.startX + this.length;
  let font = (this.height - this.maxValue) * 0.3 + "px Times New Roman";
  ctx.beginPath();
  ctx.strokeStyle = this.strokeColor;
  ctx.fillStyle = this.strokeColor;
  ctx.lineWidth = 1;

  let step = (endX - this.startX) / (this.maxValue * 10);
  let lineHeight = this.height /6;

  for (let x = 1; x <= (this.maxValue * 10) - 1; x ++) {
    let xCoord = this.startX + x * step;
    if(x % 10 == 0)
    //long lines
    {
        lineHeight =  this.height /3;
        contextLayout.drawCenterText(ctx, font, x/10, xCoord, this.startY + this.height /2);
    }
    // short lines
    else
    {
        lineHeight = step > 2 ? this.height /6 : 0;
    }

    ctx.moveTo(xCoord, this.startY);
    ctx.lineTo(xCoord, this.startY + lineHeight);

    if(this.showBottom){
        ctx.moveTo(xCoord, this.startY + this.height);
        ctx.lineTo(xCoord, (this.startY + this.height) - lineHeight);
    }
  }
  ctx.stroke();


  ctx.restore();

}



Ruler.prototype.draw2 = function () {
    let ctx = this.canvas.getContext("2d");
    ctx.save();
    contextLayout.rotateCanvas(ctx, this.startX, this.startY, this.angle);


    if(this.showBackground){
        ctx.beginPath();
        ctx.fillStyle = this.backColor;
        ctx.fillRect(this.startX, this.startY, this.length, this.height);
        ctx.rect(this.startX, this.startY, this.length, this.height);
        ctx.stroke();
      }


    let endX = this.startX + this.length;
    let font = this.height * 0.2 + "px Times New Roman";
    ctx.beginPath();
    ctx.fillStyle = ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 1;

    let step = (endX - this.startX) / (this.maxValue * 10);
    let lineHeight = this.height /6;


    for (let x = 1; x <= (this.maxValue * 10) - 1; x ++) {
      let xCoord = this.startX + x * step;
      if(x % 10 == 0)
      {
          lineHeight =  this.height /1.8;
          contextLayout.drawCenterText(ctx, font,
              x/10, xCoord, (this.startY + this.height) - (this.height -lineHeight)/2);
      }
      else
      {
          lineHeight = this.height /3;
      }

      ctx.moveTo(xCoord, this.startY);
      ctx.lineTo(xCoord, this.startY + lineHeight);

    }
   ctx.stroke();


    ctx.restore();

  }


