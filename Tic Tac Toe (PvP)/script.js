var board;
const winCombos =
[
    [0,1,2] , [3,4,5] , [6,7,8], // row
    [0,3,6] , [1,4,7] , [2,5,8], // column
    [0,4,8] , [2,4,6]            // diagonal
]
var player = 'X';

const cells = document.querySelectorAll(".cell");

startGame();

function startGame()
{
    document.querySelector(".restart").style.display = "none";

    player = 'X';
    document.querySelector(".turn").style.display = "block";
    document.querySelector(".turn").style.backgroundColor = "orangered";
    document.querySelector(".turn").innerText = "Turn X";

    board = Array.from(Array(9).keys());

    for (var i=0; i<cells.length; i++)
    {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', click, false);
    }
}

function click(square)
{
    var ID = square.target.id;
    
    if (typeof board[ID] == 'number')
    {
        board[ID] = player;
        document.getElementById(ID).innerText = player;

        if (player == 'X') document.getElementById(ID).style.color = "red";
        else document.getElementById(ID).style.color = "blue";

        checkWin();
        checkTie();
        
        if (player == 'X')
        {
            player = 'O';
            document.querySelector(".turn").style.backgroundColor = "royalblue";
            document.querySelector(".turn").innerText = "Turn O";
        }
        else
        {
            player = 'X';
            document.querySelector(".turn").style.backgroundColor = "orangered";
            document.querySelector(".turn").innerText = "Turn X";
        }
    }
}

function checkWin()
{
    let plays = board.reduce( (a, e, i) => (e === player) ? a.concat(i) : a,  [] );
    for (let [combo, squares] of winCombos.entries())
    {
        if (squares.every(elem => plays.indexOf(elem) > -1))
        {
            gameOver(combo);
            return true;
        }
    }
}

function gameOver(combo)
{
    for (let index of winCombos[combo])
    {
        document.getElementById(index).style.backgroundColor = "yellowgreen";
    }
    for (var i=0; i<cells.length; i++)
    {
        cells[i].removeEventListener('click', click, false);
    }
    declareWinner(player == 'X' ? "Player X Wins! \n Click to Restart!" : "Player O Wins! \n Click to Restart!");
}

function emptySquares()
{
    return board.filter(square => typeof square == 'number');
}

function checkTie()
{
    if (emptySquares().length == 0)
    {
        for (var i=0; i<cells.length; i++)
        {
            cells[i].style.backgroundColor = "yellowgreen";
            cells[i].removeEventListener('click', click, false); 
        }
        declareWinner("Tie Game! \n Click to Restart")
        return true;
    }
    return false;
}

function declareWinner(text)
{
    document.querySelector(".turn").style.display = "none";
    document.querySelector(".restart").style.display = "block";
    document.querySelector(".restart").innerText = text;
}