//Display/ UI

import { createBoard, markTile, TILE_STATUSES ,revealTile, checkWin, checkLose } from "./minesweeper.js" ;

const BOARD_SIZE = 10; 
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");  //selects the board class from the html file
const minesLeftText = document.querySelector('[data-mine-count]')
// const messageText = document.querySelector('.subtext')
const messageContainer = document.querySelector(".message-container");
const messageText = messageContainer.querySelector(".message-text");



console.log(board);

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        tile.element.addEventListener('click', e => {
            revealTile(tile,board)
            checkEndGame()
        });
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            markTile(tile);
            listMinesLeft();
        });
    })
})

boardElement.style.setProperty("--size", BOARD_SIZE); //sets the size of the board
minesLeftText.textContent = NUMBER_OF_MINES

const listMinesLeft= () => {
    const markedTilesCouont = board.reduce((count, row)=> {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)
    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCouont
}
 
const checkEndGame = () => {
    const win = checkWin(board)
    const lose = checkLose(board)
    if (win || lose){
        boardElement.addEventListener('click', stopProp, {capture: true})
        boardElement.addEventListener('contextmenu', stopProp, {capture: true})
    }
    if(win){
        messageText.textContent = 'You Win!'
        messageContainer.classList.add("message-container-win");
        messageContainer.style.display = "block";

    }
    if(lose){
        messageText.textContent = 'You Lose'
        messageContainer.classList.add("message-container-lose");
        messageContainer.style.display = "block";


        board.forEach(row => {
            row.forEach(tile => {
                if(tile.status === TILE_STATUSES.MARKED) markTile(tile)  //if the tile is marked and it is a mine, it will unmark it to reaveal the mine
                if(tile.mine) revealTile(tile,board)
            })
        })
    }
}

const stopProp = e => {
    e.stopImmediatePropagation()
}
