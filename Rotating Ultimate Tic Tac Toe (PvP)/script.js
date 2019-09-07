const winCombos =
[
    [0,1,2] , [3,4,5] , [6,7,8], // row
    [0,3,6] , [1,4,7] , [2,5,8], // column
    [0,4,8] , [2,4,6]            // diagonal
]
const rotationL = [ 6, 3, 0, 7, 4, 1, 8, 5, 2 ];
const rotationR = [ 2, 5, 8, 1, 4, 7, 0, 3, 6 ];

var summaryBoard = Array.from(Array(9).keys());
var mainBoard    = [];
for (var i=0; i<9; i++)
{
    mainBoard.push( Array.from(Array(9).keys()) );
}
var player = 'X';
var rotate = 'none';

$(document).ready(function()
{
    $(".small.live").find("td:not(.O)" || "td:not(.X)").click(func);
});

function func()
{
    if ($(this).closest('.live').length === 0) return;
    
    if ($(this).hasClass("X") || $(this).hasClass("O")) return;
    
    if (rotate != 'none')
    {
        $(".live").removeClass("live");

        let bigIndex = $(this).parents().eq(3).attr("class");
        let smallIndex = $(this).attr("class");

        mainBoard[bigIndex][smallIndex] = player;
    
        mainBoard[bigIndex] = turn(mainBoard[bigIndex]);

        if (rotate == 'right')
        {
            smallIndex = rotationR[smallIndex];
        }
        else
        {
            smallIndex = rotationL[smallIndex];
        }
        adjust(bigIndex);
        if (typeof summaryBoard[bigIndex] == "number")
        {
            if ( checkWin(mainBoard[bigIndex]) )
            {
                summaryBoard[bigIndex] = player;
                if (player == 'X')
                $(".small" + "." + bigIndex + " td").css("backgroundColor", "pink");
                else
                $(".small" + "." + bigIndex + " td").css("backgroundColor", "lightblue");
            }
            else if ( checkTie(mainBoard[bigIndex]) )
            {
                summaryBoard[bigIndex] = "tie";
                $(".small" + "." + bigIndex + " td").css("backgroundColor", "lightgreen");
            }
        }

        if ( checkWin(summaryBoard) )
        {
            $(".turn").css("display", "none");
            $(".left").css("display", "none");
            $(".right").css("display", "none");
            $(".restart").css("display", "block");
            $(".restart").text("Player " + player + " Wins! Click to Restart!");
            return;
        }
        else if ( checkTie(summaryBoard) )
        {
            $(".turn").css("display", "none");
            $(".left").css("display", "none");
            $(".right").css("display", "none");
            $(".restart").css("display", "block");
            $(".restart").text("Tie Game! Click to Restart!");
            return;
        }

        if (player == 'X')
        {
            player = 'O';
            $(".turn").css("backgroundColor", "royalblue");
            $(".turn").text("Turn O");
        }
        else
        {
            player = 'X';
            $(".turn").css("backgroundColor", "orangered");
            $(".turn").text("Turn X");
        }

        if ( $(".small" + "." + smallIndex + " td" + ".X").length + $(".small" + "." + smallIndex + " td" + ".O").length == 9 )
        {
            $(".small").addClass("live");
        }
        else
        {
            x = $(".small" + "." + smallIndex).addClass("live");
        }
        rotate = 'none';
        $(".left").css("color", "white");
        $(".right").css("color", "white");
    }
}

function left()
{
    $(".left").css("color", "greenyellow");
    $(".right").css("color", "white");
    rotate = 'left';
}

function right()
{
    $(".right").css("color", "greenyellow");
    $(".left").css("color", "white");
    rotate = 'right';
}

function turn(board)
{
    let temp = Array.from(Array(9).keys());

    if (rotate == 'left')
    {
        for (var i=0; i<9; i++)
        {
            if (typeof board[i] != "number")
            {
                temp[rotationL[i]] = board[i];
            }
            
        }
    }
    else
    {
        for (var i=0; i<9; i++)
        {
            if (typeof board[i] != "number")
            {
                temp[rotationR[i]] = board[i];
            }
        }
    }
    return temp;
}

function adjust(bigIndex)
{
    $(".small" + "." + bigIndex + " td").removeClass("X");
    $(".small" + "." + bigIndex + " td").removeClass("O");
    $(".small" + "." + bigIndex + " td").html("");

    for (var i=0; i<9; i++)
    {
        if (mainBoard[bigIndex][i] == 'X')
        {
            $(".small" + "." + bigIndex + " td" + "." + i).addClass("X");
            let div = $("<div>").innerHTML = "X";
            $(".small" + "." + bigIndex + " td" + "." + i).html(div);
        }
        else if (mainBoard[bigIndex][i] == 'O')
        {
            $(".small" + "." + bigIndex + " td" + "." + i).addClass("O");
            let div = $("<div>").innerHTML = "O";
            $(".small" + "." + bigIndex + " td" + "." + i).html(div);
        }
    }
}

function startGame()
{
    summaryBoard = Array.from(Array(9).keys());
    mainBoard    = [];
    for (var i=0; i<9; i++)
    {
        mainBoard.push( Array.from(Array(9).keys()) );
    }

    player = 'X';
    rotate = 'none';   

    $(".turn").css("display", "inline-block");
    $(".turn").css("backgroundColor" , "orangered");
    $(".turn").text("Turn X");
    
    $(".left").css("display", "inline-block");
    $(".right").css("display", "inline-block");
    $(".left").css("color", "white");
    $(".right").css("color", "white");

    $(".restart").css("display", "none");

    $(".small td").css("backgroundColor", "");
    $(".small td").removeClass("X");
    $(".small td").removeClass("O");
    $(".small td").html("");
    $(".small").addClass("live");
    $(".small td").click(func);
}

function checkWin(board)
{
    let plays = board.reduce( (a, e, i) => (e === player) ? a.concat(i) : a,  [] );
    
    for (var i=0; i<8; i++)
    {
        if (winCombos[i].every(elem => plays.indexOf(elem) > -1))
        {
            return true;
        }
    }
}

function checkTie(board)
{
    let emptySquares = board.filter(square => typeof square == 'number');
    if (emptySquares.length == 0)
    {
        return true;
    }
}
