// Gameplay variables

var arrowSequence = []
var sequenceLength = 4 // could have this determined by user.
var indexTracker = 0
var playerPosition = 0
var playerTime = 0
var gameDifficulty = String(document.getElementById("difficulty").innerHTML)
var finishLine = 50
var winner = false
var gameOver = false
var livesRemaining = 5
var mode = String(document.getElementById("gameMode").innerHTML)
var raceStarted = false
var botDifficulty = 0
var botPositions = [0, 0, 0, 0]
var startTime = 0
var raceSpeed = 200

if (gameDifficulty == "Easy") {
    botDifficulty = 3;
} else if (gameDifficulty == "Medium") {
    botDifficulty = 8;
    raceSpeed = 175
} else if (gameDifficulty == "Hard") {
    botDifficulty = 15;
    raceSpeed = 150
} else {
}


if (mode == "Button Mash") {
    finishLine = 100
    raceSpeed = 75
    if (gameDifficulty == "Easy") {
        botDifficulty = 3;
    } else if (gameDifficulty == "Medium") {
        botDifficulty = 6;
    } else if (gameDifficulty == "Hard") {
        botDifficulty = 10;
    } else {
    }
}



// Variables for graphics processing

var playerIconWidth = document.getElementById("playerIcon").clientWidth
var racetrackWidth = document.getElementById("raceTrack").clientWidth - playerIconWidth
var marginIncrements = racetrackWidth / finishLine



// Function that generates a random sequence. This function will be run on page load.

function initialiseGame() {
    if (mode == "Classic") {
        for (let i = 0; i < sequenceLength; i++) {
            let randomNumber = Math.ceil(Math.random() * 4)
            if (randomNumber == 1) {
                arrowSequence.push("up")
            } else if (randomNumber == 2) {
                arrowSequence.push("down")
            } else if (randomNumber == 3) {
                arrowSequence.push("left")
            } else if (randomNumber == 4) {
                arrowSequence.push("right")
            } else {
                console.log("Sequence generation error.")
            }
        }
    } else if (mode == "Button Mash") {
        arrowSequence = ["left", "right", "left", "right"]
    } else {
        console.log("Error. Mode is neither buttonMash nor Classic.")
    }

    console.log("Arrow sequence: " + arrowSequence)
    document.getElementById("arrowSequence1").innerHTML = arrowSequence[0]
    document.getElementById("arrowSequence2").innerHTML = arrowSequence[1]
    document.getElementById("arrowSequence3").innerHTML = arrowSequence[2]
    document.getElementById("arrowSequence4").innerHTML = arrowSequence[3]

    startCountDown() // Ideally player should initialise this countdown.
}


var startCountDown = function() {
    var i = 0;
    var countFrom = 3
    var intr = setInterval(function() {
        console.log(countFrom - i)
        document.getElementById("outcome").innerHTML = (countFrom - i)
        if (++i == (countFrom + 1)) {
            document.getElementById("outcome").innerHTML = "GO!"
            raceStarted = true
            botAi()
            startTime = new Date().getTime()
            console.log("Start time: " + startTime)
            clearInterval(intr)
        }
    }, 1000)

}

var botAi = function() {
    var i = 0;
    var countFrom = 0
    var intr = setInterval(function() {
        console.log(countFrom + i)
        updateBotPositions()
        if (++i && gameOver == true) {
            clearInterval(intr)
        }
    }, raceSpeed)

}


// This function will give bots a random chance of moving forwards. Need to find a way to get this to run continually in the background.

function updateBotPositions() {
    if (gameOver == false) {
        for (let i = 0; i < 4; i++) {
            let moveForward = Math.ceil(Math.random() * botDifficulty) // can change number to increase bot difficulty.
            if (moveForward > 1) { botPositions[i] += 1 }
            if (botPositions[i] == finishLine) {
                document.getElementById("outcome").innerHTML = "GAME OVER"
                gameOver = true
                // document.getElementById('sadWhimper').play();
            }
            updateGUI()
        }
    }
}



// Updates GUI

