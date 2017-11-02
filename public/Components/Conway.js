export default
class Conway {

    constructor(width = 10, height = 10) {

        this.width = width;
        this.height = height;

        this.state = Array(height).fill().map(_=>Array(width).fill(0));
        this.state[0][1] = 1
        this.state[1][2] = 1
        this.state[2][0] = 1
        this.state[2][1] = 1
        this.state[2][2] = 1
        this.nextState = Array(height).fill().map(_=>Array(width).fill(0));

        this.run = this.run.bind(this);
        this.log = this.log.bind(this);
        this.update = this.update.bind(this);
        this.fixBounds = this.fixBounds.bind(this);
        this.countNeighbors = this.countNeighbors.bind(this);
        this.swapStateBuffer = this.swapStateBuffer.bind(this);

        this.render = () => {}; // function will be overriden

    }


    fixBounds([x, y]) {
        const w = this.width;
        const h = this.height;
        x = (x % w + w) % w;
        y = (y % h + h) % h;
        return [x, y];
    }


    countNeighbors([x, y]) {

        let count = 0;
        let fixBounds = this.fixBounds;

        const neighborCoords = [
            fixBounds([x - 1, y - 1]),
            fixBounds([x + 0, y - 1]),
            fixBounds([x + 1, y - 1]),
            fixBounds([x + 1, y + 0]),
            fixBounds([x + 1, y + 1]),
            fixBounds([x + 0, y + 1]),
            fixBounds([x - 1, y + 1]),
            fixBounds([x - 1, y + 0])
        ];

        neighborCoords.forEach(coord => {
            count += this.state[coord[1]][coord[0]];
        });

        return count;

    }


    setStateFromBuffer() {
        for (let i = 0; i < this.height; i++) {
            this.state[i] = this.nextState[i].slice(); 
        }
    }
 

    update() {

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let count = this.countNeighbors([x, y]);
                if (this.state[y][x]) {
                    console.log(count)
                    if ( (count < 2) || (count > 3) ) { 
                        this.nextState[y][x] = 0;
                    } else {
                        this.nextState[y][x] = 1;
                    }
                } else {
                    if (count === 3) this.nextState[y][x] = 1;
                }
            }
        }

        //this.log()
        this.setStateFromBuffer();

    }


    sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }


    log() {

        for (let y = 0; y < this.height; y++) {
            console.log(`${y}:${this.state[y].map(x=>x?'■':'□').join('')}`)
        }
        console.log() //newline

    }


    async run() {

        const delay = this.sleep(4000)
        this.update();
        await delay;
        this.render();
        requestAnimationFrame(this.run);

    }

}
