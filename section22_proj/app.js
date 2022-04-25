const { Engine, Render, Runner, World, Bodies } = Matter;

const width = 600;
const height = width;
const cells = 3;

const unitLength = width / cells;

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

// borders
const borders = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, borders);

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
        [ r - 1, c, 'up' ],
        [ r, c + 1, 'right' ],
        [ r + 1, c, 'down' ],
        [ r, c - 1, 'left' ]
    ]);
    // for each neighbor:
    for (let neighbor of neighbors) {
        const [ nextRow, nextColumn, direction ] = neighbor;
        // see if that neighbor is out of bounds
        if (
            nextRow < 0 ||
            nextRow >= cells ||
            nextColumn < 0 ||
            nextColumn >= cells
        ) {
            continue;
        }
        // if neighbor has been visited, continue to next neighbor
        if (grid[nextRow][nextColumn]) {
            continue;
        }
        // remove wall from horizontals or verticals
        if (direction === 'left') {
            verticals[r][c - 1] = true;
        } else if (direction === 'right') {
            verticals[r][c] = true;
        } else if (direction === 'up') {
            horizontals[r - 1][c] = true;
        } else if (direction === 'down') {
            horizontals[r][c] = true;
        }

        createMaze(nextRow, nextColumn);
    }
    // visit that cell
};

createMaze(startRow, startRow);

horizontals.forEach((r, rowIndex) => {
    r.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength / 2,
            rowIndex * unitLength + unitLength,
            unitLength,
            5,
            { isStatic: true }
        );
        World.add(world, wall);
    });
});
verticals.forEach((r, rowIndex) => {
    r.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength,
            rowIndex * unitLength + unitLength / 2,
            5,
            unitLength,
            { isStatic: true }
        );
        World.add(world, wall);
    });
});

const goal = Bodies.rectangle(
    width - unitLength / 2,
    height - unitLength / 2,
    unitLength * 0.7,
    unitLength * 0.7,
    { isStatic: true }
);
World.add(world, goal);