function updateGUI(input) {

    // Moving players icon
    let marginLeft = marginIncrements * playerPosition
    document.getElementById("playerIcon").style = "margin-left: " + marginLeft + "px"

    // Moving bot 1
    marginLeft = marginIncrements * botPositions[0]
    document.getElementById("bot1Icon").style = "margin-left: " + marginLeft + "px"

    // Moving bot 2
    marginLeft = marginIncrements * botPositions[1]
    document.getElementById("bot2Icon").style = "margin-left: " + marginLeft + "px"

    // Moving bot 3
    marginLeft = marginIncrements * botPositions[2]
    document.getElementById("bot3Icon").style = "margin-left: " + marginLeft + "px"

    // Moving bot 4
    marginLeft = marginIncrements * botPositions[3]
    document.getElementById("bot4Icon").style = "margin-left: " + marginLeft + "px"



    if (livesRemaining == 5) {} else if (livesRemaining == 4) {
        document.getElementById("life5").style = "display: none"
    } else if (livesRemaining == 3) {
        document.getElementById("life4").style = "display: none"
    } else if (livesRemaining == 2) {
        document.getElementById("life3").style = "display: none"
    } else if (livesRemaining == 1) {
        document.getElementById("life2").style = "display: none"
    } else if (livesRemaining == 0) {
        document.getElementById("life1").style = "display: none"
    }

    if (livesRemaining > 0) {
        if (winner == true) {
            document.getElementById("outcome").innerHTML = "WINNER"
            gameOver = true
            document.getElementById("playerTime").innerHTML = (((new Date().getTime()) - startTime) / 1000).toFixed(2) + "s"
            document.getElementById('happyBark').play()
            document.getElementById('homeScreenAudio').volume = 0.15
            document.getElementById('homeScreenAudio').play()
            return
        } else if (winner == false) {} else {
            console.log("Winner variable not true or false.")
        }
    } else if (livesRemaining == 0) {
        document.getElementById("outcome").innerHTML = "GAME OVER"
        document.getElementById('sadWhimper').play();
        gameOver = true
    } else {
        console.log("livesRemaining is less than zero.")
    }

    if (input == "correct") {
        if (indexTracker == 0) {
            document.getElementById("arrowSequence1").style = "color: lightgreen"
            document.getElementById("arrowSequence2").style = "color: orange"
            document.getElementById("arrowSequence3").style = "color: lightgreen"
            document.getElementById("arrowSequence4").style = "color: lightgreen"
        } else if (indexTracker == 1) {
            document.getElementById("arrowSequence1").style = "color: lightgreen"
            document.getElementById("arrowSequence2").style = "color: lightgreen"
            document.getElementById("arrowSequence3").style = "color: orange"
            document.getElementById("arrowSequence4").style = "color: lightgreen"
        } else if (indexTracker == 2) {
            document.getElementById("arrowSequence1").style = "color: lightgreen"
            document.getElementById("arrowSequence2").style = "color: lightgreen"
            document.getElementById("arrowSequence3").style = "color: lightgreen"
            document.getElementById("arrowSequence4").style = "color: orange"
        } else if (indexTracker == 3) {
            document.getElementById("arrowSequence1").style = "color: orange"
            document.getElementById("arrowSequence2").style = "color: lightgreen"
            document.getElementById("arrowSequence3").style = "color: lightgreen"
            document.getElementById("arrowSequence4").style = "color: lightgreen"
        } else {
            console.log("Index tracker not working.")
        }
    }
}




// Checks if key pressed is correct, if so, moves the index and racer forwards. should probably add a if statement that checks that all keys aren't the same. If they are the function should wipe the sequence and call itself again.

function checkKeyPress(keyPressed) {
    if ((gameOver == false) && (raceStarted == true)) {
        let keyNeeded = arrowSequence[indexTracker]
        if (keyPressed == keyNeeded) {
            console.log("Correct Key")
            playerPosition += 1
            if (playerPosition == finishLine) { winner = true }
            updateGUI("correct")
            if (indexTracker == (sequenceLength - 1)) {
                indexTracker = 0
            } else if (indexTracker < (sequenceLength - 1)) {
                indexTracker += 1
            } else {
                console.log("Index tracker not working properly.")
            }
            return
        } else if (keyPressed != keyNeeded) {
            console.log("Wrong Key")
            livesRemaining -= 1
            updateGUI("wrong")
            return // could play an error sound or have some sort of feedback
        } else {
            console.log("checkKeyPress function not working properly.")
        }
    } else {
        return
    }
}



// Arrow Key GUI

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37:
            console.log("Left key was pressed.");
            document.getElementById("arrowLeft").style = "display: none;"
            document.getElementById("arrowLeftPressed").style = "display: inherit;"
            checkKeyPress("left")
            break;
        case 38:
            console.log("Up key was pressed.");
            document.getElementById("arrowUp").style = "display: none;"
            document.getElementById("arrowUpPressed").style = "display: inherit;"
            checkKeyPress("up")
            break;
        case 39:
            console.log("Right key was pressed.");
            document.getElementById("arrowRight").style = "display: none;"
            document.getElementById("arrowRightPressed").style = "display: inherit;"
            checkKeyPress("right")
            break;
        case 40:
            console.log("Down key was pressed.");
            document.getElementById("arrowDown").style = "display: none;"
            document.getElementById("arrowDownPressed").style = "display: inherit;"
            checkKeyPress("down")
            break;
    }
};

document.onkeyup = function(event) {
    switch (event.keyCode) {
        case 37:
            console.log("Left key was released.");
            document.getElementById("arrowLeft").style = "display: inherit;"
            document.getElementById("arrowLeftPressed").style = "display: none;"
            break;
        case 38:
            console.log("Up key was released.");
            document.getElementById("arrowUp").style = "display: inherit;"
            document.getElementById("arrowUpPressed").style = "display: none;"
            break;
        case 39:
            console.log("Right key was released.");
            document.getElementById("arrowRight").style = "display: inherit;"
            document.getElementById("arrowRightPressed").style = "display: none;"
            break;
        case 40:
            console.log("Down key was released.");
            document.getElementById("arrowDown").style = "display: inherit;"
            document.getElementById("arrowDownPressed").style = "display: none;"
            break;
    }
};

initialiseGame();