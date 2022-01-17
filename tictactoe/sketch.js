/*
This is a p5.js sketch that I used to make the TicTacToe game

This took me around 3 hours to make
*/

// 0 = main menu, 1 = 1 player, 2 = 2 player
var menu = 0;

// when 2 player, player_turn = true means it is player 1 turn
var player_turn = false;
var turn_number = 0;
var game_active = false;
// 0 = tie, 1 = player1, 2 = player2
var winner = 0;

var delay_timer = 0;

// 0 = nothing 1 = player 1, 2 = player 2
var board_state = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0]];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textAlign(CENTER);
  if (menu == 0) {

    textSize(32);

    fill(0);
    noStroke();
    text("Tic\nTac\nToe", 200, 100);
    strokeWeight(10);
    stroke(150);
    fill(0, 255, 0);
    rect(40, 250, 125, 100);
    fill(255, 0, 0);
    rect(235, 250, 125, 100);
    fill(0);
    noStroke();
    text("One\nPlayer", 103, 290);
    text("Two\nPlayers", 298, 290);

  } else {
    // change background when game is over
    {
    if (!game_active) {
      if (menu == 1 && winner == 1) {
        background(0, 255, 0);
      } else if (menu == 1 && winner == 2) {
        background(255, 0, 0);
      } else if (winner == 0) {
        background(0, 0, 255);
      } else if (menu == 2) {
        background(0, 255, 0);
      }
    }
    }
    // drawing the grid
    {
      fill(245);
      rect(75, 45, 240, 240);
      stroke(0);
      strokeWeight(5);
      line(155, 45, 155, 285);
      line(75, 125, 315, 125);
      line(235, 45, 235, 285);
      line(75, 205, 315, 205);

      // drawing the back button
      fill(150);
      strokeWeight(1);
      rect(30, 315, 100, 50);
      textSize(42);
      fill(0);
      text("Back", 80, 350);

    }

    // drawing all X and O already placed
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board_state[i][j] == 1) {
          drawShape(true, false, j, i);
        } else if (board_state[i][j] == 2) {
          drawShape(false, false, j, i);
        }
      }
    }

    // put this section first so that after placing x, there is no pause
    if (menu == 1) {
      // picking the computers move
      if (!player_turn && turn_number != 5 && game_active && millis() - delay_timer > 100) {
        var x_pick = 0;
        var y_pick = 0;
        do {
          x_pick = Math.floor(Math.random() * 3);
          y_pick = Math.floor(Math.random() * 3);
        } while (board_state[y_pick][x_pick] != 0);
        board_state[y_pick][x_pick] = 2;
        if (turn_number >= 3) {
          check_win(player_turn);
        }
        turn_number++;
        player_turn = !player_turn;
        delay_timer = millis()
        // make it seem like the computer is thinking
        while (millis() - delay_timer < 1000) {

        }
      }
    } else if (menu == 2) {
      if (game_active && !player_turn) {
        drawShape(player_turn, true, 0);
      }
    }
    // drawing X on cursor when player_turn
    if (player_turn && game_active) {
      drawShape(player_turn, true, 0);
    }

    
    
    if (!game_active) {
      display_winner();
    }
  }
}

function mouseClicked() {
  if (menu == 0) {
    if (mouseY >= 250 && mouseY <= 250 + 100) {
      reset_game();
      if (mouseX >= 40 && mouseX <= 40 + 125) {
        menu = 1;
      } else if (mouseX >= 235 && mouseX <= 235 + 125) {
        menu = 2;
      }

    }
  } else {
    if (mouseX >= 30 && mouseX <= 130 && mouseY >= 315 && mouseY <= 365) {
      menu = 0;
    }

    // if game is not won yet
    if (game_active) {
      // player 1 moves regardless of singleplayer or 2 player
      if (player_turn) {
        for (i = 0; i < 3; i++) {
          if (mouseY > 45 + 80 * i && mouseY < 125 + 80 * i) {
            for (j = 0; j < 3; j++) {
              if (mouseX > 75 + 80 * j && mouseX < 155 + 80 * j) {
                if (board_state[i][j] == 0) {
                  board_state[i][j] = 1;
                  delay_timer = millis();
                  if (turn_number == 5) {
                    game_active = false;
                    winner = 0;
                  }
                  if (turn_number >= 3) {
                    check_win(player_turn);
                  }
                  
                  player_turn = !player_turn;
                }
              }
            }
          }

        }
      }

      if (menu == 2) {
        // player 2 turn
        if (!player_turn) {
          for (i = 0; i < 3; i++) {
            if (mouseY > 45 + 80 * i && mouseY < 125 + 80 * i) {
              for (j = 0; j < 3; j++) {
                if (mouseX > 75 + 80 * j && mouseX < 155 + 80 * j) {
                  if (board_state[i][j] == 0) {
                    board_state[i][j] = 2;
                    if (turn_number >= 3) {
                      check_win(player_turn);
                    }
                    turn_number++;
                    player_turn = !player_turn;
                  }
                }
              }
            }

          }
        }
      }
    } else if (mouseX >= 125 && mouseX <= 275 && mouseY >= 200 && mouseY <= 250) {
      reset_game();
    }

  }

}

function drawShape(shape, mouse, hor, ver) {
  letter = "O";
  if (shape) {
    letter = "X"
  }
  if (!mouse) {
    vertical = 110 + 80 * ver;
    horizontal = 115 + 80 * hor;
  } else {
    horizontal = mouseX;
    vertical = mouseY + 30;
  }


  fill(0);
  textSize(72);
  text(letter, horizontal, vertical);
}

function reset_game() {
  board_state = [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]];
  player_turn = true;
  turn_number = 1;
  game_active = true;
  winner = 0;
}

function check_win(player) {
  num = 2;
  if (player) {
    num = 1;
  }
  // checking rows and columns
  for (i = 0; i < 3; i++) {
    if (board_state[i][0] == num && board_state[i][1] == num && board_state[i][2] == num) {
      game_active = false;
      winner = num;
    }
    if (board_state[0][i] == num && board_state[1][i] == num && board_state[2][i] == num) {
      game_active = false;
      winner = num;
    }
  }
  // checking both crosses
  if (board_state[0][0] == num && board_state[1][1] == num && board_state[2][2] == num) {
    game_active = false;
    winner = num;
  }
  if (board_state[0][2] == num && board_state[1][1] == num && board_state[2][0] == num) {
    game_active = false;
    winner = num;
  }

}

function display_winner() {
  message = "Winner: X";
  if (winner == 2) {
    message = "Winner: O"
  } else if (winner == 0) {
    message = "Tie"
  }
  strokeWeight(3);
  fill(200, 200, 200, 225);
  rect(100, 100, 200, 200);
  fill(0);
  noStroke();
  textSize(28);
  text(message, 200, 145);
  fill(150);
  strokeWeight(2);
  stroke(0);
  rect(125, 200, 150, 50);
  fill(0);
  noStroke();
  text("Play Again?", 200, 230);
}