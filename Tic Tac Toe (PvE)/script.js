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
        afterClick(ID, player);

        if (!checkWin() && !checkTie())
        {
            var index = Math.floor(Math.random()*emptySquares().length);
            afterClick(emptySquares()[index], player);
        }
    }
}

function afterClick(ID)
{
        board[ID] = player;
        document.getElementById(ID).innerText = player;

        if (player == 'X') document.getElementById(ID).style.color = "red";
        else document.getElementById(ID).style.color = "blue";
        
        if (!checkWin() && !checkTie())
        {
            if (player == 'X')
            {
                player = 'O';
            }
            else
            {
                player = 'X';
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
    if (player == 'X')
    {
        for (let index of winCombos[combo])
        {
            document.getElementById(index).style.backgroundColor = "pink";
        }
    }
    else
    {
        for (let index of winCombos[combo])
        {
            document.getElementById(index).style.backgroundColor = "lightblue";
        }
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
            cells[i].style.backgroundColor = "lightgreen";
            cells[i].removeEventListener('click', click, false); 
        }
        declareWinner("Tie Game! \n Click to Restart")
        return true;
    }
    return false;
}

function declareWinner(text)
{
    document.querySelector(".restart").style.display = "block";
    document.querySelector(".restart").innerText = text;
}