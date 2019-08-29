const winCombos =
    [
        [0,1,2] , [3,4,5] , [6,7,8], // row
        [0,3,6] , [1,4,7] , [2,5,8], // column
        [0,4,8] , [2,4,6]            // diagonal
    ]
var summaryBoard = Array.from(Array(9).keys());
var mainBoard    = [];
for (var i=0; i<9; i++)
{
    mainBoard.push( Array.from(Array(9).keys()) );
}
var player = 'X';
    
$(document).ready(function()
{
    $(".small.live").find("td:not(.O)" || "td:not(.X)").click(func);
});

function func()
{
    if ($(this).closest('.live').length === 0) return;
    
    $(".live").removeClass("live");
    
    let bigIndex = $(this).parents().eq(3).attr("class");
    let smallIndex = $(this).attr("class");

    mainBoard[bigIndex][smallIndex] = player;

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
            $(".small" + "." + bigIndex + " td").css("backgroundColor", "greenyellow");
        }
    }
    
    let div = $("<div>").innerHTML = player;
    $(this).html(div);
    $(this).addClass(player);
    $(this).unbind("click");

    if ( checkWin(summaryBoard) )
    {
        $(".turn").css("display", "none");
        $(".restart").css("display", "block");
        $(".restart").text("Player " + player + " Wins! Click to Restart!");
        return;
    }
    else if ( checkTie(summaryBoard) )
    {
        $(".turn").css("display", "none");
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
    $(".turn").css("display", "block");
    $(".turn").css("backgroundColor" , "orangered");
    $(".turn").text("Turn X");
    
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