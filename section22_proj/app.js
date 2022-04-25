const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;
const cellsX = 5;
const cellsY = 5;

const unitLengthX = width / cellsX;
const unitLengthY = width / cellsY;

const engine = Engine.create();
engine.world.gravity.y = 0;
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
const grid = Array(cellsY).fill(null).map(() => Array(cellsX).fill(false));
const verticals = Array(cellsY)
    .fill(null)
    .map(() => Array(cellsX - 1).fill(false));
const horizontals = Array(cellsY - 1)
    .fill(null)
    .map(() => Array(cellsX).fill(false));

const startRow = Math.floor(Math.random() * cellsY);
const startCol = Math.floor(Math.random() * cellsX);

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
            nextRow >= cellsY ||
            nextColumn < 0 ||
            nextColumn >= cellsX
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
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            5,
            { label: 'wall', isStatic: true }
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
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            5,
            unitLengthY,
            { label: 'wall', isStatic: true }
        );
        World.add(world, wall);
    });
});

// goal
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    { label: 'goal', isStatic: true }
);
World.add(world, goal);

// ball
const ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    Math.min(unitLengthX, unitLengthY) / 4,
    {
        label : 'ball'
    }
);
World.add(world, ball);
document.addEventListener('keydown', (event) => {
    const { x, y } = ball.velocity;

    if (event.key === 'w') {
        Body.setVelocity(ball, { x, y: y - 5 });
    }
    if (event.key === 'a') {
        Body.setVelocity(ball, { x: x - 5, y });
    }
    if (event.key === 's') {
        Body.setVelocity(ball, { x, y: y + 5 });
    }
    if (event.key === 'd') {
        Body.setVelocity(ball, { x: x + 5, y });
    }
});

// win condition
Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
        const labels = [ 'ball', 'goal' ];
        if (
            labels.includes(collision.bodyA.label) &&
            labels.includes(collision.bodyB.label)
        ) {
            world.gravity.y = 1;
            world.bodies.forEach((body) => {
                if (body.label === 'wall') {
                    Body.setStatic(body, false);
                }
            });
        }
    });
});
