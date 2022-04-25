const { Engine, Render, Runner, World, Bodies } = Matter;

const width = 600;
const height = width;
const cells = 3;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element : document.body,
    engine  : engine,
    options : {
        wireframes : true,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls);

// Maze generation
const shuffleArray = (arr) => {
    let counter = arr.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
};
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
const verticals = Array(cells)
    .fill(null)
    .map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1)
    .fill(null)
    .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startCol = Math.floor(Math.random() * cells);

const createMaze = (r, c) => {
    // if cell has been visitied at [row, column], then return
    if (grid[r][c]) {
        return;
    }
    // mark this cell as being visited
    grid[r][c] = true;
    // assemble random list of neighbor
    const neighbors = shuffleArray([
        [ r - 1, c ],
        [ r, c + 1 ],
        [ r + 1, c ],
        [ r, c - 1 ]
    ]);
    // for each neighbor:
    // see if that neighbor is out of bounds
    // if neighbor has been visited, continue to next neighbor
    // remove wall from horizontals or verticals
    // visit that cell
};

createMaze(startRow, startCol);
