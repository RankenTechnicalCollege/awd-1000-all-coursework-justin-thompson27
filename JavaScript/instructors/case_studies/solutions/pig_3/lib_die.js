export default class Die {
    #value = 0;

	constructor() {}

    #drawDot(x, y, ctx) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }

	async roll() {
        const response = await fetch("http://localhost:3000/roll/");
        const json = await response.json();
        this.#value = json.roll;
        return this.#value;
	}

    clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    draw(ctx) {
        // clear previous 
        this.clear(ctx);

        // draw dice outline
        ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // object for use in drawing dots
        const x = {left:10, center:25, right:40};
        const y = {top:10, center:25, bottom:40};
        
        // draw dice dots
        switch(this.#value) {
            case 1:
                this.#drawDot(x.center, y.center, ctx);
                break;
            case 2:
                this.#drawDot(x.left, y.bottom, ctx);
                this.#drawDot(x.right, y.top, ctx);
                break;
            case 3:
                this.#drawDot(x.left, y.bottom, ctx);
                this.#drawDot(x.center, y.center, ctx);
                this.#drawDot(x.right, y.top, ctx);
                break;
            case 4:
                this.#drawDot(x.left, y.top, ctx);
                this.#drawDot(x.left, y.bottom, ctx);
                this.#drawDot(x.right, y.top, ctx);
                this.#drawDot(x.right, y.bottom, ctx);
                break;
            case 5:
                this.#drawDot(x.left, y.top, ctx);
                this.#drawDot(x.left, y.bottom, ctx);
                this.#drawDot(x.center, y.center, ctx);
                this.#drawDot(x.right, y.top, ctx);
                this.#drawDot(x.right, y.bottom, ctx);
                break;
            case 6:
                this.#drawDot(x.left, y.top, ctx);
                this.#drawDot(x.left, y.center, ctx);
                this.#drawDot(x.left, y.bottom, ctx);
                this.#drawDot(x.right, y.top, ctx);
                this.#drawDot(x.right, y.center, ctx);
                this.#drawDot(x.right, y.bottom, ctx);
                break;      
        }
    }
}