const lifeworld = {

    init(numCols,numRows) {
        this.numCols = numCols;
        this.numRows = numRows;
        this.world = this.buildArray();
        this.worldBuffer = this.buildArray();
        this.randomSetup();
    },

    buildArray() {
        let outerArray = [];

        for (let row = 0; row < this.numRows; row++) 
        {
            let innerArray = [];

            for (let col = 0; col < this.numCols; col++)
            {
                innerArray.push(0);
            }

            outerArray.push(innerArray);
        }

        return outerArray;
    },

    randomSetup() {
        for (let row = 0; row < this.numRows; row++)
        {
            for (let col = 0; col < this.numCols; col++)
            {
                this.world[row][col] = 0;
                if (Math.random() < .1)
                {
                    this.world[row][col] = 1;
                }
            }
        }
    },

    getLivingNeighbors(row,col) {
		// TODO:
		// row and col should > than 0, if not return 0
		
		// row and col should be < the length of the applicable array, minus 1. If not return 0
		
		// count up how many neighbors are alive at N,NE,E,SE,S,SW,W,SE - use this.world[row][col-1] etc
		let sum = 0;

        for (let r = -1; r < 2; r++)
        {
            if (this.world[row + r][col] == undefined) { continue; }

            for (let c = -1; c < 2; c++)
            {
                if (this.world[row][col + c] == undefined) { continue; }

                let cell = this.world[row + r][col + c];

                if (cell > 0 && (r != 0 && c != 0))
                {
                    sum++
                }
            }
        }
        
        return sum;
	},
	
    step() {
        this.randomSetup();

        // TODO:
        
        // nested for loop will call getLivingNeighbors() on each cell in this.world - DONE
        // Determine if that cell in the next generation should be alive (see wikipedia life page linked at top) - DONE
        // Put a 1 or zero into the right location in this.worldBuffer - DONE 
        // when the looping is done, swap .world and .worldBuffer (use a temp variable to do so) - TESTING...

        for (let row = 0; row < this.numRows; row++)
        {
            for (let col = 0; col < this.numCols; col++)
            {
                let numNeighbors = this.getLivingNeighbors(row,col);

                switch (this.world[row][col])
                {
                    case 0: // Dead
                        if (numNeighbors == 3) { this.worldBuffer[row][col] = 1}
                        break;

                    case 1: // Living
                        if (numNeighbors < 2 || numNeighbors > 3) { this.worldBuffer[row][col] = 0; }
                        break;
                }
            }
        }

        let tempObj = this.worldBuffer;

        this.world = tempObj;
    }
}