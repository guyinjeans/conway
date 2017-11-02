export default
class View {

    constructor(ctx) {
        this.zoom = 1;
        this.xOffset = 0;
        this.yOffset = 0;
        this.xPadding = 20;
        this.yPadding = 20;
        this.cellSize = 20;
        this.cellPadding = 10;
        this.ctx = ctx;
        
        this.render = this.render.bind(this);
    }    

    render() {

        for (let yp = (this.xOffset - this.yPadding); yp <= this.ctx.canvas.height + this.yPadding; yp += (this.zoom * this.cellSize) + this.cellPadding) {
            for (let xp = (this.yOffset - this.xPadding); xp <= this.ctx.canvas.width + this.xPadding; xp += (this.zoom * this.cellSize) + this.cellPadding) {
                this.ctx.beginPath();
                this.ctx.lineWidth = '1';
                this.ctx.strokeStyle = '#31403C';
                this.ctx.rect(xp + 0.5, yp + 0.5, this.cellSize, this.cellSize);
                this.ctx.stroke();
            }
        }
    }

}
