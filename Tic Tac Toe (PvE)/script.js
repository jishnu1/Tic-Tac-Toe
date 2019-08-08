var origBoard;
const playerH = 'X';
const playerC = 'O';
const winCombos =
[
    [0,1,2] , [3,4,5] , [6,7,8], // row
    [0,3,6] , [1,4,7] , [2,5,8], // column
    [0,4,8] , [2,4,6]            // diagonal
]

const cells = document.querySelectorAll(".cell");

startGame();

function startGame()
{
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i=0; i<cells.length; i++)
    {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square)
{
    if (typeof origBoard[square.target.id] == 'number')
    {
        turn(square.target.id, playerH)
        if (!checkWin(origBoard, playerH) && !checkTie()) turn(bestSpot(), playerC);
    }
}

function turn(squareId, player)
{
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player)
{
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries())
    {
        if (win.every(elem => plays.indexOf(elem) > -1))
        {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon)
{
    for (let index of winCombos[gameWon.index])
    {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == playerH ? "red" : "blue";
    }
    for (var i=0; i<cells.length; i++)
    {
        cells[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == playerH ? "You Win!" : "You Lose!");
}

function bestSpot()
{
    var index = Math.floor(Math.random()*emptySquares().length);
    return emptySquares()[index];
}

function emptySquares()
{
    return origBoard.filter(s => typeof s == 'number');
}

function checkTie()
{
    if (emptySquares().length == 0)
    {
        for (var i=0; i<cells.length; i++)
        {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false); 
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}

function declareWinner(who)
{
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}