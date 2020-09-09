"use strict"

const board = document.getElementById("board")
const displayContent = document.getElementById("displayContent")
const restartBtn = document.getElementById("restartBtn")

let xTurn = true
let gameOver = false

board.onclick = (event) => {
    if(gameOver) return
    
    let target = event.target

    if(target.className == "square") {
        let contentElement = target.getElementsByClassName("square-content")[0]

        if(contentElement.innerHTML != "") {
            console.log("already occupied")
            return
        }

        if(xTurn) {
            contentElement.innerHTML = "X"
            xTurn = !xTurn
        } else {
            contentElement.innerHTML = "O"
            xTurn = !xTurn
        }
    }
    
    switch(checkResult()) {
        case "X":
            console.log("WINNER X")
            displayContent.innerHTML = "Player X Won"
            gameOver = true
            break
        case "O":
            console.log("WINNER O")
            displayContent.innerHTML = "Player O Won"
            gameOver = true
            break
        case "TIE":
            console.log("TIE")
            displayContent.innerHTML = "Tie Game"
            gameOver = true
            break
        default:
            break
    }


}

restartBtn.onclick = () => {
    let contentElements = board.getElementsByClassName("square-content")

    for(let index = 0 ; index < 9 ; index++){
        contentElements[index].innerHTML = ""
    }

    displayContent.innerHTML = ""
    xTurn = true
    gameOver = false
}

const checkResult = function() {
    let boardData = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    
    let contentElements = board.getElementsByClassName("square-content")

    for(let i = 0 ; i < 9 ; i++){
        boardData[parseInt(i/3)][i%3] = contentElements[i].innerHTML
    }

    // Check rows
    for(let i = 0 ; i < 3 ; i++){
        if(boardData[i][0] === boardData[i][1] && boardData[i][0] === boardData[i][2] && boardData[i][0] !== ""){
            return boardData[i][0]
        }
    }

    // Check columns
    for(let i = 0 ; i < 3 ; i++){
        if(boardData[0][i] === boardData[1][i] && boardData[0][i] === boardData[2][i] && boardData[0][i] !== ""){
            return boardData[0][i]
        }
    }

    // Check diagonals
    if(boardData[0][0] === boardData[1][1] && boardData[0][0] === boardData[2][2] && boardData[0][0] !== ""){
        return boardData[1][1]
    }
    if(boardData[0][2] === boardData[1][1] && boardData[0][2] === boardData[2][0] && boardData[0][2] !== ""){
        return boardData[1][1]
    }

    for(let i in boardData) {
        if(boardData[i].includes("")){
            return null
        }
    }

    return "TIE"
}