let maze = [
    [1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
]

let player = [7, 0]
let bag = 0

const ROWS = 11
const COLS = 11

const EMPTY = 0
const WALL = 1
const PLAYER = 2
const EXIT = 3
const EXIT_READY = 6
const DIAMOND = 0
const DIAMOND_COUNT = 1

const DOWN = 40
const UP = 38
const LEFT = 37
const RIGHT = 39

window.onload = () => {
    generateDiamond()
    createBoard()
    renderMaze()
}

const generateDiamond = () => {
    let count = 0

    do {
        let row = Math.floor(Math.random() * ROWS)
        let col = Math.floor(Math.random() * COLS)
        if (maze[row][col] === EMPTY &&
            row !== 0 && col !==0 &&
            row !== ROWS -1 && col !== COLS -1) {
            maze[row][col] = DIAMOND
            count++
        }

    } while (count !== DIAMOND_COUNT)
}

const createBoard = () => {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const block = document.createElement('div')
            block.id = `id-${col}-${row}`
            document.querySelector(".board").appendChild(block);
        }
    }
}

const renderMaze = () => {
    for (let row = 0; row < ROWS; row++) {

        for (let col = 0; col < COLS; col++) {
            let itemClass = ''
            switch (maze[row][col]) {
                case PLAYER:
                    itemClass = 'player'; break
                case WALL:
                    itemClass = 'wall'; break
                case PLAYER:
                    itemClass = 'human'; break
                case EXIT:
                    itemClass = 'exit'; break
                case EXIT_READY:
                itemClass = 'exit show'; break
                case DIAMOND:
                    itemClass = 'diamond'; break
                default:
                    itemClass = 'empty'
            }
            const id = `#id-${col}-${row}`

            document.querySelector(id).className = `block ${itemClass}`
        }
    }
    const id = `#id-${player[1]}-${player[0]}`
    if (!(bag === DIAMOND_COUNT && player[1] === COLS - 1 && player[0] === ROWS - 1)) {
        document.querySelector(id).className = 'block player'
    }
    else {
        document.querySelector(id).className = 'block player bye'
        document.querySelector('.info').textContent = 'bye!'
    }


    let finish1 = document.querySelectorAll('.block')[2];
    let finish2 = document.querySelectorAll('.block')[7];
    let finish3 = document.querySelectorAll('.block')[8];


    if(finish1.classList.contains('player') || finish2.classList.contains('player') || finish3.classList.contains('player')){
        location.href = 'game-success-16.html'
    }


}

window.onkeydown = (event) => {
    switch (event.keyCode) {
        case DOWN:
            direction = DOWN;  break
        case UP:
            direction = UP; break;
        case LEFT:
            direction = LEFT; break
        case RIGHT:
            direction = RIGHT; break
        default:
            direction = 0
    }

    if (direction !== 0) {
        changePlayerPos(direction)
    }
}

const changePlayerPos = (direction) => {
    let [dy, dx] = [0, 0];
    switch (direction) {
        case UP:
            dy = -1; break;
        case RIGHT:
            dx = 1; break;
        case LEFT:
            dx = -1; break;
        case DOWN:
            dy = 1; break;
        default:
            return state
    }

    const x = player[1] + dx
    const y = player[0] + dy

    if (x >= 0 && x < COLS && y >= 0 && y < ROWS &&
        maze[y][x] !== WALL) {
            player = [y, x]

            if (maze[y][x] === DIAMOND) {
                maze[y][x] = EMPTY
                bag++
            }

            renderMaze()
        }

}
