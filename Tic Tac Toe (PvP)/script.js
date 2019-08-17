var origBoard;
const playerX = 'X';
const playerO = 'O';
const winCombos =
[
    [0,1,2] , [3,4,5] , [6,7,8], // row
    [0,3,6] , [1,4,7] , [2,5,8], // column
    [0,4,8] , [2,4,6]            // diagonal
]
var who = playerX;

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
        turn(square.target.id, who);
        checkWin(origBoard, who);
        checkTie();
        who = (who == playerX) ? playerO : playerX;
    }
}

function turn(squareId, player)
{
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    if (player == playerX) document.getElementById(squareId).style.color = "red";
    else document.getElementById(squareId).style.color = "blue";

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
        document.getElementById(index).style.backgroundColor = "green";
    }
    for (var i=0; i<cells.length; i++)
    {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == playerX ? "Player X Wins!" : "Player O Wins!");
}

function pickSquare()
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

function declareWinner(text)
{
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = text;
}