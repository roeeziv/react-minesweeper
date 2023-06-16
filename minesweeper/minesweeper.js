//Logic

export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
}

export const createBoard = (boardSize, numberOfMines) => {  
    const board = [];
    const minePositions = getMinePositions(boardSize, numberOfMines);  //gets the positions of the mines, as an array
    console.log(minePositions);
    for (let i = 0; i < boardSize; i++) {
        const row = []; 
        for (let j = 0; j < boardSize; j++) {
            const element =  document.createElement('div');
            element.dataset.status = TILE_STATUSES.HIDDEN;
            const tile= {
                element,
                i,
                j,
                mine: minePositions.some(position => positionMatch({ i, j }, position)),  //checks if the position of the tile is the same as the position of the mine
                //get and set the status of the tile, so we don't have to use the element.dataset.status, it'll be visible
                get status(){
                    return this.element.dataset.status;
                },
                set status(value){
                    this.element.dataset.status = value;
                }
            };
            row.push(tile);
        }
        board.push(row);
    }
    return board;
}    

const getMinePositions = (boardSize, numberOfMines) => {
    const positions = [];
    while (positions.length < numberOfMines) {
        const position = {
            i: randomNumber(boardSize),
            j: randomNumber(boardSize),
        };
        if (!positions.some(p => positionMatch(p, position))) {
            positions.push(position);
        }
    }
    return positions;
}

const positionMatch = (p1, p2) => {
    return p1.i===p2.i && p1.j===p2.j;  //checks if the positions are the same
}

const randomNumber = size => {
    return Math.floor(Math.random() * size);  //returns a random number between 0 and size
}

export const markTile = (tile) => {
    if (
        tile.status !== TILE_STATUSES.HIDDEN &&
        tile.status !== TILE_STATUSES.MARKED
      ) {
        return
      }
    
      if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN
      } else {
        tile.status = TILE_STATUSES.MARKED
      }
}

export const checkWin = (board) => {
    return board.every(row => {
        return row.every(tile => {
            return (tile.status === TILE_STATUSES.NUMBER || 
                    (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
            )  //checks if all the tiles are either numbers or mines that are marked or hidden
        })
    })  
}

export const checkLose = (board) => {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUSES.MINE
        })
    })
}

export const revealTile = (tile,board) => {
    if(tile.status !== TILE_STATUSES.HIDDEN) {
        return
    }
    if(tile.mine){
        tile.status = TILE_STATUSES.MINE //if the tile is a mine, it's status is changed to mine and the game is over (checkLose)
        return
    }
    tile.status = TILE_STATUSES.NUMBER
    const adjTiles = nearbyTiles(board,tile)
    const mines = adjTiles.filter(tile => tile.mine)
    if(mines.length === 0){
        adjTiles.forEach(tile => {
            revealTile(tile, board)
        })
    }else{
        tile.element.textContent = mines.length
    }
}

const nearbyTiles = (board, { i, j}) => {
    const tiles = []

    for(let x = -1; x <= 1; x++){
        for(let y = -1; y <= 1; y++){
            const tile = board[i + x]?.[j + y] //gets the adjacent tiles if they exist
            if(tile) tiles.push(tile)
        }
    }
    return tiles;
}