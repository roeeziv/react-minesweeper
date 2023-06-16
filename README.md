# react-minesweeper# Minesweeper Game

This is a classic Minesweeper game implemented using React, HTML, CSS, and JavaScript.

## Game Rules

1. The game board consists of a grid of cells.
2. Some cells contain hidden mines.
3. The objective is to reveal all cells without mines.
4. Clicking on a cell reveals its content:
   - If the cell contains a mine, you lose the game.
   - If the cell is empty, it reveals the number of adjacent cells containing mines.
5. Right-clicking on a cell marks it as a potential mine.
6. The game is won when all cells without mines are revealed and all mines are marked.

## Installation

To run the game locally on your machine, follow these steps:

1. Clone this repository:

   ```sh
   git clone github.com/roeeziv/react-minesweeper.git
   ```

2. Navigate to the project directory:

   ```sh
   cd react-minesweeper
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm start
   ```
    Make sure to [use the production build](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build) before deployment.

## Project Structure

- `index.html`: The HTML file containing the game board.
- `src/minesweeper.js`: The logic of the Minesweeper game, including board creation, tile operations, and game status checks.
- `src/index.js`: The main JavaScript file that handles the interaction between the game logic and the HTML elements.
- `src/styles.css`: The CSS styles for the game board and messages.

## Customization

- You can modify the `BOARD_SIZE` and `NUMBER_OF_MINES` constants in `src/index.js` to change the game's difficulty.
- You can customize the visual appearance of the game board and messages by modifying the styles in `src/styles.css`.

## Acknowledgments

- This project was created as a demonstration of implementing Minesweeper using React and basic web technologies.
- It is based on the original Minesweeper game concept and rules.

## Stack

-   Node.js 19
-   React 18


Enjoy playing Minesweeper!


