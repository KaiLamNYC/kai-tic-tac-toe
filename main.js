//CAN DO LOGIC ANOTHER WAY
//can make separate arrays for each player
//whenever the player clicks a tile, those coords get pushed to their array
//check winner logic just checks player array for the correct combo
//hard code the combo

//make another button to randomply place a tile for testing

//declaring now for later
let startCountdown;

let board = document.getElementById('board')
let winner = document.getElementById('winner')

let whosTurn = document.getElementById('whos-turn')

//setting the timer for each player
let player1Seconds = 500;
let player2Seconds = 500;

let player1Time = document.getElementById('player1-time')
let player2Time = document.getElementById('player2-time')

player1Time.textContent = `${player1Seconds} seconds`
player2Time.textContent = `${player2Seconds} seconds`

//5x5 board
let rows = 5
let columns = 5;

//gameboard used to keep track of game logic
//gameboard goes row,column
let gameBoard = []

//possible winner starting at 7 turns since only need to hit 4 in a row
let turn = 0;

//play again button stuff
let playAgainBtn = document.getElementById('play-again')
playAgainBtn.addEventListener('click', resetGame)

//PLAYER1 IS X
//PLAYER2 IS O
let currentPlayer = 1;

//to see which tile were checking for, for later
let tileChecker = ''

//loading the game onload
window.addEventListener('DOMContentLoaded', loadGame)
function loadGame() {  
    for(let i = 0; i < rows; i++) {
        let rowsArr = []
        for(let j = 0; j < columns; j++) {
            //empty placeholder
            rowsArr.push(' ')
            let tile = document.createElement('div')
            tile.className = 'tile'
            //setting id to their coordinates for later
            tile.id = `${i}-${j}`
            tile.addEventListener('click', placeTile)
            board.appendChild(tile)


        }
        gameBoard.push(rowsArr)
    }
}
//play game function
function placeTile() {
    //stopping function from previous player
    //calling function again later on to switch player times
    clearInterval(startCountdown)
    
    //splitting coordinates so i can access the gameBoard laters
    let coordArr = this.id.split('-')
    let r = coordArr[0]
    let c = coordArr[1]

    //placing proper tile depending on player
    if(currentPlayer == 1){
        gameBoard[r][c] = 'X'
        this.className = 'player1 tile'
        this.removeEventListener('click', placeTile)
        turn++  
    } else {
        gameBoard[r][c] = 'O'
        this.className = 'player2 tile'
        this.removeEventListener('click', placeTile)
        turn++
    }
    //changing players after placing tile
    //make ternary later
    if(currentPlayer == 1) {
        currentPlayer = 2
    } else {
        currentPlayer = 1
    }
    //not rlly necessary but good for clarity
    whosTurn.textContent = `Player ${currentPlayer}'s turn`
    //calling function before setInterval
    countdown()
    startCountdown = setInterval(countdown, 1000, currentPlayer)

    //start checking winners after turn 7
    //has to go after setInterval because need to stop it if winner
    if(turn >= 7) {
        checkWinner()
    }
}

//check  winner function
function checkWinner() {

    //checking tiles horizontally
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns - 3; j++) {
            //making it more efficient only checking if there is something in the space
            if(gameBoard[i][j] != ' '){
                if(gameBoard[i][j] == gameBoard[i][j+1] && gameBoard[i][j+2] == gameBoard[i][j] && gameBoard[i][j+3] == gameBoard[i][j]) {
                    //need to reset game
                    endGame(currentPlayer)
                    return
                }
            }
        }
    }

    //checking tiles vertically
    for(let i = 0; i < columns; i++) {
        for(let j = 0; j < rows - 3; j++) {
            if(gameBoard[j][i] != ' ') {
                if(gameBoard[j][i] == gameBoard[j+1][i] && gameBoard[j+2][i] == gameBoard[j][i] && gameBoard[j+3][i] == gameBoard[j][i]) {
                    endGame(currentPlayer)
                    return
                }
            }
        }
    }

    //checking tiles diagonally starting from top left corner
    for(let i = 0; i < rows - 3; i++) {
        for(let j = 0; j < columns - 3; j++) {
            if(gameBoard[i][j] != ' ') {
                if(gameBoard[i][j] == gameBoard[i+1][j+1] && gameBoard[i+2][j+2] == gameBoard[i][j] && gameBoard[i+3][j+3] == gameBoard[i][j]) {
                    endGame(currentPlayer)
                    return
                }
            }
        }
    }

    //checking tiles diagonally starting from bottom left corner
    for(let i = 3; i < rows; i++) {
        for(let j = 0; j < columns - 3; j++) {
            // console.log(i,j);
            // console.log(i+1,j+1);
            // console.log(i+2,j+2);
            // console.log(i+3,j+3);
            if(gameBoard[i][j] != ' '){
                if(gameBoard[i][j] == gameBoard[i-1][j+1] && gameBoard[i-2][j+2] == gameBoard[i][j] && gameBoard[i-3][j+3] == gameBoard[i][j]) {
                    endGame(currentPlayer)
                    return

                }
            }
        }
    }

}

//hitting the reset game button
function resetGame() {
    //resetting stuff
    gameBoard = []
    currentPlayer = 1
    turn = 0;
    player1Seconds = 500;
    player2Seconds = 500;
    player1Time.textContent = `${player1Seconds} seconds`
    player2Time.textContent = `${player2Seconds} seconds`

    //need to reset gameboard and remake it
    for(let i = 0; i < rows; i++) {
        let rowsArr = []
        for(let j = 0; j < columns; j++) {
            rowsArr.push(' ')
        }
        gameBoard.push(rowsArr)
    }
    //grabbing all tiles removing classes and adding event listeners
    let tiles = document.querySelectorAll('.tile')
    for(let i  = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', placeTile)
            if(tiles[i].classList.contains('player1')) {
                tiles[i].classList.remove('player1')
            }
            if(tiles[i].classList.contains('player2')) {
                tiles[i].classList.remove('player2')
            }
    }
    winner.textContent = 'Welcome!'
    playAgainBtn.style.display = 'none'
}

//game has ended either time up or somebody got 4 in a row
function endGame(currentPlayer) {
    //grabbing all tiles to iterate over
    let tilesArr = document.querySelectorAll('.tile')
    for(let i = 0; i < tilesArr.length; i++) {
        tilesArr[i].removeEventListener('click', placeTile)
    }
    //making winning message
    let msg = 'Congrats!'
    //reverse cuz switch
    if(currentPlayer == 1) {
        msg+= ' Player 2 Won!'
    } else {
        msg+= ' Player 1 Won!'
    }
    winner.textContent = msg
    playAgainBtn.style.display = 'inline'
    //ending function since game ended
    clearInterval(startCountdown)
    return
}

//timer function
//can use actual timeDate new Date() later same as dead mans switch project
function countdown(currentPlayer) {
    //choosing which player to subtract time from
    if(currentPlayer == 1) {
        player1Seconds -= 1
        player1Time.textContent = `${player1Seconds} seconds`
        } else {
        player2Seconds -= 1
        player2Time.textContent = `${player2Seconds} seconds`
        }
    //if time is up end game
    if(player1Seconds < 1 || player2Seconds < 1) {
        whosTurn.textContent = `Player ${currentPlayer} ran out of time!`
        //checking which player lost to set the endgame and pass correct arg
        if(currentPlayer == 1) {
            endGame('O')
        } else {
            endGame('X')
        }
        //end function if time runs out to stop timer
        clearInterval(startCountdown)
    } 
}

