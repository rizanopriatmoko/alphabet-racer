
"use strict"

let playerNumber = process.argv[2]
let trackLength = process.argv[3]



if (Number(playerNumber) < 2 || Number(trackLength) < 15) {
  console.log(`Minimum player is 2 & minimum track length is 15`)
} else {
  function diceRoll() {
    return Math.floor(Math.random() * 6) + 1
  }
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  function printBoard(input, track) {
    let player = []
    let playerPosition = []
    let obstaclePosition = []
    let players = 'qwertyuiopasdfghjklzxcvbnm'
    let finish = false
    let win = ''
    for (let i = 0; i < input; i++) {//decide the players
      player.push(players[i])
      playerPosition.push(0)
      obstaclePosition.push(obstacle())
    }
    while (finish === false) {
      for (let j = 0; j < player.length; j++) {//2 to see the racing progress
        for (let i = 0; i < player.length; i++) {//racing display
          console.log(printLine(player[i], playerPosition[i], obstaclePosition[i]))
          if (finished(playerPosition[i]) === true) {
            win = player[i]
            finish = true
          }
        }
        if (finish === true) {
          console.log(winner(win))
          break
        } else if (playerPosition[j] === obstaclePosition[j]) {//back to zero when facing obstacle
          playerPosition[j] = 0
          console.log(`${player[j]} back to start!`)
        }
        else {//move
          playerPosition[j] = advance(playerPosition[j])
        }
        sleep(1000)
        clearScreen()
      }
    }
  }
  function obstacle() {
    const obs = Math.floor(Math.random() * Number(trackLength - 1))
    return obs
  }

  function printLine(player, pos, posObs) {//player = player, pos = playerPosition, posObs = obstacle position
    let track = ''
    for (let i = 0; i < Number(trackLength); i++) {
      track += '|'
      if (i === pos) {
        track += player
      } else if (i === posObs) {
        track += '%'
      } else {
        track += ' '
      }
    }
    return track
  }

  function advance(player) {//player = playerPosition
    let dice = diceRoll()
    if (player + dice >= trackLength) {
      return trackLength - 1
    }
    return player += dice
  }

  function finished(pos) {// pos = player position
    if (pos >= trackLength - 1) {
      return true
    }
  }

  function winner(player) {//winner display
    return `Player ${player} is the winner`
  }

  function clearScreen() {//clear the terminal
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }

  // console.log(printLine('a',0), advance(0));
  printBoard(playerNumber, trackLength)
}

